import React from "react";
import { storiesOf } from "@storybook/react";

import Headline from "../src";
import Readme from "../README.md";

storiesOf("Elements/Headline", module)
  .addParameters({
    readme: {
      sidebar: Readme
    }
  })
  .add("default", () => <Headline>This is a headline</Headline>)
  .add("With a standfirst", () => (
    <Headline standfirst="This is a standfirst">This is a headline</Headline>
  ))
  .add("With a label", () => (
    <Headline standfirst="This is a standfirst" label="This is a label">
      This is a headline
    </Headline>
  ));
