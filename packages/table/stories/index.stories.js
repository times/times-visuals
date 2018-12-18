// @flow
import React from "react";
import { storiesOf } from "@storybook/react";

import Table from "../src";
import { data, columns } from "./fixtures";

storiesOf("Charts/Table", module).add("default", () => (
  <Table data={data} columns={columns} />
));
