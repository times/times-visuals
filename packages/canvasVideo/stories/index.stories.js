import React from "react";
import { storiesOf } from "@storybook/react";
import sprite from "./fixtures/bercow-sprite.png";

import CanvasVideo from "../src";

storiesOf("Elements/Canvas Video", module).add("Default", () => (
  <CanvasVideo
    file={sprite}
    frames={180}
    cols={10}
    fps={60}
    width={550}
    height={420}
  />
));
