export class ThreeBlockManager {
  constructor(sceneManager) {
    this._sceneManager = sceneManager;

    this._blocks = {};
  }

  addBlock(block, hitDetection) {
    this._sceneManager.addObject(block.mesh(), hitDetection);
    this._sceneManager.addObject(block.wireframe(), false);

    this._blocks[block.mesh().id] = { block };
    return block.mesh().id;
  }

  updateBlock(id, data) {
    const { block } = this._blocks[id];
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
}
