import React from "react";
import { storiesOf } from "@storybook/react";

import Hemicycle from "../src";
import Readme from "../README.md";

import { data } from "./fixtures";

storiesOf("Charts/Hemicycle", module)
  .addParameters({
    readme: {
      sidebar: Readme
    }
  })
  .add("default", () => <Hemicycle data={data} />)
  .add("with legend", () => <Hemicycle data={data} showLegend={true} />);
