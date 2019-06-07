export const data = {
  nodes: [
    { node: 0, name: "Labour", color: "#EC5156" },
    { node: 1, name: "Labour", color: "#EC5156" },
    { node: 2, name: "Green", color: "#61A961" },
    { node: 3, name: "Lib Dem", color: "#EAAA00" },
    { node: 4, name: "Other parties", color: "#dbcec0" },
    { node: 5, name: "Did not vote", color: "#cab79d" },
    { node: 6, name: "Can't recall/refuse to say", color: "#eee7e0" }
  ],
  links: [
    { source: 0, target: 1, value: 45, color: "#EC5156" },
    { source: 0, target: 2, value: 19, color: "#EC5156" },
    { source: 0, target: 3, value: 15, color: "#EC5156" },
    { source: 0, target: 4, value: 7, color: "#EC5156" },
    { source: 0, target: 5, value: 10, color: "#EC5156" },
    { source: 0, target: 6, value: 3, color: "#EC5156" }
  ]
};

export const tieredData = {
  nodes: [
    { node: 0, name: "node0", color: "#EC5156" },
    { node: 1, name: "node1", color: "#4093B2" },
    { node: 2, name: "node2", color: "#EAAA00" },
    { node: 3, name: "node3", color: "#9767AE" },
    { node: 4, name: "node4", color: "#F6D700" }
  ],
  links: [
    { source: 0, target: 2, value: 2, color: "#EC5156" },
    { source: 1, target: 2, value: 2, color: "#4093B2" },
    { source: 1, target: 3, value: 2, color: "#4093B2" },
    { source: 0, target: 4, value: 2, color: "#EC5156" },
    { source: 2, target: 3, value: 2, color: "#EAAA00" },
    { source: 2, target: 4, value: 2, color: "#EAAA00" },
    { source: 3, target: 4, value: 4, color: "#9767AE" }
  ]
};
