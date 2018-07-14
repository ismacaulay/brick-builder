import { Camera } from "./Camera";
import { OrbitCameraControls } from "./OrbitCameraControls";
import { CameraController } from "./CameraController";

export class CameraContainer {
  constructor(camera, canvas) {
    this.camera = new Camera(camera, canvas);
    this.cameraControls = new OrbitCameraControls(this.camera);
    this.cameraController = new CameraController(this.cameraControls);
  }
}
