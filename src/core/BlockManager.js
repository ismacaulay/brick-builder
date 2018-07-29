export class BlockManager {
  constructor(blockFactory, sceneController) {
    this._blockFactory = blockFactory;
    this._sceneController = sceneController;

    this._blocks = {};
  }

  addBlock(data, hitDetection = true) {
    const { position, color = 0x00ff00, opacity = 1.0 } = data;
    const block = this._blockFactory.create({ position, color, opacity });
    this._sceneController.addBlock(block, hitDetection);
    this._blocks[block.id()] = block;
    return block.id();
  }

  updateBlock(id, data) {
    const block = this._blocks[id];
    if (block) {
      const { position, color, opacity } = data;
      if (position) {
        block.setPosition(position);
      }

      if (color) {
        block.setColor(color);
      }

      if (opacity) {
        block.setOpacity(opacity);
      }
    }
  }

  removeBlock(id) {
    const block = this._blocks[id];
    if (block) {
      this._sceneController.removeBlock(block);
      delete this._blocks[id];
    }
  }
}
