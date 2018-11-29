import React from "react";
import { storiesOf } from "@storybook/react";
import { colors } from "@times-visuals/styles";

import Barcode from "../src";

import data from "./fixtures";

storiesOf("Charts/Barcode", module)
  .add("default", () => <Barcode data={data} valueField="Exports" />)
  .add("custom colour", () => (
    <Barcode
      data={data}
      valueField="Exports"
      config={{
        barColor: colors.yellow
      }}
    />
  ));
