/* global window */
import * as selection from "d3-selection";
import * as scale from "d3-scale";

const d3 = {
  ...selection,
  ...scale
};

export const getPosition = node => {
  const event = window.event;
  let x, y;
  if (!event) {
    return null;
  } else {
    const rect = node.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  }
  return {
    x,
    y
  };
};

export const drawChart = (chartNode, data, d3sankey, onHover) => {
  if (!chartNode) return;
  if (!data) return;

  // set the dimensions and config.margin of the graph
  const { width } = chartNode.getBoundingClientRect();
  const isMobile = width < 500 ? true : false;

  const config = {
    width: width,
    height: 600,
    margin: {
      top: 50,
      right: 50,
      bottom: 30,
      left: isMobile ? 70 : 150
    },
    get usableWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    get usableHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    }
  };

  // set the width and height of the svg
  const svg = d3.select(chartNode).at({
    width: config.width,
    height: config.height
  });

  const g = svg.append("g").at({
    transform: `translate(${config.margin.left},${config.margin.top})`,
    width: config.usableWidth,
    height: config.usableHeight
  });

  const sankey = d3sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([config.width, config.height]);

  // Set the sankey diagram properties
  const path = sankey.link();

  // load the data
  const graph = data;

  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);

  // add in the links
  const link = svg
    .append("g")
    .selectAll(".link")
    .data(graph.links)
    .enter()
    .append("path")
    .on("mouseover", function(d) {
      const position = getPosition(chartNode);
      if (position) {
        d["x"] = isMobile ? 50 : position["x"];
        d["y"] = position["y"];
      } else {
        d["x"] = config.usableWidth / 2;
        d["y"] = d.source.y;
      }
      onHover(d);
    })
    .on("mouseout", function(d) {
      onHover(null);
    })
    .at({
      class: d => {
        return "link " + d.source.name.replace(/ .*/, "");
      },
      d: path
    })
    .st({
      "stroke-width": d => {
        return Math.max(1, d.dy);
      },
      stroke: d => {
        return d.color;
      }
    })
    .sort(function(a, b) {
      return b.dy - a.dy;
    });

  // add in the nodes
  const node = svg
    .append("g")
    .selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append("g")
    .at({
      class: "node",
      transform: d => {
        return "translate(" + d.x + "," + d.y + ")";
      }
    });
  // add the rectangles for the nodes
  node
    .append("rect")
    .at({
      height: d => {
        return d.dy;
      },
      width: sankey.nodeWidth()
    })
    .st({
      fill: d => {
        return d.color;
      },
      stroke: d => {
        return d.color;
      }
    })
    .on("mouseover", function(d) {
      d3.selectAll(".link").st({
        "stroke-opacity": 0.05
      });
      // if the node contains source links, highlight the source bars, otherwise, do the target bars
      if (d.sourceLinks.length > 0) {
        link
          .filter(function(s) {
            return d.name === s.source.name;
          })
          .style("stroke-opacity", 0.6);
      } else {
        link
          .filter(function(t) {
            return d.name === t.target.name;
          })
          .style("stroke-opacity", 0.6);
      }
    })
    .on("mouseout", function(d) {
      d3.selectAll(".link").st({
        "stroke-opacity": 0.2
      });
    });

  // add in the title for the nodes
  node
    .append("text")
    .at({
      x: -6,
      y: d => {
        return d.dy / 2 + 5;
      },
      dy: ".35m",
      "text-anchor": "end",
      transform: null
    })
    .text(function(d) {
      return d.name;
    })
    .filter(function(d) {
      return d.x < width / 2;
    })
    .at({
      x: 6 + sankey.nodeWidth(),
      "text-anchor": "start"
    });
};
