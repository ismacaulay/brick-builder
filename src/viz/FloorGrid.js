import * as THREE from "three";

export class FloorGrid {
  constructor(sceneManager) {
    const gridHelper = new THREE.GridHelper(1000, 1000 / 2.0);
    sceneManager.addObject(gridHelper, false);

    const planeGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
    planeGeometry.rotateX(-Math.PI / 2);

    const plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial({ visible: false })
    );
    sceneManager.addObject(plane);
  }
}
