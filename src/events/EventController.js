export class EventController {
  constructor(
    cameraController,
    ghostBlockController,
    blockController,
    windowController
  ) {
    this._cameraController = cameraController;
    this._ghostBlockController = ghostBlockController;
    this._blockController = blockController;
    this._windowController = windowController;
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
      this._ghostBlockController.update(x, y);
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

  windowResize() {
    this._windowController.updateSize();
    this._cameraController.updateAspectRatio();
  }
}
