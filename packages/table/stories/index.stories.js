// @flow
import React from "react";
import { storiesOf } from "@storybook/react";

import Table from "../src";
import { columns } from "./fixtures";
import { getRecords, countRecords } from "./api.js";

const sector = null;

storiesOf("Charts/Table", module).add("default", () => (
  <Table
    columns={columns}
    loader={getRecords(sector)}
    counter={countRecords(sector)}
    reducer={(state, action) => {
      switch (action.type) {
        case "SET_SEARCH_TERM":
          return {
            ...state,
            skip: 0
          };
        default:
          return state;
      }
    }}
    searchPlaceholder={sector ? "Search..." : "Search 10,000 companies..."}
  />
));
