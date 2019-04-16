// Library
import React from "react";
import joinClasses from "join-classes";

// Components
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";

// Styles
import style from "./style.scss";

class Table extends React.Component<Props, State> {
  /*static defaultProps = {
    tableConfig: {
      columns: {},
      rows: {
        show: 5,
        page: 0
      }
    }
  };*/

  state = {
    //searchTerm: null,
    //searchPlaceholder: "Search"

    page: 0,
    perPage: 5,

    sortBy: null,
    sortDesc: false

    //count: null,
    //error: false,
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

  handlePageFilterChange = ({ value }) => {
    /*const { onPageFilterChange } = this.props;

    this.setState(
      () => ({
        show: value
      }),
      () => {
        onPageFilterChange(value);
      }
    );*/
  };

  onSort = key => {
    const { columnConfig } = this.props;
    const { sortBy, sortDesc } = this.state;

    if (!columnConfig[key].isSortable) return;

    this.setState(
      () => ({ sortBy: key, sortDesc: sortBy === key ? !sortDesc : false })
      //() => onSortChange(this.state.sortBy, this.state.sortDesc)
    );
  };

  dataSort = (a, b) => {
    const { sortBy, sortDesc } = this.state;
    const sortDir = sortDesc ? -1 : 1;

    return a[sortBy] > b[sortBy]
      ? 1 * sortDir
      : a[sortBy] < b[sortBy]
        ? -1 * sortDir
        : 0;
  };

  getCurrentRows = () => {
    const { dataDump } = this.props;
    const { page, perPage, sortBy, sortDesc } = this.state;

    if (dataDump) return dataDump.sort(this.dataSort);
  };

  render() {
    const { tableConfig, columnConfig } = this.props;
    const { sortBy, sortDesc } = this.state;

    const rows = this.getCurrentRows();

    return (
      <React.Fragment>
        {/*<TableControls />*/}

        <table className={style.Table}>
          {columnConfig && (
            <TableHead
              columns={columnConfig}
              sortBy={sortBy}
              sortDesc={sortDesc}
              onSort={this.onSort}
            />
          )}

          <TableBody
            columns={columnConfig}
            rows={rows}
            //dataDump={dataDump}
            //sortBy={sortBy}
            //sortDesc={sortDesc}
            //onSort={this.onSort}
          />
        </table>
      </React.Fragment>
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
