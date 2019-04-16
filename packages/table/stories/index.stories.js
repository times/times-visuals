// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
//import { action } from "@storybook/addon-actions";

// Components
import Table from "../src";

// Config
import { columnConfig } from "./fixtures/config";

// Data
import { dataDump } from "./fixtures/dataDump";

storiesOf("Charts/Table", module).add("default", () => (
  <Table
    //tableConfig={tableConfig}
    columnConfig={columnConfig}
    dataDump={dataDump}

    //onPageFilterChange={action("page filter changed")}
    //onSearchChange={action("text search entered")}
    //onSortChange={action("column sort clicked")}
    //onNextClick={action("next clicked")}
    //onPreviousClick={action("previous clicked")}
  />
));
