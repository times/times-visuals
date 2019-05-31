import React from "react";
import canvid from "canvid";
import style from "./style.scss";

export class CanvasVideo extends React.Component {
  componentDidMount() {
    const { file, frames, cols, fps, width, height } = this.props;

    const canvidControl = canvid({
      selector: ".video",
      videos: {
        clip1: {
          src: file,
          frames: frames,
          cols: cols,
          fps: fps
        }
      },
      width: width,
      height: height,
      loaded: function() {
        canvidControl.play("clip1");
      }
    });
  }
  render() {
    return <div className={"video"} />;
  }
}
export default CanvasVideo;
