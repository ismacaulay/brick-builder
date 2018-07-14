import * as THREE from "three";

const ORBIT_MOUSE_BUTTON = THREE.MOUSE.LEFT;
const ZOOM_MOUSE_BUTTON = THREE.MOUSE.MIDDLE;
const PAN_MOUSE_BUTTON = THREE.MOUSE.RIGHT;

export class CameraController {
  constructor(cameraControls) {
    this._cameraControls = cameraControls;

    this._inProgress = false;
  }

  inProgress() {
    return this._inProgress;
  }

  resetCamera() {
    this._inProgress = false;
    this._cameraControls.reset();
  }

  startCameraUpdate(button, x, y) {
    if (this.inProgress()) {
      return;
    }

    this._inProgress = true;
    if (button === ORBIT_MOUSE_BUTTON) {
      this._cameraControls.startOrbit(x, y);
    } else if (button === ZOOM_MOUSE_BUTTON) {
      this._cameraControls.startZoom(x, y);
    } else if (button === PAN_MOUSE_BUTTON) {
      this._cameraControls.startPan(x, y);
    } else {
      this._inProgress = false;
    }
  }

  updateCamera(x, y) {
    if (!this.inProgress()) {
      return;
    }

    this._cameraControls.move(x, y);
  }

  finishCameraUpdate() {
    this._inProgress = false;
    this._cameraControls.finish();
  }

  zoomCamera(delta) {
    this._cameraControls.zoomCamera(delta);
  }
}
