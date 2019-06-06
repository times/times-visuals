import React from "react";
import { storiesOf } from "@storybook/react";
import { data, tieredData } from "./fixtures";

import Sankey from "../src";

const onHover = d => {
  console.log(d);
};

storiesOf("Charts/Sankey", module)
  .add("default", () => <Sankey data={data} onHover={onHover} />)
  .add("multi-tiered", () => <Sankey data={tieredData} onHover={onHover} />);
