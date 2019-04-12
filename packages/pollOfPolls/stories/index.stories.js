import React from "react";
import { storiesOf } from "@storybook/react";

import { parties, polls, averages } from "./fixtures";
import PollOfPolls from "../src";

storiesOf("Projects/PollOfPolls", module)
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
  ))
  .add("Custom date range", () => (
    <PollOfPolls
      parties={parties}
      data={polls}
      averages={averages}
      startDate="2018-06-01"
      endDate="2018-09-10"
    />
  ))
  .add("Data source", () => (
    <PollOfPolls
      parties={parties}
      data={polls}
      averages={averages}
      dataSource="Times research"
    />
  ));
