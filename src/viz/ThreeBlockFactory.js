import * as THREE from "three";
import { ThreeBlock } from "./ThreeBlock";

// todo: DEAL WITH CONSTANTS
const BLOCK_WIDTH = 2.0;

export class ThreeBlockFactory {
  constructor() {
    this._blockGeometry = new THREE.BoxBufferGeometry(
      BLOCK_WIDTH - 0.01,
      BLOCK_WIDTH - 0.01,
      BLOCK_WIDTH - 0.01
    );

    // todo: design a better way to handle wireframe and different blocks
    this._wireframeGeometry = new THREE.EdgesGeometry(this._blockGeometry);
    this._wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  }

  create(data) {
    const { color, opacity, position } = data;

    const material = new THREE.MeshBasicMaterial({
      color,
      opacity,
      transparent: opacity < 1.0
    });

    const block = new ThreeBlock(
      this._blockGeometry,
      material,
      this._wireframeGeometry,
      this._wireframeMaterial
    );
    block.setPosition(position);
    return block;
  }
}
