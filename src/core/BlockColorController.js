export class BlockColorController {
  constructor(blockController, ghostBlockController) {
    this._blockController = blockController;
    this._ghostBlockController = ghostBlockController;

    this.setColor(0xff0000);
  }

  color() {
    return this._color;
  }

  setColor(color) {
    if (color !== this._color) {
      this._color = color;
      this._blockController.setBlockColor(this._color);
      this._ghostBlockController.setBlockColor(this._color);
    }
  }
}
