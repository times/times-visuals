import React from "react";
import { storiesOf } from "@storybook/react";
import sprite from "./fixtures/sprite.jpg";

import CanvasVideo from "../src";

storiesOf("Elements/Canvas Video", module).add("Default", () => (
  <CanvasVideo file={sprite} frames={102} cols={6} width={500} height={375} />
));
