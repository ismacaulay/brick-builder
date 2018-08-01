export class BlockController {
  constructor(objectIntersectionCalculator, blockInserter, blockRemover) {
    this._objectIntersectionCalculator = objectIntersectionCalculator;
    this._blockInserter = blockInserter;
    this._blockRemover = blockRemover;
  }

  addBlock(x, y) {
    const intersection = this._objectIntersectionCalculator.calculate(x, y);
    if (intersection) {
      this._blockInserter.addBlock(intersection.point, intersection.normal);
    }
  }

  removeBlock(x, y) {
    const intersection = this._objectIntersectionCalculator.calculate(x, y);
    if (intersection) {
      this._blockRemover.removeBlock(intersection.id);
    }
  }

  setBlockColor(color) {
    this._blockInserter.setNextBlockColor(color);
  }
}
