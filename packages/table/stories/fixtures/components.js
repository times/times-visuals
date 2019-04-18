// Libraries
import React from "react";

// Components
export const Rank = ({ row }) => (
  <div>
    {row.rankStr}
    {row.rankPrev && <span> ({row.rankPrev})</span>}
  </div>
);

const NewEntry = () => (
  <React.Fragment>
    <svg viewBox="0 0 300 300" style={{ fill: "#693481" }}>
      <path d="M140 220l82.29 33.262-6.205-88.541 57.063-67.983-86.125-21.459L140 0 92.977 75.279 6.852 96.738l57.063 67.983-6.205 88.541L140 220" />
    </svg>
    NEW
  </React.Fragment>
);

const Rise = ({ change }) => (
  <React.Fragment>
    <svg viewBox="0 0 300 300" style={{ fill: "#117C08" }}>
      <path d="M149.93,2,261.26,149.5H205.6V297H94.27V149.5H38.6Z" />
    </svg>
    {change}
  </React.Fragment>
);

const Fall = ({ change }) => (
  <React.Fragment>
    <svg viewBox="0 0 300 300" style={{ fill: "#AF1722" }}>
      <path d="M38.6,150.5H94.27V3H205.6V150.5h55.66L149.93,298Z" />
    </svg>
    {change}
  </React.Fragment>
);

export const Change = ({ change, changeStr }) => (
  <div>
    {change === null && <NewEntry />}
    {change === 0 && <React.Fragment>-</React.Fragment>}
    {change > 0 && <Rise change={changeStr} />}
    {change < 0 && <Fall change={changeStr} />}
  </div>
);
