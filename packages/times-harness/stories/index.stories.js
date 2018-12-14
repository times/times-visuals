import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Helpers/Times Harness", module).add("default", () => (
  <div>
    <p>Webpack config harness for The Times website, usage:</p>
    <p>
      <code>{`const path = require("path");`}</code>
    </p>
    <p>
      <code>
        {`const webpackGenerator = require("@times-visuals/times-harness");`}
      </code>
    </p>
    <p>
      <code>
        {`module.exports = webpackGenerator("./src/index.js", { baseDirectory: '', distDirectory: '' },
        "<p>some HTML here</p>");`}
      </code>
    </p>
  </div>
));
