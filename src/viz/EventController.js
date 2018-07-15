export class EventController {
  constructor(cameraController) {
    this._cameraController = cameraController;
  }

  keyPressed(key) {
    if (key === "r") {
      this._cameraController.resetCamera();
    }
  }

  mouseDown(button, x, y) {
    if (!this._cameraController.inProgress()) {
      this._cameraController.startCameraUpdate(button, x, y);
    }
  }

  mouseMove(x, y) {
    if (this._cameraController.inProgress()) {
      this._cameraController.updateCamera(x, y);
    } else {
      // this._ghostBlockController.update(x, y);
    }
  }

  mouseUp() {
    if (this._cameraController.inProgress()) {
      this._cameraController.finishCameraUpdate();
    }
  }

  mouseWheel(delta) {
    this._cameraController.zoomCamera(delta);
  }
}
