export class VizBlockController {
  constructor(blockFactory, blockManager) {
    this._blockFactory = blockFactory;
    this._blockManager = blockManager;
  }

  addBlock(data, hitDetection) {
    const { position, color = 0x00ff00, opacity = 1.0 } = data;
    const block = this._blockFactory.create({ position, color, opacity });
    const id = this._blockManager.addBlock(block, hitDetection);
    return id;
  }

  updateBlock(id, data) {
    this._blockManager.updateBlock(id, data);
  }

  removeBlock(id) {
    this._blockManager.removeBlock(id);
  }
}
