import React from "react";
import { PanelContainer } from "./PanelContainer";

export class VizPanel extends React.Component {
  componentDidMount() {
    this._panel = new PanelContainer(this.rootElement);
  }

  render() {
    return (
      <div
        className="threePanel"
        ref={element => (this.rootElement = element)}
      />
    );
  }
}
