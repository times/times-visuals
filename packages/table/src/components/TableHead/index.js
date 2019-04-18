// Library
import React from "react";
import joinClasses from "join-classes";

//  Helpers
import { SORT_ASCENDING, SORT_DESCENDING } from "../../helpers";

// Styles
import style from "./style.scss";

const TableHead = ({ columns, sortColumn, sortDirection, onSort }) => (
  <thead>
    <tr>
      {Object.entries(columns).map(([key, column]) => (
        <th
          key={key}
          className={joinClasses(
            column.alignLeft && style.alignLeft,
            column.alignRight && style.alignRight,
            column.isSortable && style.isSortable,
            sortColumn === key &&
              sortDirection === SORT_ASCENDING &&
              style.sortAsc,
            sortColumn === key &&
              sortDirection === SORT_DESCENDING &&
              style.sortDesc
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
