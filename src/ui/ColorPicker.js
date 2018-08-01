import React from "react";
import { TwitterPicker } from "react-color";

export class ColorPicker extends React.Component {
  handleChangeComplete = color => {
    const hexColor = parseInt(color.hex.replace("#", "0x"), 16);
    this.props.controller.setColor(hexColor);
  };

  render() {
    return (
      <div className="color-picker">
        <TwitterPicker
          triangle="hide"
          color={this.props.controller.color()}
          onChangeComplete={this.handleChangeComplete}
        />
      </div>
    );
  }
}
