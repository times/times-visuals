import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { data, layeredData } from "./fixtures";
import Readme from "../README.md";

import Treemap from "../src";

storiesOf("Charts/Treemap", module)
  .addParameters({
    readme: {
      sidebar: Readme
    }
  })
  .add("default", () => <Treemap data={data} />)
  .add("With hover", () => (
    <Treemap data={data} onHover={action("onHover event fired")} />
  ))
  .add("With layers", () => (
    <Treemap
      data={layeredData}
      onHover={action("onHover event fired")}
      layers={true}
    />
  ));
