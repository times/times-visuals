import React from "react";
import { storiesOf } from "@storybook/react";

import BigNumber from "../src";

storiesOf("Elements/Big Number", module)
  .add("default", () => <BigNumber number={23} label="This is a label" />)
  .add("without a label", () => <BigNumber number={23} />)
  .add("with a custom colour", () => (
    <BigNumber number={23} color="rebeccapurple" label="This is a label" />
  ))
  .add("bigger number", () => (
    <BigNumber number={23} type="big" label="This is a label" />
  ))
  .add("with a prefix and suffix", () => (
    <BigNumber number={23} label="This is a label" prefix="£" suffix="m" />
  ))
  .add("with a custom start value", () => (
    <BigNumber
      number={1000}
      defaultStart={900}
      label="This starts at 900"
      prefix="£"
      suffix="m"
    />
  ));
