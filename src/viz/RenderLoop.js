export class RenderLoop {
  constructor(renderer, camera) {
    this._renderer = renderer;
    this._camera = camera;

    this._animate = this._animate.bind(this);
  }

  start() {
    this._renderer.updateSize();
    this._animate();
  }

  _animate() {
    requestAnimationFrame(this._animate);
    this._camera.update();
    this._renderer.render();
  }
}
