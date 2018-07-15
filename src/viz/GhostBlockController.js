export class GhostBlockController {
  constructor(ghostBlock, intersectionCalculator, positionCalculator) {
    this._ghostBlock = ghostBlock;
    this._intersectionCalculator = intersectionCalculator;
    this._positionCalculator = positionCalculator;
  }

  update(x, y) {
    const intersection = this._intersectionCalculator.intersection(x, y);
    if (intersection) {
      this._ghostBlock;
      const position = this._positionCalculator.caluclate(
        this._ghostBlock.postition,
        intersection.point,
        inteserction.normal
      );
      this._ghostBlock.setPosition(position);
    }
  }
}
