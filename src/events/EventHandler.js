export class EventHandler {
  constructor(canvas, controller) {
    this._controller = controller;

    this._onKeyPress = this._onKeyPress.bind(this);
    document.addEventListener("keypress", this._onKeyPress);

    this._onMouseMove = this._onMouseMove.bind(this);
    canvas.addEventListener("mousemove", this._onMouseMove);

    this._onMouseDown = this._onMouseDown.bind(this);
    canvas.addEventListener("mousedown", this._onMouseDown);

    this._onMouseUp = this._onMouseUp.bind(this);
    canvas.addEventListener("mouseup", this._onMouseUp);

    this._onContextMenu = this._onContextMenu.bind(this);
    canvas.addEventListener("contextmenu", this._onContextMenu);

    this._onMouseWheel = this._onMouseWheel.bind(this);
    canvas.addEventListener("wheel", this._onMouseWheel, false);

    this._onWindowResize = this._onWindowResize.bind(this);
    window.addEventListener("resize", this._onWindowResize);
  }

  _onKeyPress(event) {
    this._controller.keyPressed(event.key);
  }

  _onMouseDown(event) {
    event.preventDefault();
    this._controller.mouseDown(event.button, event.clientX, event.clientY);
  }

  _onMouseMove(event) {
    event.preventDefault();
    this._controller.mouseMove(event.clientX, event.clientY);
  }

  _onMouseUp(event) {
    event.preventDefault();
    this._controller.mouseUp(event.clientX, event.clientY);
  }

  _onMouseWheel(event) {
    event.preventDefault();
    event.stopPropagation();
    this._controller.mouseWheel(event.deltaY);
  }

  _onContextMenu(event) {
    event.preventDefault();
  }

  _onWindowResize(event) {
    this._controller.windowResize();
  }
}
