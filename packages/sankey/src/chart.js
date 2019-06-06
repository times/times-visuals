/* global window */
import * as selection from "d3-selection";
import * as scale from "d3-scale";
import * as array from "d3-array";
import * as axis from "d3-axis";
import * as jetpack from "d3-jetpack";
import * as shape from "d3-shape";
import * as collection from "d3-collection";
import * as interpolate from "d3-interpolate";

const d3 = {
  ...selection,
  ...scale,
  ...array,
  ...axis,
  ...jetpack,
  ...shape,
  ...collection,
  ...interpolate
};

// stolen from https://bl.ocks.org/d3noob/013054e8d7807dff76247b81b0e29030
export const d3sankey = function() {
  var sankey = {},
    nodeWidth = 24,
    nodePadding = 8,
    size = [1, 1],
    nodes = [],
    links = [];

  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  };

  sankey.layout = function(iterations) {
    computeNodeLinks();
    computeNodeValues();
    computeNodeBreadths();
    computeNodeDepths(iterations);
    computeLinkDepths();
    return sankey;
  };

  sankey.relayout = function() {
    computeLinkDepths();
    return sankey;
  };

  sankey.link = function() {
    var curvature = 0.5;

    function link(d) {
      var x0 = d.source.x + d.source.dx,
        x1 = d.target.x,
        xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = d.source.y + d.sy + d.dy / 2,
        y1 = d.target.y + d.ty + d.dy / 2;
      return (
        "M" +
        x0 +
        "," +
        y0 +
        "C" +
        x2 +
        "," +
        y0 +
        " " +
        x3 +
        "," +
        y1 +
        " " +
        x1 +
        "," +
        y1
      );
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    nodes.forEach(function(node) {
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(function(link) {
      var source = link.source,
        target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    var remainingNodes = nodes,
      nextNodes,
      x = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function(node) {
        node.x = x;
        node.dx = nodeWidth;
        node.sourceLinks.forEach(function(link) {
          if (nextNodes.indexOf(link.target) < 0) {
            nextNodes.push(link.target);
          }
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    //
    moveSinksRight(x);
    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x =
          d3.min(node.sourceLinks, function(d) {
            return d.target.x;
          }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function(node) {
      node.x *= kx;
    });
  }

  function computeNodeDepths(iterations) {
    var nodesByBreadth = d3
      .nest()
      .key(function(d) {
        return d.x;
      })
      .sortKeys(d3.ascending)
      .entries(nodes)
      .map(function(d) {
        return d.values;
      });

    //
    initializeNodeDepth();
    resolveCollisions();
    for (var alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft((alpha *= 0.99));
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth() {
      var ky = d3.min(nodesByBreadth, function(nodes) {
        return (
          (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value)
        );
      });

      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y = i;
          node.dy = node.value * ky;
        });
      });

      links.forEach(function(link) {
        link.dy = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function(nodes, breadth) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            var y =
              d3.sum(node.targetLinks, weightedSource) /
              d3.sum(node.targetLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedSource(link) {
        return center(link.source) * link.value;
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth
        .slice()
        .reverse()
        .forEach(function(nodes) {
          nodes.forEach(function(node) {
            if (node.sourceLinks.length) {
              var y =
                d3.sum(node.sourceLinks, weightedTarget) /
                d3.sum(node.sourceLinks, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });

      function weightedTarget(link) {
        return center(link.target) * link.value;
      }
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function(nodes) {
        var node,
          dy,
          y0 = 0,
          n = nodes.length,
          i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) node.y += dy;
          y0 = node.y + node.dy + nodePadding;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1];
        if (dy > 0) {
          y0 = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }

    function ascendingDepth(a, b) {
      return a.y - b.y;
    }
  }

  function computeLinkDepths() {
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    nodes.forEach(function(node) {
      var sy = 0,
        ty = 0;
      node.sourceLinks.forEach(function(link) {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(function(link) {
        link.ty = ty;
        ty += link.dy;
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  }

  function center(node) {
    return node.y + node.dy / 2;
  }

  function value(link) {
    return link.value;
  }

  return sankey;
};

export const getPosition = node => {
  const event = window.event;
  var x, y;
  if (!event) {
    return null;
  } else {
    var rect = node.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  }
  return {
    x,
    y
  };
};

let position_node;
export const drawChart = (chart_node, data, onHover) => {
  if (!chart_node) return;
  if (!data) return;
  position_node = chart_node;
  // set the dimensions and config.margin of the graph
  const { width } = chart_node.getBoundingClientRect();
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
  const svg = d3
    .select(chart_node)
    .append("svg")
    .at({
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

  const color = d3
    .scaleOrdinal()
    .domain([
      "Conservative",
      "Conservatives",
      "Labour",
      "Liberal Democrat",
      "Liberal Democrats",
      "Independent",
      "No overall control",
      "Not yet declared",
      "Scottish National Party",
      "Plaid Cymru",
      "Green",
      "UKIP",
      "Brexit Party",
      "Change UK",
      "Other",
      "Lib Dem",
      "Other parties",
      "Did not vote",
      `Can't recall/refuse to say`
    ])
    .range([
      "#4093B2",
      "#4093B2",
      "#EC5156",
      "#EAAA00",
      "#EAAA00",
      "#000000",
      "#254251",
      "#f0e5d7",
      "#F6D700",
      "#90CD7C",
      "#61A961",
      "#9767AE",
      "#63b6b8",
      "#000000",
      "#dacfc1",
      "#EAAA00",
      "#dbcec0",
      "#cab79d",
      "#eee7e0"
    ]);

  // Set the sankey diagram properties
  var path = sankey.link();

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
      // console.log(getPosition(chart_node, event));
      const position = getPosition(chart_node);
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
        return (d.color = color(d.source.name));
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
        return (d.color = color(d.name));
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
