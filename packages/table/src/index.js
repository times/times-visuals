// @flow
import React from "react";
import joinClasses from "join-classes";
import Select from "react-select";
import PropTypes from "prop-types";

import style from "./style.scss";

const reorder = (a, b) =>
  Object.keys(b).reduce(
    (acc, k) => ({
      ...acc,
      [k]: a[k]
    }),
    {}
  );

export class Table extends React.Component {
  state = {
    show: 5,
    skip: 0,
    searchTerm: null,
    sortBy: "rank",
    reverseSort: false,
    data: null,
    count: null,
    isLoading: false,
    error: false
  };

  dispatch = action =>
    new Promise(resolve => {
      let newState = PropTypes.State;
      const { reducer } = this.props;
      const { skip, show } = this.state;

      const diff = skip - show;
      const newSkip = diff >= 0 ? diff : 0;

      switch (action.type) {
        case "NEXT_PAGE":
          newState = {
            ...this.state,
            skip: skip + show
          };
          break;
        case "PREVIOUS_PAGE":
          newState = {
            ...this.state,
            skip: newSkip
          };
          break;
        case "RESET_PAGE":
          newState = {
            ...this.state,
            skip: 0
          };
          break;
        case "SET_SHOW":
          newState = {
            ...this.state,
            show: action.show
          };
          break;
        case "RECEIVE_COUNT":
          newState = {
            ...this.state,
            count: action.count
          };
          break;
        case "REQUEST_DATA":
          newState = {
            ...this.state,
            isLoading: true,
            error: false
          };
          break;
        case "RECEIVE_DATA":
          newState = {
            ...this.state,
            data: action.data,
            isLoading: false,
            error: false
          };
          break;
        case "RECEIVE_DATA_ERROR":
          newState = {
            ...this.state,
            data: null,
            isLoading: false,
            error: true
          };
          break;
        case "SET_SEARCH_TERM":
          newState = {
            ...this.state,
            searchTerm: action.term
          };
          break;
        case "SET_SORT_BY":
          newState = {
            ...this.state,
            sortBy: action.key,
            reverseSort:
              this.state.sortBy === action.key &&
              this.state.reverseSort === false
          };
          break;
      }

      this.setState(() => reducer(newState, action), resolve);
    });

  state = {
    show: 5,
    skip: 0,
    searchTerm: null,
    sortBy: "rank",
    reverseSort: false,
    data: null,
    count: null,
    isLoading: false,
    error: false
  };
  render() {
    const { columns, searchPlaceholder, data } = this.props;
    const {
      skip,
      show,
      count,
      searchTerm,
      sortBy,
      reverseSort,
      isLoading
    } = this.state;
    return (
      <div>
        <section className={style.Controls}>
          <Select
            value={show}
            clearable={false}
            searchable={false}
            onChange={this.updateShow}
            options={[5, 10, 20, 50].map(v => ({
              value: v,
              label: v
            }))}
            className={style.Select}
          />

          <input
            type="text"
            name="search"
            placeholder={searchPlaceholder}
            onChange={this.search}
          />
        </section>
        <table
          className={joinClasses(
            style.Table,
            style.mobile,
            isLoading && style.loading
          )}
        >
          {columns && (
            <thead>
              <tr>
                {Object.entries(columns).map(([key, column]) => (
                  <th
                    key={key}
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
            {isLoading && (
              <tr
                className={style.messageRow}
                style={{
                  height: window.matchMedia("(min-width: 767px)").matches
                    ? `calc(6rem * ${show})`
                    : `calc(23.4rem * ${show})`
                }}
              >
                <td colSpan={Object.keys(columns).length}>
                  <LoadingIndicator />
                </td>
              </tr>
            )}

            {!isLoading &&
              data &&
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

            {!isLoading &&
              data &&
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
            <button onClick={this.previous} disabled={skip <= 0}>
              <i className="Icon Icon--arrowLeft" />
            </button>

            <button
              onClick={this.next}
              disabled={!data || data.length < show || skip + show >= count}
            >
              <i className="Icon Icon--arrowRight" />
            </button>
          </aside>
        </section>
      </div>
    );
  }
}

export default Table;
