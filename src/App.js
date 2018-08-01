import React, { Component } from "react";
import { Canvas } from "./Canvas";
import { ApplicationContainer } from "./ApplicationContainer";
import { ColorPicker } from "./ui/ColorPicker";

class App extends Component {
  constructor(props) {
    super(props);

    this._appContainer = new ApplicationContainer();
  }

  render() {
    return (
      <div className="App">
        <Canvas onCreated={this._appContainer.initialize} />
        <ColorPicker
          controller={this._appContainer.coreContainer.blockColorController}
        />
      </div>
    );
  }
}

export default App;
