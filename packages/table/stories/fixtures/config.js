/*export const tableConfig = {
  columns: {
    sortBy: "rank",
    sortDir: "DESC"
  },
  rows: {
    display: 5,
    page: 5
  },

  rowsPerPage: 5,
  currentPage: 5
};*/

//enablePageFilter={true}
//enableSearch={true}
//enableNavigation={true}
//defaultSortBy="rank"

export const columnConfig = {
  rank: {
    label: "Rank",
    alignLeft: true,
    isSortable: true,
    type: Intrgere
  },
  name: {
    label: "Name",
    alignLeft: true,
    //isSortable: true,
    style: { fontFamily: '"TimesDigitalW04-Regular", "TimesDigital-Regular"' }
  },
  worth: {
    label: "Worth",
    alignRight: true
    //isSortable: true
  },
  change: {
    label: "Rise/Fall",
    alignRight: true
    //isSortable: true
  },
  source: {
    label: "Source of wealth",
    alignRight: true,
    //isSortable: true,
    style: { fontFamily: '"TimesDigitalW04-Regular", "TimesDigital-Regular"' }
  }
};
