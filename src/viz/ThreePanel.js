import * as THREE from "three";
import OrbitControls from "./OrbitControls";

export class ThreePanel {
  constructor(container) {
    this._objects = [];

    this._scene = new THREE.Scene();
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setClearColor(0xffffff);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(this._renderer.domElement);

    this._camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this._camera.position.set(10, 10, 10);
    this._camera.lookAt(new THREE.Vector3());

    this._cameraControls = new OrbitControls(this._camera, container);
    this._cameraControls.enabled = true;
    this._cameraControls.minDistance = 5;
    this._cameraControls.maxDistance = 1000;

    const gridHelper = new THREE.GridHelper(10000, 10000);
    this._scene.add(gridHelper);

    const planeGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
    planeGeometry.rotateX(-Math.PI / 2);

    const plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial({ visible: false })
    );
    this._scene.add(plane);
    this._objects.push(plane);

    const ghostGeometry = new THREE.BoxGeometry(1, 1, 1);
    const ghostMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      opacity: 0.5,
      transparent: true
    });
    this._ghostMesh = new THREE.Mesh(ghostGeometry, ghostMaterial);
    this._scene.add(this._ghostMesh);

    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();

    this._onWindowResize = this._onWindowResize.bind(this);
    window.addEventListener("resize", this._onWindowResize);

    this._onMouseMove = this._onMouseMove.bind(this);
    document.addEventListener("mousemove", this._onMouseMove);

    this._onKeyPress = this._onKeyPress.bind(this);
    document.addEventListener("keypress", this._onKeyPress);

    this._animate = this._animate.bind(this);
    this._render = this._render.bind(this);

    this._onWindowResize();
    this._animate();
  }

  _onWindowResize() {
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
  }

  _animate() {
    requestAnimationFrame(this._animate);

    this._cameraControls.update();
    this._render();
  }

  _render() {
    this._renderer.render(this._scene, this._camera);
  }

  _onMouseMove(event) {
    event.preventDefault();

    this._mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    this._raycaster.setFromCamera(this._mouse, this._camera);

    const intersects = this._raycaster.intersectObjects(this._objects);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      this._ghostMesh.position.copy(intersect.point);
      if (this._ghostMesh.position.y < 0) {
        this._ghostMesh.position.y = 0;
      }
      this._ghostMesh.position.floor().addScalar(0.5);
    }
    this._render();
  }

  _onKeyPress(event) {
    if (event.key === "r") {
      this._cameraControls.reset();
    }
  }
}
