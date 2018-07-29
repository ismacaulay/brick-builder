import * as THREE from "three";

export class Raycaster {
  constructor(camera, objectsProvider) {
    this._camera = camera;
    this._objectsProvider = objectsProvider;

    this._mouse = new THREE.Vector2();
    this._raycaster = new THREE.Raycaster();
  }

  castThroughPoint(x, y) {
    this._mouse.set(
      (x / window.innerWidth) * 2 - 1,
      -(y / window.innerHeight) * 2 + 1
    );
    this._raycaster.setFromCamera(this._mouse, this._camera);
    const intersects = this._raycaster.intersectObjects(
      this._objectsProvider.objects()
    );
    return intersects;
  }
}
