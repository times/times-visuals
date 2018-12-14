import React from "react";
import { storiesOf } from "@storybook/react";

import { parties, polls, averages } from "./fixtures";
import PollOfPolls from "../src";

storiesOf("Projects/Poll of Polls", module)
  .add("default", () => (
    <PollOfPolls parties={parties} data={polls} averages={averages} />
  ))
  .add("Ridiculous circles", () => (
    <PollOfPolls
      parties={parties}
      data={polls}
      averages={averages}
      circleRadius={10}
    />
  ))
  .add("Custom y domain", () => (
    <PollOfPolls
      parties={parties}
      data={polls}
      averages={averages}
      yDomain={[0, 100]}
    />
  ));
