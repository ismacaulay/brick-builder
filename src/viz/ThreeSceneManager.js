import * as THREE from "three";

export class ThreeSceneManager {
  constructor() {
    this._scene = new THREE.Scene();
    this._objects = [];
  }

  threeScene() {
    return this._scene;
  }

  objects() {
    return this._objects;
  }

  addObject(object, includedInObjectList = true) {
    this._scene.add(object);

    if (includedInObjectList) {
      this._objects.push(object);
    }
  }
}
