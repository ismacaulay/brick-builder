import * as THREE from "three";

export class ThreeBlock {
  constructor(geometry, material, wireframeGeometry, wireframMaterial) {
    this._mesh = new THREE.Mesh(geometry, material);

    this._wireframe = new THREE.LineSegments(
      wireframeGeometry,
      wireframMaterial
    );
  }

  id() {
    return this._mesh.id;
  }

  mesh() {
    return this._mesh;
  }

  wireframe() {
    return this._wireframe;
  }

  position() {
    return this._mesh.position;
  }

  setPosition(position) {
    this._mesh.position.copy(position);
    this._wireframe.position.copy(position);
  }

  setColor(color) {
    this._mesh.material.color.setHex(color);
  }

  setOpacity(opacity) {}
}
