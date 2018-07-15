import { GhostBlockController } from "./GhostBlockController";
import { GhostBlock } from "./GhostBlock";

export class GhostBlockContainer {
  constructor(blockFactory, intersectionCalculator, positionCalculator) {
    this.ghostBlock = new GhostBlock(
      blockFactory.create(0xff0000, 0.5),
      intersectionCalculator,
      positionCalculator
    );
    this.ghostBlockController = new GhostBlockController(this.ghostBlock);
  }
}
