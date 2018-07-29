export class SceneController {
  constructor(sceneManager) {
    this._sceneManager = sceneManager;
  }

  addBlock(block, hitDetection) {
    this._sceneManager.addObject(block.mesh(), hitDetection);
    this._sceneManager.addObject(block.wireframe(), false);
  }

  removeBlock(block) {
    this._sceneManager.removeObject(block.mesh());
    this._sceneManager.removeObject(block.wireframe());
  }
}
