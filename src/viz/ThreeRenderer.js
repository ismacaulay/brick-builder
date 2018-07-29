import * as THREE from "three";

export class ThreeRenderer {
  constructor(canvas, camera, scene) {
    this._camera = camera;
    this._scene = scene;

    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setClearColor(0xffffff);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    // this.render = this.render.bind(this);

    canvas.appendChild(this._renderer.domElement);
  }

  updateSize() {
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this._renderer.render(this._scene, this._camera);
  }
}
