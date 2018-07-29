import { VizBlockController } from "./VizBlockController";
import { ThreeBlockFactory } from "./ThreeBlockFactory";
import { ThreeBlockManager } from "./ThreeBlockManager";
import { ThreeSceneManager } from "./ThreeSceneManager";
import { CameraController } from "./CameraController";
import { ThreeOrbitCameraControls } from "./ThreeOrbitCameraControls";
import { ObjectIntersectionCalculator } from "./ObjectIntersectionCalculator";
import { Raycaster } from "./Raycaster";
import { ThreeRenderer } from "./ThreeRenderer";
import { ThreeCamera } from "./ThreeCamera";
import { FloorGrid } from "./FloorGrid";
import { ThreeSceneController } from "./ThreeSceneController";

export class VizContainer {
  constructor(canvas) {
    this.sceneManager = new ThreeSceneManager();
    this.blockFactory = new ThreeBlockFactory();
    this.blockManager = new ThreeBlockManager(this.sceneManager);

    this.camera = new ThreeCamera(canvas);
    this.cameraControls = new ThreeOrbitCameraControls(this.camera);

    this.raycaster = new Raycaster(
      this.camera.threeCamera(),
      this.sceneManager
    );
    this.objectIntersectionCalculator = new ObjectIntersectionCalculator(
      this.raycaster
    );

    this.renderer = new ThreeRenderer(
      canvas,
      this.camera.threeCamera(),
      this.sceneManager.threeScene()
    );

    this.sceneController = new ThreeSceneController(this.renderer, this.camera);
    this.cameraController = new CameraController(
      this.camera.threeCamera(),
      this.cameraControls
    );
    this.blockController = new VizBlockController(
      this.blockFactory,
      this.blockManager
    );

    this.floorGrid = new FloorGrid(this.sceneManager);
  }
}
