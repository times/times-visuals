import React from "react";
import { storiesOf } from "@storybook/react";

import ScriptLoader from "../src";
import Readme from "../README.md";

storiesOf("Helpers/Script Loader", module)
  .addParameters({
    readme: {
      sidebar: Readme
    }
  })
  .add("default", () => (
    <ScriptLoader src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js">
      {() => (
        <div>
          <p>jQuery has landed!</p>
          <p>
            Result of <code>$("body")</code> below...
          </p>
          <p>
            <code>{JSON.stringify($("body"))}</code>
          </p>
        </div>
      )}
    </ScriptLoader>
  ));
