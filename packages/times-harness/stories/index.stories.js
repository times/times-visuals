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
      <pre>
        <code>
          {`module.exports = webpackGenerator(
  "./src/index.js",
  { 
    baseDirectory: path.resolve(__dirname, "./src"),
    distDirectory:  path.resolve(__dirname, "./.tmp")
  },
  "your-component-name",
  \`<your-component-name example="attribute"></your-component-name>\`
);`}
        </code>
      </pre>
    </p>
    <p>
      You can optionally pass a build mode as the final argument –{" "}
      <code>development</code> (default if not supplied) or{" "}
      <code>production</code>:
    </p>
    <p>
      <pre>
        <code>
          {`module.exports = webpackGenerator(
  "./src/index.js",
  { 
    baseDirectory: path.resolve(__dirname, "./src"),
    distDirectory:  path.resolve(__dirname, "./.tmp")
  },
  "your-component-name",
  \`<your-component-name example="attribute"></your-component-name>\`,
  "production"
);`}
        </code>
      </pre>
    </p>
  </div>
));
