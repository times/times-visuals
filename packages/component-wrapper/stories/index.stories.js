import React from "react";
import { storiesOf } from "@storybook/react";

import Wrapper from "../src";
import Readme from "../README.md";

storiesOf("Elements/Component wrapper", module)
  .addParameters({
    readme: {
      sidebar: Readme
    }
  })
  .add("default", () => <Wrapper>Test</Wrapper>);
