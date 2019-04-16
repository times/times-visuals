export const columnConfig = {
  rank: {
    label: "Rank",
    alignLeft: true,
    isSortable: true,
    initialSort: true
  },
  name: {
    label: "Name",
    alignLeft: true,
    isSortable: true,
    style: {
      //minWidth: "36%",
      fontFamily: '"TimesDigitalW04-Regular", "TimesDigital-Regular"'
    }
  },
  worth: {
    label: "Worth",
    alignRight: true,
    isSortable: true
  },
  change: {
    label: "Rise/Fall",
    alignRight: true,
    isSortable: true
  },
  source: {
    label: "Source of wealth",
    alignRight: true,
    isSortable: true,
    style: {
      fontFamily: '"TimesDigitalW04-Regular", "TimesDigital-Regular"'
    }
  }
};
