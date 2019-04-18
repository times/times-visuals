import React from "react";
import { storiesOf } from "@storybook/react";
import { data } from "./fixtures";

import Hemicycle from "../src";

storiesOf("Charts/Hemicycle", module).add("default", () => (
  <Hemicycle data={data} />
));

storiesOf("Charts/Hemicycle", module).add("with legend", () => (
  <Hemicycle data={data} showLegend={true} />
));
