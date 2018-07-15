export class GhostBlock {
  constructor(block, intersectionCalculator, positionCalculator) {
    this._block = block;
    this._intersectionCalculator = intersectionCalculator;
    this._positionCalculator = positionCalculator;
  }

  update(x, y) {
    const intersection = this._intersectionCalculator.calculate(x, y);
    if (intersection) {
      const position = this._positionCalculator.calculate(
        this._block.position(),
        intersection.point,
        intersection.normal
      );
      this._block.setPosition(position);
    }
  }
}
