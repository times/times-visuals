import React from "react";
import { storiesOf } from "@storybook/react";
import sprite from "./fixtures/sprite.jpg";

import CanvasVideo from "../src";
import Readme from "../README.md";

storiesOf("Elements/Canvas Video", module)
  .addParameters({
    readme: {
      sidebar: Readme
    }
  })
  .add("Default", () => (
    <CanvasVideo file={sprite} frames={102} cols={6} width={500} height={375} />
  ));
