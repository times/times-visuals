import React from "react";
import { storiesOf } from "@storybook/react";

import Readme from "../README.md";

storiesOf("Helpers/Times Harness", module)
  .addParameters({
    readme: {
      content: Readme
    }
  })
  .add("documentation", () => null);
