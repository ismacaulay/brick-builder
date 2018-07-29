export class BlockRemover {
  constructor(blockManager) {
    this._blockManager = blockManager;
  }

  removeBlock(id) {
    this._blockManager.removeBlock(id);
  }
}
