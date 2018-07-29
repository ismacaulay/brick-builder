export class BlockUpdater {
  constructor(blockManager) {
    this._blockManager = blockManager;
  }

  updateBlock(id, data) {
    this._blockManager.updateBlock(id, data);
  }
}
