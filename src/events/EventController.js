import { Vector2 } from "three";

const LEFT_MOUSE_BUTTON = 0;
const RIGHT_MOUSE_BUTTON = 2;

const PICK_MOVE_THRESHOLD = 1.0;

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

    this._pickStarted = false;
    this._removeStarted = false;
    this._startMove = new Vector2();
    this._endMove = new Vector2();
    this._delta = new Vector2();
  }

  keyPressed(key) {
    if (key === "r") {
      this._cameraController.resetCamera();
    }
  }

  mouseDown(button, x, y) {
    this._startMove.set(x, y);
    if (button === LEFT_MOUSE_BUTTON) {
      this._pickStarted = true;
    } else if (button === RIGHT_MOUSE_BUTTON) {
      this._removeStarted = true;
    }

    if (!this._cameraController.inProgress()) {
      this._cameraController.startCameraUpdate(button, x, y);
    }
  }

  mouseMove(x, y) {
    this._endMove.set(x, y);

    this._delta.subVectors(this._endMove, this._startMove);
    if (this._delta.length() > PICK_MOVE_THRESHOLD) {
      this._pickStarted = false;
      this._removeStarted = false;
      if (this._cameraController.inProgress()) {
        this._cameraController.updateCamera(x, y);
      } else {
        this._ghostBlockController.update(x, y);
      }
    }

    this._startMove.copy(this._endMove);
  }

  mouseUp(x, y) {
    if (this._pickStarted) {
      this._blockController.addBlock(x, y);
      this._pickStarted = false;
    } else if (this._removeStarted) {
      this._blockController.removeBlock(x, y);
      this._removeStarted = false;
    } else {
      this._ghostBlockController.update(x, y);
    }

    this._cameraController.finishCameraUpdate();
  }

  mouseWheel(delta) {
    this._cameraController.zoomCamera(delta);
  }

  windowResize() {
    this._windowController.updateSize();
    this._cameraController.updateAspectRatio();
  }
}
