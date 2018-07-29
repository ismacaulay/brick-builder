import React, { Component } from "react";
import { Canvas } from "./Canvas";
import { ApplicationContainer } from "./ApplicationContainer";

class App extends Component {
  constructor(props) {
    super(props);

    this._appContainer = new ApplicationContainer();
  }

  render() {
    return (
      <div className="App">
        <Canvas onCreated={this._appContainer.initialize} />
      </div>
    );
  }
}

export default App;
