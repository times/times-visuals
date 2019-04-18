// Libraries
import React from "react";

// Components
import { Rank, Change } from "./components";

// Helpers
const formatMillions = value => {
  if (value) {
    const str = value.toString();
    return str.length > 3
      ? `£${str.substr(0, str.length - 3)},${str.substr(-3)}m`
      : `£${str}m`;
  }
};

/*const formatBillions = value =>
  value >= 1000 ? `£${Math.round(value / 100) / 10}b` : `£${value}m`;*/

// Config
export const tableConfig = {
  preSortColumn: "name",
  sortColumn: "rank"
};

export const columnConfig = {
  rank: {
    label: "Rank",
    alignLeft: true,
    isSortable: true,
    render: row => <Rank row={row} />
  },
  name: {
    label: "Name",
    alignLeft: true,
    isSortable: true
  },
  worth: {
    label: "Worth",
    alignRight: true,
    isSortable: true,
    render: row => formatMillions(row.worth)
  },
  change: {
    label: "Rise/Fall",
    alignRight: true,
    isSortable: true,
    render: row => (
      <Change
        change={row.change}
        changeStr={formatMillions(Math.abs(row.change))}
      />
    )
  },
  source: {
    label: "Source of wealth",
    alignRight: true,
    isSortable: true
  }
};
