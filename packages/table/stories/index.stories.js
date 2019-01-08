// @flow
import React from "react";
import { storiesOf } from "@storybook/react";

import Table from "../src";
import TableTest from "../test";
import { columns, data } from "./fixtures";
import { getRecords, countRecords } from "./api.js";
import { action } from "@storybook/addon-actions";

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

storiesOf("Charts/Table", module).add("test", () => (
  <TableTest
    pageFilter={true}
    search={true}
    columns={columns}
    onPageFilterChange={action("drop down filter changed")}
    onSearchChange={action("text search entered")}
    navigation={true}
    data={data}
    onSortChange={action("column sort clicked")}
    onNextClick={action("next clicked")}
    onPreviousClick={action("previous clicked")}
  />
));
