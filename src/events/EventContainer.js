import { EventController } from "./EventController";
import { EventHandler } from "./EventHandler";

export class EventContainer {
  constructor(core, viz, canvas) {
    this.eventContoller = new EventController(
      viz.cameraController,
      core.ghostBlockController,
      core.blockController,
      viz.renderer
    );
    this.eventHandler = new EventHandler(canvas, this.eventContoller);
  }
}
