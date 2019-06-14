import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Readme from "../README.md";

import PostcodeSearch from "../src";

storiesOf("Elements/Postcode Search", module)
  .addParameters({
    readme: {
      sidebar: Readme
    }
  })
  .add("default", () => (
    <PostcodeSearch
      onLoad={action("Postcode loaded")}
      onError={action("Error loading postcode")}
    />
  ))
  .add("custom lookup provider", () => (
    <PostcodeSearch
      provider="custom"
      onRequest={input =>
        Promise.resolve({
          postcode: "SE19GF",
          customData: "The News Building"
        })
      }
      onLoad={action("Postcode loaded")}
      onError={action("Error loading postcode")}
    />
  ));
