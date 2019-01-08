// @flow
/* global window */
import React from "react";
import joinClasses from "join-classes";
import Select from "react-select";

import style from "./style.scss";

const reorder = (a, b) =>
  Object.keys(b).reduce(
    (acc, k) => ({
      ...acc,
      [k]: a[k]
    }),
    {}
  );

class Table extends React.Component<Props, State> {
  state = {
    show: 5,
    skip: 0,
    searchTerm: null,
    sortBy: "rank",
    reverseSort: false,
    count: null,
    error: false,
    searchPlaceholder: "Search"
  };

  componentWillMount() {}

  componentDidUpdate(oldProps: Props, oldState: State) {}

  render() {
    const {
      pageFilter,
      search,
      columns,
      onPageFilterChange,
      onSearchChange,
      data,
      onSortChange,
      onPreviousClick,
      onNextClick,
      navigation
    } = this.props;
    const {
      skip,
      show,
      count,
      searchTerm,
      sortBy,
      reverseSort,
      searchPlaceholder
    } = this.state;
    return (
      <div className={style.Container}>
        <section className={style.Controls}>
          {pageFilter && (
            <Select
              value={show}
              clearable={false}
              searchable={false}
              onChange={onPageFilterChange}
              options={[5, 10, 20, 50].map(v => ({
                value: v,
                label: v
              }))}
              className={style.Select}
            />
          )}

          {search && (
            <input
              type="text"
              name="search"
              placeholder={searchPlaceholder}
              onChange={onSearchChange}
            />
          )}
        </section>

        <table className={joinClasses(style.Table, style.mobile)}>
          {columns && (
            <thead>
              <tr>
                {Object.entries(columns).map(([key, column]) => (
                  <th
                    key={key}
                    onClick={column.isSortable ? onSortChange(key) : () => {}}
                    className={joinClasses(
                      column.isSortable && style.isSortable,
                      sortBy === key && style.isSorted,
                      sortBy === key && reverseSort
                        ? style.sortUp
                        : style.sortDown
                    )}
                    style={column.style || {}}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {data &&
              data.length === 0 && (
                <tr
                  className={style.messageRow}
                  style={{
                    height: `calc(6rem * ${show})`
                  }}
                >
                  <td colSpan={Object.keys(columns).length}>
                    No results containing your search term were found
                  </td>
                </tr>
              )}

            {data &&
              data.length > 0 &&
              data.map((d, i) => (
                <tr key={i}>
                  {Object.entries(reorder(d, columns)).map(([key, value]) => (
                    <td
                      key={key}
                      style={columns[key].style || {}}
                      data-name={columns[key].label}
                    >
                      {columns[key].render ? columns[key].render(value) : value}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {navigation && (
          <section className={style.Navigation}>
            {count &&
              data &&
              !searchTerm && (
                <p>
                  Displaying {(skip + 1).toLocaleString()} to{" "}
                  {(skip + data.length).toLocaleString()} of{" "}
                  {count.toLocaleString()} entries
                </p>
              )}
            {count &&
              data &&
              searchTerm && (
                <p>
                  Displaying {skip + 1} to {skip + data.length} results for "
                  {searchTerm}"
                </p>
              )}
            <aside>
              <button onClick={onPreviousClick}>
                <i className="Icon Icon--arrowLeft" />
              </button>

              <button onClick={onNextClick}>
                <i className="Icon Icon--arrowRight" />
              </button>
            </aside>
          </section>
        )}
      </div>
    );
  }
}
export default Table;
