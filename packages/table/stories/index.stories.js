// @flow
import React from "react";
import { storiesOf } from "@storybook/react";

import Table from "../src";
import { columns, data } from "./fixtures";
import { action } from "@storybook/addon-actions";

storiesOf("Charts/Table", module).add("default", () => (
  <Table
    enablePageFilter={true}
    enableSearch={true}
    columns={columns}
    onPageFilterChange={action("drop down filter changed")}
    onSearchChange={action("text search entered")}
    enableNavigation={true}
    data={data}
    onSortChange={action("column sort clicked")}
    onNextClick={action("next clicked")}
    onPreviousClick={action("previous clicked")}
  />
));
