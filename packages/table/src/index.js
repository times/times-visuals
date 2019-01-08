// @flow
/* global window */
import React from "react";
import joinClasses from "join-classes";
import Select from "react-select";

import LoadingIndicator from "../LoadingIndicator";

import style from "./style.scss";

const reorder = (a, b) =>
  Object.keys(b).reduce(
    (acc, k) => ({
      ...acc,
      [k]: a[k]
    }),
    {}
  );

type Search = Event => void;
type UpdateShow = ({ value: number, label: number }) => void;
type SortBy = string => () => void;
type Action = {
  type: string
};
type Loader = (
  ?number,
  ?number,
  ?string,
  ?string,
  ?boolean
) => Promise<Array<*>>;
type Counter = () => Promise<?number>;
type Reducer = (State, ?Action) => State;
type Dispatch = Action => Promise<void>;
type State = {
  skip: number,
  show: number,
  searchTerm: ?string,
  sortBy: ?string,
  reverseSort: boolean,
  data: ?Array<*>,
  count: ?number,
  isLoading: boolean,
  error: boolean
};
type Props = {
  loader: Loader,
  counter: Counter,
  reducer: Reducer,
  columns: ?{
    [string]: {
      label: string,
      render?: (React$Element<any>) => React$Element<any>,
      isSortable: boolean
    }
  },
  searchPlaceholder: string
};
const defaultLoader: Loader = () => Promise.resolve([]);
const defaultReducer: Reducer = state => state;

class Table extends React.Component<Props, State> {
  static defaultProps = {
    loader: defaultLoader,
    columns: null,
    reducer: defaultReducer,
    searchPlaceholder: "Search..."
  };

  searchTimeout = null;

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

  dispatch: Dispatch = action =>
    new Promise(resolve => {
      let newState: State;
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

  componentWillMount() {
    const { loader, counter } = this.props;
    const { skip, show } = this.state;

    this.dispatch({
      type: "REQUEST_DATA"
    });

    Promise.all([counter(), loader(skip, show)]).then(([count, data]) => {
      this.dispatch({
        type: "RECEIVE_DATA",
        data
      });
      this.dispatch({
        type: "RECEIVE_COUNT",
        count
      });
    });
  }

  componentDidUpdate(oldProps: Props, oldState: State) {
    const { loader } = this.props;
    const { skip, show, searchTerm, sortBy, reverseSort } = this.state;

    if (
      skip !== oldState.skip ||
      show !== oldState.show ||
      searchTerm !== oldState.searchTerm ||
      sortBy !== oldState.sortBy ||
      reverseSort !== oldState.reverseSort
    ) {
      // This timeout prevents the "Loading..." overlay from appearing immediately
      // This is handy to prevent UI flickering for pre-cached endpoints
      // The timeout is cleared in the `.then` of the `loader()` call, so that
      //   it doesn't get fired after a successful HTTP request
      const loadTimeout = setTimeout(() => {
        this.dispatch({
          type: "REQUEST_DATA"
        });
      }, 200);

      loader(skip, show, searchTerm, sortBy, reverseSort)
        .then(data => {
          clearTimeout(loadTimeout);

          this.dispatch({
            type: "RECEIVE_DATA",
            data
          });
        })
        .catch(() => {
          this.dispatch({
            type: "RECEIVE_DATA_ERROR"
          });
        });
    }
  }

  previous = () => {
    this.dispatch({
      type: "PREVIOUS_PAGE"
    });
  };

  next = () => {
    this.dispatch({
      type: "NEXT_PAGE"
    });
  };

  search: Search = event => {
    if (!event.target) return;
    if (event.target instanceof HTMLInputElement) {
      const term = event.target.value;

      if (this.searchTimeout) clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        this.dispatch({
          type: "SET_SEARCH_TERM",
          term
        });
      }, 800);
    }
  };

  updateShow: UpdateShow = ({ value }) => {
    this.dispatch({
      type: "SET_SHOW",
      show: value
    });
  };

  sortBy: SortBy = key => () => {
    this.dispatch({
      type: "SET_SORT_BY",
      key
    });
  };

  render() {
    const { columns, searchPlaceholder } = this.props;
    const {
      data,
      skip,
      show,
      count,
      searchTerm,
      sortBy,
      reverseSort,
      isLoading
    } = this.state;

    return (
      <div className={style.Container}>
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
                    onClick={column.isSortable ? this.sortBy(key) : () => {}}
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
            {console.log(data)}
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
