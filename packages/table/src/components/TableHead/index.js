// Library
import React from "react";
import joinClasses from "join-classes";

// Styles
import style from "./style.scss";

const TableHead = ({ columns, sortBy, sortDesc, onSort }) => (
  <thead>
    <tr>
      {Object.entries(columns).map(([key, column]) => (
        <th
          key={key}
          className={joinClasses(
            column.alignLeft && style.alignLeft,
            column.alignRight && style.alignRight,
            column.isSortable && style.isSortable,
            sortBy === key && sortDesc && style.sortDesc,
            sortBy === key && !sortDesc && style.sortAsc
          )}
          onClick={() => onSort(key)}
        >
          {column.label}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHead;
