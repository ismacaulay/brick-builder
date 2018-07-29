export class ThreeBlockManager {
  constructor(sceneManager) {
    this._sceneManager = sceneManager;

    this._blocks = {};
  }

  addBlock(block, hitDetection) {
    this._sceneManager.addObject(block.mesh(), hitDetection);
    this._sceneManager.addObject(block.wireframe(), false);

    this._blocks[block.mesh().id] = block;
    return block.mesh().id;
  }

  updateBlock(id, data) {
    const block = this._blocks[id];
    if (!block) {
      return;
    }

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

  removeBlock(id) {
    console.log(id);
    const block = this._blocks[id];
    if (!block) {
      return;
    }

    this._sceneManager.removeObject(block.mesh());
    this._sceneManager.removeObject(block.wireframe());
    delete this._blocks[id];
  }
}
