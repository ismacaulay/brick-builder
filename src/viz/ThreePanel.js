import * as THREE from "three";
import { CameraContainer } from "./CameraContainer";
import { EventHandler } from "./EventHandler";
import { EventController } from "./EventController";

const BOX_WIDTH = 2.0;

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
    const cameraInitialPosition = 10 * BOX_WIDTH;
    this._camera.position.set(
      cameraInitialPosition,
      cameraInitialPosition,
      cameraInitialPosition
    );
    this._camera.lookAt(new THREE.Vector3());

    this._cameraContainer = new CameraContainer(this._camera, container);
    this._eventController = new EventController(
      this._cameraContainer.cameraController
    );

    this._eventHandler = new EventHandler(container, this._eventController);

    // this._cameraControls = new OrbitControls(this._camera, container);
    // this._cameraControls.enabled = true;
    // this._cameraControls.minDistance = 5;
    // this._cameraControls.maxDistance = 1000;

    const gridHelper = new THREE.GridHelper(1000, 1000 / BOX_WIDTH);
    this._scene.add(gridHelper);

    // const planeGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
    // planeGeometry.rotateX(-Math.PI / 2);

    // const plane = new THREE.Mesh(
    //   planeGeometry,
    //   new THREE.MeshBasicMaterial({ visible: false })
    // );
    // this._scene.add(plane);
    // this._objects.push(plane);

    // this._voxelGeometry = new THREE.BoxBufferGeometry(
    //   BOX_WIDTH - 0.01,
    //   BOX_WIDTH - 0.01,
    //   BOX_WIDTH - 0.01
    // );
    // this._voxelMaterial = new THREE.MeshBasicMaterial({
    //   color: 0x00ff00
    // });

    // const ghostMaterial = new THREE.MeshBasicMaterial({
    //   color: 0xff0000,
    //   opacity: 0.5,
    //   transparent: true
    // });

    // this._wireframeGeometry = new THREE.EdgesGeometry(this._voxelGeometry);
    // this._wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

    // this._ghostMesh = new THREE.Mesh(this._voxelGeometry, ghostMaterial);
    // this._ghostWireframe = new THREE.LineSegments(
    //   this._wireframeGeometry,
    //   this._wireframeMaterial
    // );
    // this._scene.add(this._ghostMesh);
    // this._scene.add(this._ghostWireframe);

    // this._raycaster = new THREE.Raycaster();
    // this._mouse = new THREE.Vector2();

    this._onWindowResize = this._onWindowResize.bind(this);
    window.addEventListener("resize", this._onWindowResize);

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

    this._cameraContainer.camera.update();

    this._render();
  }

  _render() {
    this._renderer.render(this._scene, this._camera);
  }

  // _onMouseMove(event) {
  //   event.preventDefault();

  //   this._mouse.set(
  //     (event.clientX / window.innerWidth) * 2 - 1,
  //     -(event.clientY / window.innerHeight) * 2 + 1
  //   );

  //   this._raycaster.setFromCamera(this._mouse, this._camera);

  //   const intersects = this._raycaster.intersectObjects(this._objects);

  //   if (intersects.length > 0) {
  //     const intersect = intersects[0];
  //     this._ghostMesh.position.copy(intersect.point).add(intersect.face.normal);
  //     this._ghostWireframe.position
  //       .copy(intersect.point)
  //       .add(intersect.face.normal);
  //     if (this._ghostMesh.position.y < 0) {
  //       this._ghostMesh.position.y = 0;
  //       this._ghostWireframe.position.y = 0;
  //     }
  //     this._ghostMesh.position
  //       .divideScalar(BOX_WIDTH)
  //       .floor()
  //       .multiplyScalar(BOX_WIDTH)
  //       .addScalar(BOX_WIDTH / 2.0);
  //     this._ghostWireframe.position
  //       .divideScalar(BOX_WIDTH)
  //       .floor()
  //       .multiplyScalar(BOX_WIDTH)
  //       .addScalar(BOX_WIDTH / 2.0);
  //   }
  //   this._render();
  // }

  // _onKeyPress(event) {
  //   if (event.key === "r") {
  //     this._cameraControls.reset();
  //   }
  // }

  // _onMouseDown(event) {
  //   event.preventDefault();

  //   if (event.button !== 0) {
  //     return;
  //   }

  //   this._mouse.set(
  //     (event.clientX / window.innerWidth) * 2 - 1,
  //     -(event.clientY / window.innerHeight) * 2 + 1
  //   );
  //   this._raycaster.setFromCamera(this._mouse, this._camera);

  //   const intersects = this._raycaster.intersectObjects(this._objects);
  //   if (intersects.length > 0) {
  //     const intersect = intersects[0];
  //     const voxel = new THREE.Mesh(this._voxelGeometry, this._voxelMaterial);
  //     const wireframe = new THREE.LineSegments(
  //       this._wireframeGeometry,
  //       this._wireframeMaterial
  //     );
  //     voxel.position.copy(intersect.point).add(intersect.face.normal);
  //     wireframe.position.copy(intersect.point).add(intersect.face.normal);
  //     if (voxel.position.y < 0) {
  //       voxel.position.y = 0;
  //       wireframe.position.y = 0;
  //     }
  //     voxel.position
  //       .divideScalar(BOX_WIDTH)
  //       .floor()
  //       .multiplyScalar(BOX_WIDTH)
  //       .addScalar(BOX_WIDTH / 2.0);
  //     wireframe.position
  //       .divideScalar(BOX_WIDTH)
  //       .floor()
  //       .multiplyScalar(BOX_WIDTH)
  //       .addScalar(BOX_WIDTH / 2.0);
  //     this._scene.add(voxel);
  //     this._scene.add(wireframe);
  //     this._objects.push(voxel);
  //     this._render();
  //   }
  // }
}
