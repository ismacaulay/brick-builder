import * as THREE from "three";
import OrbitControls from "./OrbitControls";

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

    this._cameraControls = new OrbitControls(this._camera, container);
    this._cameraControls.enabled = true;
    this._cameraControls.minDistance = 5;
    this._cameraControls.maxDistance = 1000;

    const gridHelper = new THREE.GridHelper(10000, 10000 / BOX_WIDTH);
    this._scene.add(gridHelper);

    const planeGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
    planeGeometry.rotateX(-Math.PI / 2);

    const plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial({ visible: false })
    );
    this._scene.add(plane);
    this._objects.push(plane);

    this._voxelGeometry = new THREE.BoxBufferGeometry(
      BOX_WIDTH,
      BOX_WIDTH,
      BOX_WIDTH
    );
    const ghostMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,

      fragmentShader: `
        void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
        }
      `,
      transparent: true
    });

    this._voxelMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute vec3 barycentric;
        varying vec3 vBarycentric;

        void main() {
          vBarycentric = barycentric;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,

      fragmentShader: `
        varying vec3 vBarycentric;

        float edgeFactor() {
          vec3 delta = fwidth(vBarycentric);
          vec3 a3 = smoothstep(vec3(0.0), delta*1.5, vBarycentric);
          return min(min(a3.x, a3.y), a3.z);
        }

        void main() {
          gl_FragColor.rgb = mix(vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), edgeFactor());
          // gl_FragColor.rgb = vBarycentric;
          gl_FragColor.a = 1.0;
        }
      `
    });
    this._voxelMaterial.extensions.derivatives = true;

    const numFaces = 12;
    const barycentric = new Float32Array(numFaces * 9);
    for (let i = 0; i < numFaces / 2; i++) {
      barycentric[i * 18 + 0] = 1;
      barycentric[i * 18 + 1] = 0;
      barycentric[i * 18 + 2] = 1;

      barycentric[i * 18 + 3] = 1;
      barycentric[i * 18 + 4] = 0;
      barycentric[i * 18 + 5] = 0;

      barycentric[i * 18 + 6] = 1;
      barycentric[i * 18 + 7] = 0;
      barycentric[i * 18 + 8] = 1;

      barycentric[i * 18 + 9] = 1;
      barycentric[i * 18 + 10] = 0;
      barycentric[i * 18 + 11] = 0;

      barycentric[i * 18 + 12] = 1;
      barycentric[i * 18 + 13] = 1;
      barycentric[i * 18 + 14] = 0;

      barycentric[i * 18 + 15] = 1;
      barycentric[i * 18 + 16] = 0;
      barycentric[i * 18 + 17] = 1;
    }

    this._voxelGeometry.addAttribute(
      "barycentric",
      new THREE.BufferAttribute(barycentric, 3)
    );

    this._ghostMesh = new THREE.Mesh(this._voxelGeometry, ghostMaterial);
    this._scene.add(this._ghostMesh);

    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();

    this._onWindowResize = this._onWindowResize.bind(this);
    window.addEventListener("resize", this._onWindowResize);

    this._onMouseMove = this._onMouseMove.bind(this);
    document.addEventListener("mousemove", this._onMouseMove);

    this._onKeyPress = this._onKeyPress.bind(this);
    document.addEventListener("keypress", this._onKeyPress);

    this._onMouseDown = this._onMouseDown.bind(this);
    document.addEventListener("mousedown", this._onMouseDown);

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
      this._ghostMesh.position.copy(intersect.point).add(intersect.face.normal);
      if (this._ghostMesh.position.y < 0) {
        this._ghostMesh.position.y = 0;
      }
      this._ghostMesh.position
        .divideScalar(BOX_WIDTH)
        .floor()
        .multiplyScalar(BOX_WIDTH)
        .addScalar(BOX_WIDTH / 2.0);
    }
    this._render();
  }

  _onKeyPress(event) {
    if (event.key === "r") {
      this._cameraControls.reset();
    }
  }

  _onMouseDown(event) {
    event.preventDefault();

    if (event.button !== 0) {
      return;
    }

    this._mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this._raycaster.setFromCamera(this._mouse, this._camera);

    const intersects = this._raycaster.intersectObjects(this._objects);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      const voxel = new THREE.Mesh(this._voxelGeometry, this._voxelMaterial);
      voxel.position.copy(intersect.point).add(intersect.face.normal);
      if (voxel.position.y < 0) {
        voxel.position.y = 0;
      }
      voxel.position
        .divideScalar(BOX_WIDTH)
        .floor()
        .multiplyScalar(BOX_WIDTH)
        .addScalar(BOX_WIDTH / 2.0);
      this._scene.add(voxel);
      this._objects.push(voxel);
      this._render();
    }
  }
}
