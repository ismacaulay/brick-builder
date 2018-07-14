import * as THREE from "three";

const CONTROL_STATE = {
  NONE: -1,
  ORBIT: 0,
  ZOOM: 1,
  PAN: 2
};

export class OrbitCameraControls {
  constructor(camera) {
    this._camera = camera;

    this._state = CONTROL_STATE.NONE;

    this._orbitStart = new THREE.Vector2();
    this._orbitEnd = new THREE.Vector2();
    this._orbitDelta = new THREE.Vector2();
    this._orbitSpeed = 1.0;

    this._zoomStart = new THREE.Vector2();
    this._zoomEnd = new THREE.Vector2();
    this._zoomDelta = new THREE.Vector2();
    this._zoomScale = 0.95;

    this._panStart = new THREE.Vector2();
    this._panEnd = new THREE.Vector2();
    this._panDelta = new THREE.Vector2();
  }

  startOrbit(x, y) {
    this._state = CONTROL_STATE.ORBIT;
    this._orbitStart.set(x, y);
  }

  startZoom(x, y) {
    this._state = CONTROL_STATE.ZOOM;
    this._zoomStart.set(x, y);
  }

  startPan(x, y) {
    this._state = CONTROL_STATE.PAN;
    this._panStart.set(x, y);
  }

  move(x, y) {
    switch (this._state) {
      case CONTROL_STATE.ORBIT:
        this._orbit(x, y);
        break;
      case CONTROL_STATE.ZOOM:
        this._zoom(x, y);
        break;
      case CONTROL_STATE.PAN:
        this._pan(x, y);
        break;
      default:
        break;
    }
  }

  finish() {
    this._state = CONTROL_STATE.NONE;
  }

  zoomCamera(delta) {
    this._camera.zoom(delta, this._zoomScale);
  }

  reset() {
    this._state = CONTROL_STATE.NONE;
    this._camera.reset();
  }

  _orbit(x, y) {
    this._orbitEnd.set(x, y);
    this._orbitDelta.subVectors(this._orbitEnd, this._orbitStart);

    this._camera.rotate(
      this._orbitDelta.x,
      this._orbitDelta.y,
      this._orbitSpeed
    );

    this._orbitStart.copy(this._orbitEnd);
  }

  _zoom(x, y) {
    this._zoomEnd.set(x, y);
    this._zoomDelta.subVectors(this._zoomEnd, this._zoomStart);

    this.zoomCamera(this._zoomDelta.y);

    this._zoomStart.copy(this._zoomEnd);
  }

  _pan(x, y) {
    this._panEnd.set(x, y);
    this._panDelta.subVectors(this._panEnd, this._panStart);

    this._camera.pan(this._panDelta.x, this._panDelta.y);

    this._panStart.copy(this._panEnd);
  }
}
