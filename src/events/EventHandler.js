export class EventHandler {
  constructor(controller) {
    this._controller = controller;

    this._onKeyPress = this._onKeyPress.bind(this);
    document.addEventListener("keypress", this._onKeyPress);

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onMouseWheel = this._onMouseWheel.bind(this);

    this._onWindowResize = this._onWindowResize.bind(this);
    window.addEventListener("resize", this._onWindowResize);
  }

  initializeElementHandlers(element) {
    element.addEventListener("mousemove", this._onMouseMove);
    element.addEventListener("mousedown", this._onMouseDown);
    element.addEventListener("mouseup", this._onMouseUp);
    element.addEventListener("contextmenu", this._onContextMenu);
    element.addEventListener("wheel", this._onMouseWheel, false);
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
