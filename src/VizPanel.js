import React from "react";
import { ThreePanel } from "./viz";

export class VizPanel extends React.Component {
  componentDidMount() {
    this._panel = new ThreePanel(this.rootElement);
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
