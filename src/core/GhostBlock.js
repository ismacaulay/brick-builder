import { Vector3 } from "three";

const DEFAULT_POINT = new Vector3();
const DEFAULT_NORMAL = new Vector3(0.0, 1.0, 0.0);

export class GhostBlock {
  constructor(blockManager, blockUpdater, positionCalculator) {
    const position = positionCalculator.calculate(
      DEFAULT_POINT,
      DEFAULT_NORMAL
    );
    const data = {
      position,
      color: 0xff0000,
      opacity: 0.5
    };
    this._blockId = blockManager.addBlock(data, false);

    this._blockUpdater = blockUpdater;
    this._positionCalculator = positionCalculator;
  }

  update(point, normal) {
    const position = this._positionCalculator.calculate(point, normal);
    this._blockUpdater.updateBlock(this._blockId, { position });
  }

  setColor(color) {
    this._blockUpdater.updateBlock(this._blockId, { color });
  }
}
