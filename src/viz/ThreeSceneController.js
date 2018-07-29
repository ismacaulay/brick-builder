export class ThreeSceneController {
  constructor(renderer, camera) {
    this._renderer = renderer;
    this._camera = camera;

    this._animate = this._animate.bind(this);

    this.updateSize();
    this._animate();
  }

  updateSize() {
    this._renderer.updateSize();
  }

  _animate() {
    requestAnimationFrame(this._animate);
    this._camera.update();
    this._renderer.render();
  }
}
