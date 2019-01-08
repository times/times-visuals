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
  static defaultProps = {
    defaultSortBy: null
  };

  state = {
    show: 5,
    skip: 0,
    searchTerm: null,
    sortBy: this.props.defaultSortBy,
    reverseSort: false,
    count: null,
    error: false,
    searchPlaceholder: "Search"
  };

  handleColumnSort = (sortBy, column) => e => {
    e.preventDefault();

    if (!column.isSortable) return;

    const { onSortChange } = this.props;
    const { reverseSort } = this.state;

    this.setState(
      () => ({
        sortBy,
        reverseSort: this.state.sortBy === sortBy ? !reverseSort : reverseSort
      }),
      () => {
        onSortChange(this.state.sortBy, this.state.reverseSort);
      }
    );
  };

  handleSearchChange = e => {
    e.preventDefault();

    const { onSearchChange } = this.props;

    const searchTerm = e.target.value;

    this.setState(
      () => ({
        searchTerm
      }),
      () => {
        onSearchChange(searchTerm);
      }
    );
  };

  handlePageFilterChange = ({ value }) => {
    const { onPageFilterChange } = this.props;

    this.setState(
      () => ({
        show: value
      }),
      () => {
        onPageFilterChange(value);
      }
    );
  };

  render() {
    const {
      enableSearch,
      enablePageFilter,
      columns,
      onPageFilterChange,
      onSearchChange,
      data,
      onSortChange,
      onPreviousClick,
      onNextClick,
      enableNavigation
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
          {enablePageFilter && (
            <Select
              value={{
                value: show,
                label: show
              }}
              clearable={false}
              searchable={false}
              onChange={this.handlePageFilterChange}
              options={[5, 10, 20, 50].map(v => ({
                value: v,
                label: v
              }))}
              className={style.Select}
            />
          )}

          {enableSearch && (
            <input
              type="text"
              name="search"
              placeholder={searchPlaceholder}
              onChange={this.handleSearchChange}
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
                    onClick={this.handleColumnSort(key, column)}
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
            {data && data.length === 0 && (
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
        {enableNavigation && (
          <section className={style.Navigation}>
            {count && data && !searchTerm && (
              <p>
                Displaying {(skip + 1).toLocaleString()} to{" "}
                {(skip + data.length).toLocaleString()} of{" "}
                {count.toLocaleString()} entries
              </p>
            )}
            {count && data && searchTerm && (
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
