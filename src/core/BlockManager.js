export class BlockManager {
  constructor(vizController) {
    this._vizController = vizController;
  }

  addBlock(data, hitDetection = true) {
    const id = this._vizController.addBlock(data, hitDetection);
    return id;
  }

  updateBlock(id, data) {
    this._vizController.updateBlock(id, data);
  }

  removeBlock(id) {
    this._vizController.removeBlock(id);
  }
}
