import { VizContainer } from "./viz/VizContainer";
import { CoreContainer } from "./core/CoreContainer";
import { EventContainer } from "./events/EventContainer";

export class PanelContainer {
  constructor(container) {
    this.vizContainer = new VizContainer(container);
    this.coreContainer = new CoreContainer(this.vizContainer);
    this.eventContainer = new EventContainer(
      this.coreContainer,
      this.vizContainer,
      container
    );

    this.vizContainer.renderLoop.start();
  }
}
