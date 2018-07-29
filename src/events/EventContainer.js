import { EventController } from "./EventController";
import { EventHandler } from "./EventHandler";

export class EventContainer {
  constructor(core, viz) {
    this.eventContoller = new EventController(
      viz.cameraController,
      core.ghostBlockController,
      core.blockController,
      viz.renderer
    );
    this.eventHandler = new EventHandler(this.eventContoller);
  }

  initialize(element) {
    this.eventHandler.initializeElementHandlers(element);
  }
}
