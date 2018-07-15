export class SceneManager {
  constructor(scene) {
    this._scene = scene;

    this._objects = [];
  }

  objects() {
    return this._objects;
  }

  addMesh(mesh, addToObjects = true) {
    this._scene.add(mesh);

    if (addToObjects) {
      this._objects.push(mesh);
    }
  }
}
