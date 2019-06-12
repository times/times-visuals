import React from "react";
import { storiesOf } from "@storybook/react";
import ScriptLoader from "@times-visuals/script-loader";

import webComponentHarness from "../src";
import Readme from "../README.md";

const Demo = ({ greeting = "Hello", forename = "world" }) => (
  <div>
    {greeting}, {forename}!
  </div>
);

storiesOf("Helpers/Web Component Harness", module)
  .addParameters({
    readme: {
      sidebar: Readme
    }
  })
  .addDecorator(story => (
    <ScriptLoader src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/webcomponents-lite.min.js">
      {story}
    </ScriptLoader>
  ))
  .add("default", () => {
    webComponentHarness(Demo, "sample-web-component");

    return (
      <div>
        <sample-web-component />
      </div>
    );
  })
  .add("with attributes", () => {
    webComponentHarness(Demo, "sample-web-component");

    return (
      <div>
        <sample-web-component greeting="Hey" forename="Chris" />
      </div>
    );
  });
