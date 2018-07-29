import { VizContainer } from "./viz/VizContainer";
import { CoreContainer } from "./core/CoreContainer";
import { EventContainer } from "./events/EventContainer";

export class ApplicationContainer {
  constructor() {
    this.vizContainer = new VizContainer();
    this.coreContainer = new CoreContainer(this.vizContainer);
    this.eventContainer = new EventContainer(
      this.coreContainer,
      this.vizContainer
    );

    this.vizContainer.renderLoop.start();

    this.initialize = this.initialize.bind(this);
  }

  initialize(element) {
    this.vizContainer.initialize(element);
    this.eventContainer.initialize(element);
  }
}
