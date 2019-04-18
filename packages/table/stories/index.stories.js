// Libraries
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// Config / Data
import { tableConfig, columnConfig } from "./fixtures/config";
import { data } from "./fixtures/data";

// Components
import Table from "../src";

// Styles
import style from "./fixtures/style.scss";

storiesOf("Charts/Table", module).add("default", () => (
  <Table
    {...tableConfig}
    columnConfig={columnConfig}
    dataDump={data}
    //
    onSortChange={action("column sort")}
    onShowChange={action("show changed")}
    //onSearchChange={action("text search entered")}
    //onNextClick={action("next clicked")}
    //onPreviousClick={action("previous clicked")}
  />
));
