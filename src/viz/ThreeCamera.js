import * as THREE from "three";

const BOX_WIDTH = 2.0; // TODO: Handle constants better

function calculateRotationAngle(delta, speed, canvasSize) {
  return ((2 * Math.PI * delta) / canvasSize) * speed;
}

function calculatePanDistance(delta, distance, fov, canvasSize) {
  const targetDistance = distance * Math.tan(((fov / 2) * Math.PI) / 180.0);
  return (2 * delta * targetDistance) / canvasSize;
}

export class ThreeCamera {
  constructor(canvas) {
    this._camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    const cameraInitialPosition = 10 * BOX_WIDTH;
    this._camera.position.set(
      cameraInitialPosition,
      cameraInitialPosition,
      cameraInitialPosition
    );
    this._camera.lookAt(new THREE.Vector3());

    this._canvas = canvas;

    this._sphericalDelta = new THREE.Spherical();

    this._scale = 1;
    this._zoomChanged = false;

    this._xPanVector = new THREE.Vector3();
    this._yPanVector = new THREE.Vector3();
    this._panOffset = new THREE.Vector3();
    this._target = new THREE.Vector3();

    this._updateSpherical = new THREE.Spherical();
    this._updateOffset = new THREE.Vector3();
    this._updatePanOffset = new THREE.Vector3();
    this._updateQuaternion = new THREE.Quaternion().setFromUnitVectors(
      this._camera.up,
      new THREE.Vector3(0, 1, 0)
    );

    this._updateQuaternionInverse = this._updateQuaternion.clone().inverse();
    this._lastPosition = new THREE.Vector3();
    this._lastQuaternion = new THREE.Quaternion();

    this._initialTarget = this._target.clone();
    this._initialPosition = this._camera.position.clone();
    this._initialZoom = this._camera.zoom;
  }

  threeCamera() {
    return this._camera;
  }

  reset() {
    this._target.copy(this._initialTarget);
    this._camera.position.copy(this._initialPosition);
    this._camera.zoom = this._initialZoom;
    this._camera.updateProjectionMatrix();

    this.update();
  }

  rotate(deltaX, deltaY, speed) {
    const leftRotation = calculateRotationAngle(
      deltaX,
      speed,
      this._canvas.clientWidth
    );
    this._sphericalDelta.theta -= leftRotation;

    const upRotation = calculateRotationAngle(
      deltaY,
      speed,
      this._canvas.clientHeight
    );
    this._sphericalDelta.phi -= upRotation;
  }

  zoom(deltaY, scale) {
    if (deltaY > 0) {
      this._scale /= scale;
      this._zoomChanged = true;
    } else if (deltaY < 0) {
      this._scale *= scale;
      this._zoomChanged = true;
    }
  }

  pan(deltaX, deltaY) {
    const position = this._camera.position;
    this._panOffset.copy(position).sub(this._target);

    const panLeftDistance = calculatePanDistance(
      deltaX,
      this._panOffset.length(),
      this._camera.fov,
      this._canvas.clientHeight
    );
    this._xPanVector.setFromMatrixColumn(this._camera.matrix, 0);
    this._xPanVector.multiplyScalar(-panLeftDistance);
    this._updatePanOffset.add(this._xPanVector);

    const panUpDisatance = calculatePanDistance(
      deltaY,
      this._panOffset.length(),
      this._camera.fov,
      this._canvas.clientHeight
    );
    this._yPanVector.setFromMatrixColumn(this._camera.matrix, 1);
    this._yPanVector.multiplyScalar(panUpDisatance);
    this._updatePanOffset.add(this._yPanVector);
  }

  update() {
    this._updateOffset.copy(this._camera.position).sub(this._target);
    this._updateOffset.applyQuaternion(this._updateQuaternion);

    this._updateSpherical.setFromVector3(this._updateOffset);
    this._updateSpherical.theta += this._sphericalDelta.theta;
    this._updateSpherical.phi += this._sphericalDelta.phi;
    this._updateSpherical.makeSafe();

    this._updateSpherical.radius *= this._scale;
    this._updateSpherical.radius = Math.max(0.0, this._updateSpherical.radius);

    this._target.add(this._updatePanOffset);

    this._updateOffset.setFromSpherical(this._updateSpherical);
    this._updateOffset.applyQuaternion(this._updateQuaternionInverse);

    this._camera.position.copy(this._target).add(this._updateOffset);
    this._camera.lookAt(this._target);

    this._sphericalDelta.set(0, 0, 0);
    this._scale = 1;
    this._updatePanOffset.set(0, 0, 0);

    if (
      this._zoomChanged ||
      this._lastPosition.distanceToSquared(this._camera.position) > 0.000001 ||
      8 * (1 - this._lastQuaternion.dot(this._camera.quaternion)) > 0.000001
    ) {
      this._lastPosition.copy(this._camera.position);
      this._lastQuaternion.copy(this._camera.quaternion);
      this._zoomChanged = false;
    }
  }
}
