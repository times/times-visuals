export const columns = {
  rank: {
    label: "Rank",
    style: {
      textAlign: "left"
    },
    isSortable: true,
    render: v => parseInt(v).toLocaleString()
  },
  name: {
    label: "Company",
    style: {
      minWidth: "36%",
      textAlign: "left"
    },
    isSortable: true
  },
  pay_gap: {
    label: "Pay gap, mean (median)",
    isSortable: true
  },
  bonus_gap: {
    label: "Bonus gap, mean (median)",
    isSortable: true
  }
};
