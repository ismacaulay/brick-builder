export class GhostBlockController {
  constructor(objectIntersectionCalculator, ghostBlock) {
    this._objectIntersectionCalculator = objectIntersectionCalculator;
    this._ghostBlock = ghostBlock;
  }

  update(x, y) {
    const intersection = this._objectIntersectionCalculator.calculate(x, y);
    if (intersection) {
      this._ghostBlock.update(intersection.point, intersection.normal);
    }
  }

  setBlockColor(color) {
    this._ghostBlock.setColor(color);
  }
}
