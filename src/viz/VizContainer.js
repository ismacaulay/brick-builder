import { ThreeBlockFactory } from "./ThreeBlockFactory";
import { ThreeSceneManager } from "./ThreeSceneManager";
import { CameraController } from "./CameraController";
import { ThreeOrbitCameraControls } from "./ThreeOrbitCameraControls";
import { ObjectIntersectionCalculator } from "./ObjectIntersectionCalculator";
import { Raycaster } from "./Raycaster";
import { ThreeRenderer } from "./ThreeRenderer";
import { ThreeCamera } from "./ThreeCamera";
import { FloorGrid } from "./FloorGrid";
import { RenderLoop } from "./RenderLoop";
import { SceneController } from "./SceneController";

export class VizContainer {
  constructor() {
    this.sceneManager = new ThreeSceneManager();
    this.blockFactory = new ThreeBlockFactory();

    this.camera = new ThreeCamera();
    this.cameraControls = new ThreeOrbitCameraControls(this.camera);

    this.raycaster = new Raycaster(
      this.camera.threeCamera(),
      this.sceneManager
    );
    this.objectIntersectionCalculator = new ObjectIntersectionCalculator(
      this.raycaster
    );

    this.renderer = new ThreeRenderer(
      this.camera.threeCamera(),
      this.sceneManager.threeScene()
    );

    this.sceneController = new SceneController(this.sceneManager);
    this.cameraController = new CameraController(
      this.camera.threeCamera(),
      this.cameraControls
    );

    this.floorGrid = new FloorGrid(this.sceneManager);

    this.renderLoop = new RenderLoop(this.renderer, this.camera);
  }

  initialize(element) {
    this.camera.setCanvas(element);
    this.renderer.addRendererToElement(element);
  }
}
