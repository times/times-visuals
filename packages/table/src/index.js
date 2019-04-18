// Library
import React from "react";
import joinClasses from "join-classes";

// Components
import ShowSelect from "./components/ShowSelect";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";

//  Helpers
import { SORT_ASCENDING, SORT_DESCENDING } from "./helpers";

// Styles
import style from "./style.scss";

class Table extends React.Component<Props, State> {
  static defaultProps = {
    enableShowSelect: true,

    //enableSearch: true,
    //enableNavigation: true,
    //enableShowSelect: true,

    skip: 0,
    show: 5,

    onSortChange: () => {},
    onShowChange: () => {}
  };

  state = {
    //count: null,
    //error: false,
    //searchTerm: null,
    //searchPlaceholder: "Search"
    //page: 0,
    //perPage: 5,

    //filterPage: 5,

    skip: this.props.skip,
    show: this.props.show,

    preSortColumn: this.props.preSortColumn,
    sortColumn: this.props.sortColumn,

    sortDirection:
      this.props.sortDirection === SORT_DESCENDING
        ? SORT_DESCENDING
        : SORT_ASCENDING
  };

  handleSearchChange = e => {
    e.preventDefault();

    /*const { onSearchChange } = this.props;

    const searchTerm = e.target.value;

    this.setState(
      () => ({
        searchTerm
      }),
      () => {
        onSearchChange(searchTerm);
      }
    );*/
  };

  onShowChange = ({ value }) => {
    this.setState(
      () => ({ show: value }),
      () => this.props.onShowChange(this.state.show)
    );
  };

  onSort = key => {
    const { columnConfig, onSortChange } = this.props;
    const { sortColumn, sortDirection } = this.state;

    if (!columnConfig[key].isSortable) return;

    this.setState(
      () => ({
        sortColumn: key,
        sortDirection:
          sortColumn === key && sortDirection === SORT_ASCENDING
            ? SORT_DESCENDING
            : SORT_ASCENDING
      }),
      () => onSortChange(this.state.sortColumn, this.state.sortDirection)
    );
  };

  sortData(data, sortColumn, sortDirection) {
    if (!sortColumn) return data;

    return data.slice().sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "boolean" && typeof valueB === "boolean")
        return sortDirection === SORT_ASCENDING
          ? valueA - valueB
          : valueB - valueA;

      if (valueA !== null && valueB === null)
        return sortDirection === SORT_ASCENDING ? 1 : -1;

      if (valueA === null && valueB !== null)
        return sortDirection === SORT_ASCENDING ? -1 : 1;

      if (isNaN(valueA) && !isNaN(valueB))
        return sortDirection === SORT_ASCENDING ? 1 : -1;

      if (!isNaN(valueA) && isNaN(valueB))
        return sortDirection === SORT_ASCENDING ? -1 : 1;

      if (isNaN(valueA) && isNaN(valueB))
        return sortDirection === SORT_ASCENDING
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);

      return sortDirection === SORT_ASCENDING
        ? parseFloat(valueA) - parseFloat(valueB)
        : parseFloat(valueB) - parseFloat(valueA);
    });
  }

  getRows = () => {
    const { dataDump } = this.props;
    const { skip, show, preSortColumn, sortColumn, sortDirection } = this.state;

    if (dataDump) {
      const preSort = this.sortData(dataDump, preSortColumn, sortDirection);
      const data = this.sortData(preSort, sortColumn, sortDirection);
      return data.filter((r, index) => index >= skip && index < skip + show);
    }
  };

  render() {
    const { columnConfig, enableShowSelect } = this.props;
    const { show, sortColumn, sortDirection } = this.state;

    return (
      <div className={style.temp}>
        <section className={style.Controls}>
          {enableShowSelect && (
            <ShowSelect show={show} onShowChange={this.onShowChange} />
          )}

          {/*enableSearch && (
            <input
              type="text"
              name="search"
              placeholder={searchPlaceholder}
              onChange={this.handleSearchChange}
            />
          )*/}
        </section>

        <table className={style.Table}>
          {columnConfig && (
            <TableHead
              columns={columnConfig}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={this.onSort}
            />
          )}

          <TableBody columns={columnConfig} rows={this.getRows()} />
        </table>
      </div>
    );
  }
}
export default Table;

/*
const {
  enableSearch,
  enablePageFilter,
  columnConfig,
  onPageFilterChange,
  onSearchChange,
  dataDump
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
  sortDesc
  //searchPlaceholder
} = this.state;
*/

/*
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
*/

/*
{enableNavigation && (
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
*/
