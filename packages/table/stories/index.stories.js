// @flow
import React from "react";
import { storiesOf } from "@storybook/react";

import Table from "../src";
import data from "./fixtures";

storiesOf("Charts/Table", module).add("default", () => (
  <Table
    data={data}
    columns={{
      Imports: {
        label: "Imports",
        isSortable: true
      },
      Exports: {
        label: "Exports",
        isSortable: true
      },
      rankImports: {
        label: "Rank Imports",
        isSortable: true
      },
      rankExports: {
        label: "Rank Exports",
        isSortable: true
      }
    }}
  />
));
