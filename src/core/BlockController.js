export class BlockController {
  constructor(objectIntersectionCalculator, blockInserter) {
    this._objectIntersectionCalculator = objectIntersectionCalculator;
    this._blockInserter = blockInserter;
  }

  addBlock(x, y) {
    const intersection = this._objectIntersectionCalculator.calculate;
    if (intersection) {
      this._blockInserter.addBlock(intersection.point, intersection.normal);
    }
  }
}
