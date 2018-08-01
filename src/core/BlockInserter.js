export class BlockInserter {
  constructor(blockManager, positionCalculator) {
    this._blockManager = blockManager;
    this._positionCalculator = positionCalculator;
  }

  addBlock(point, normal) {
    const position = this._positionCalculator.calculate(point, normal);
    const id = this._blockManager.addBlock({ position });
    return id;
  }

  setNextBlockColor(color) {
    this._blockManager.setNextBlockColor(color);
  }
}
