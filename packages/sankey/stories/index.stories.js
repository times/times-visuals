import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { data, tieredData } from "./fixtures";

import Sankey from "../src";

storiesOf("Charts/Sankey", module)
  .add("default", () => (
    <Sankey data={data} onHover={action("onHover event fired")} />
  ))
  .add("multi-tiered", () => (
    <Sankey data={tieredData} onHover={action("onHover event fired")} />
  ));
