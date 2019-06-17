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
  .add("default", () => <Headline headline="This is a headline" />)
  .add("With a standfirst", () => (
    <Headline headline="This is a headline" standfirst="This is a standfirst" />
  ))
  .add("With a label", () => (
    <Headline
      headline="This is a headline"
      standfirst="This is a standfirst"
      label="This is a label"
    />
  ));
