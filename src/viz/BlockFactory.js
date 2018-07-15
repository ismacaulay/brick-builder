import * as THREE from "three";
import { Block } from "./Block";
import { BLOCK_WIDTH } from "./constants";

export class BlockFactory {
  constructor(sceneManager) {
    this._sceneManager = sceneManager;

    this._blockGeometry = new THREE.BoxBufferGeometry(
      BLOCK_WIDTH - 0.01,
      BLOCK_WIDTH - 0.01,
      BLOCK_WIDTH - 0.01
    );

    // todo: design a better way to handle wireframe and different blocks
    this._wireframeGeometry = new THREE.EdgesGeometry(this._blockGeometry);
    this._wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  }

  create(color, opacity) {
    const material = new THREE.MeshBasicMaterial({
      color,
      opacity,
      transparent: opacity < 1.0
    });
    const block = new Block(
      this._blockGeometry,
      material,
      this._wireframeGeometry,
      this._wireframeMaterial
    );
    this._sceneManager.addMesh(block.mesh(), false);
    this._sceneManager.addMesh(block.wireframe(), false);
    return block;
  }
}
