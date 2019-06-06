import { addDecorator, addParameters, configure } from "@storybook/react";
import { addReadme } from "storybook-readme";

addParameters({
  options: {
    panelPosition: "right"
  }
});
addDecorator(addReadme);

// automatically import all files ending in *.stories.js
const req = require.context("../packages/", true, /.stories.js$/);

configure(() => req.keys().forEach(filename => req(filename)), module);
