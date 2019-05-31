import React from "react";
import canvid from "canvid";

export class CanvasVideo extends React.Component {
  componentDidMount() {
    const { file, frames, cols, fps, width, height } = this.props;

    const canvidControl = canvid({
      selector: this.video,
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
    return <div ref={video => (this.video = video)} />;
  }
}
export default CanvasVideo;
