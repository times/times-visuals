// Library
import React from "react";
import joinClasses from "join-classes";

// Styles
import style from "./style.scss";

const TableBody = ({ columns, rows }) => (
  <tbody>
    {/*data &&
      data.length === 0 && (
        <tr className={style.messageRow}>
          <td colSpan={Object.keys(columns).length}>
            No results containing your search term were found
          </td>
        </tr>
      )*/}

    {rows &&
      rows.length > 0 &&
      rows.map((row, index) => (
        <tr key={index}>
          {columns &&
            Object.entries(columns).map(([key, column]) => (
              <td
                key={key}
                className={joinClasses(
                  column.alignLeft && style.alignLeft,
                  column.alignRight && style.alignRight
                )}
                style={column.style || {}}
              >
                {columns[key].render ? columns[key].render(row[key]) : row[key]}
              </td>
            ))}

          {!columns &&
            Object.entries(row).map(([key, value]) => (
              <td key={key}>{value}</td>
            ))}
        </tr>
      ))}
  </tbody>
);

export default TableBody;
