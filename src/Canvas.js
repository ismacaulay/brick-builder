import React from "react";

export class Canvas extends React.Component {
  componentDidMount() {
    this.props.onCreated(this.rootElement);
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
