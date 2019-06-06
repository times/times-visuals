export const data = {
  nodes: [
    { node: 0, name: "Labour" },
    { node: 1, name: "Labour" },
    { node: 2, name: "Green" },
    { node: 3, name: "Lib Dem" },
    { node: 4, name: "Other parties" },
    { node: 5, name: "Did not vote" },
    { node: 6, name: "Can't recall/refuse to say" }
  ],
  links: [
    { source: 0, target: 1, value: 45 },
    { source: 0, target: 2, value: 19 },
    { source: 0, target: 3, value: 15 },
    { source: 0, target: 4, value: 7 },
    { source: 0, target: 5, value: 10 },
    { source: 0, target: 6, value: 3 }
  ]
};

export const tieredData = {
  nodes: [
    { node: 0, name: "node0" },
    { node: 1, name: "node1" },
    { node: 2, name: "node2" },
    { node: 3, name: "node3" },
    { node: 4, name: "node4" }
  ],
  links: [
    { source: 0, target: 2, value: 2 },
    { source: 1, target: 2, value: 2 },
    { source: 1, target: 3, value: 2 },
    { source: 0, target: 4, value: 2 },
    { source: 2, target: 3, value: 2 },
    { source: 2, target: 4, value: 2 },
    { source: 3, target: 4, value: 4 }
  ]
};
