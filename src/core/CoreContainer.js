import { GhostBlockController } from "./GhostBlockController";
import { GhostBlock } from "./GhostBlock";
import { BlockPositionCalculator } from "./BlockPositionCalculator";
import { BlockInserter } from "./BlockInserter";
import { BlockManager } from "./BlockManager";
import { BlockController } from "./BlockController";
import { BlockUpdater } from "./BlockUpdater";
import { BlockRemover } from "./BlockRemover";

export class CoreContainer {
  constructor(viz) {
    this.blockPositionCalculator = new BlockPositionCalculator();
    this.blockManager = new BlockManager(viz.blockFactory, viz.sceneController);

    this.blockInserter = new BlockInserter(
      this.blockManager,
      this.blockPositionCalculator
    );
    this.blockUpdater = new BlockUpdater(this.blockManager);
    this.blockRemover = new BlockRemover(this.blockManager);

    this.blockController = new BlockController(
      viz.objectIntersectionCalculator,
      this.blockInserter,
      this.blockRemover
    );

    this.ghostBlock = new GhostBlock(
      this.blockManager,
      this.blockUpdater,
      this.blockPositionCalculator
    );
    this.ghostBlockController = new GhostBlockController(
      viz.objectIntersectionCalculator,
      this.ghostBlock
    );
  }
}
