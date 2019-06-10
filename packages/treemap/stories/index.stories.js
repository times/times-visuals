import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { data } from "./fixtures";

import Treemap from "../src";

storiesOf("Charts/Treemap", module)
  .add("default", () => <Treemap data={data} />)
  .add("With hover", () => (
    <Treemap data={data} onHover={action("onHover event fired")} />
  ));
