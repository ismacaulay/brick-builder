export class GhostBlockController {
  constructor(ghostBlock) {
    this._ghostBlock = ghostBlock;
  }

  update(x, y) {
    this._ghostBlock.update(x, y);
  }
}
