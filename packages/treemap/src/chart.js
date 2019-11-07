import * as selection from "d3-selection";
import * as scale from "d3-scale";
import * as hierarchy from "d3-hierarchy";
import * as jetpack from "d3-jetpack";
import * as ease from "d3-ease";

const d3 = {
  ...selection,
  ...scale,
  ...hierarchy,
  ...jetpack,
  ...ease
};

let transitioning;

// function for wrapping text inside the treemap "routes"
const wrap = text => {
  text.each(function() {
    let text = d3.select(this),
      words = text.text().split(/\s+/),
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.at("y"),
      dy = parseFloat(text.at("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .at({
          x: 8,
          y: y,
          dy: dy + "em"
        });
    const d = text.data()[0];
    const width = d.x1 - d.x0 - 16;
    words.forEach(word => {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .at({
            x: 8,
            y: y,
            dy: ++lineNumber * lineHeight + dy + "em"
          })
          .text(word);
      }
    });
  });
};

export const drawChart = (chartNode, data, onHover) => {
  if (!chartNode) return;
  if (!data) return;

  const { width } = chartNode.getBoundingClientRect();

  const config = {
    width: width,
    height: 600,
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    },
    get usableWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    get usableHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    }
  };

  const svg = d3.select(chartNode).at({
    width: config.width,
    height: config.height
  });

  const g = svg.append("g").at({
    transform: `translate(${config.margin.left},${config.margin.top})`,
    width: config.usableWidth,
    height: config.usableHeight
  });

  const sumBySize = data => data.value;

  const treemap = d3
    .treemap()
    .tile(d3.treemapResquarify)
    .size([config.width, config.height])
    .round(true)
    .paddingOuter(2)
    .paddingInner(1);

  const root = d3
    .hierarchy(data)
    .eachBefore(d => (d.parent ? d.parent.data.id + "." : "") + d.data.category)
    .sum(sumBySize)
    .sort((a, b) => b.height - a.height || b.value - a.value);

  treemap(root);

  // squares themselves
  const container = svg.append("g").at({ class: "container" });

  const cell = container
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .translate(d => [d.x0, d.y0]);

  cell
    .append("rect")
    .at({
      id: d => d.data.id,
      // if the square is a certain size give it a class of 'wide' - which is used later deciding which cells to show text on
      class: d => (d.x1 - d.x0 > 70 && d.y1 - d.y0 > 75 ? "rect wide" : "rect"),
      width: d => d.x1 - d.x0,
      height: d => d.y1 - d.y0,
      fill: d => d.parent.data.color
    })
    .on("mouseover", function(d) {
      if (onHover) {
        onHover(d);
        d3.selectAll(".rect").st({
          opacity: 0.5
        });
        d3.select(this).st({ opacity: 1 });
      }
    })
    .on("mouseout", () => {
      if (onHover) {
        d3.selectAll(".rect").st({
          opacity: 1
        });
      }
    });

  // labels
  cell
    .append("text")
    .attr("clip-path", d => "url(#clip-" + d.data.id + ")")
    .append("tspan")
    .at({
      x: 8,
      y: 8,
      dy: ".8em",
      class: "category"
    })
    .st({
      fill: d => {
        return d.parent.data.fontColor ? d.parent.data.fontColor : "#000000";
      }
    })
    .text(function(d) {
      // Only display text if sibling <rect> element is wide enough
      const parentRect = this.parentNode.previousElementSibling;
      if (d3.select(parentRect).classed("wide")) {
        return d.data.category;
      }
    })
    .call(wrap);
};

export const drawLayeredChart = (
  chartNode,
  background,
  color,
  onHover,
  data
) => {
  const { width } = chartNode.getBoundingClientRect();

  const isMobile = width < 500 ? true : false;

  const config = {
    width: width,
    height: 600,
    margin: {
      top: 30,
      right: 10,
      bottom: 20,
      left: 10
    },
    get usableWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    get usableHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    }
  };

  let svg = d3
    .select(chartNode)
    .at({
      width: config.width,
      height: config.height
    })
    .append("g")
    .at({
      transform: `translate(${config.margin.left},${config.margin.top})`,
      width: config.usableWidth,
      height: config.usableHeight
    })
    .st({
      "shape-rendering": "crispEdges"
    });

  let x = d3
    .scaleLinear()
    .domain([0, config.usableWidth])
    .range([0, config.usableWidth]);

  let y = d3
    .scaleLinear()
    .domain([0, config.usableHeight])
    .range([0, config.usableHeight]);

  const treemap = d3
    .treemap()
    .size([config.usableWidth, config.usableHeight])
    .paddingInner(0)
    .round(false);

  const grandparent = svg.append("g").at({
    class: "grandparent"
  });

  grandparent.append("rect").at({
    fill: background,
    y: -config.margin.top,
    width: config.usableWidth,
    height: config.margin.top
  });

  grandparent
    .append("text")
    .at({
      x: 6,
      y: 6 - config.margin.top,
      dy: ".75em"
    })
    .st({
      fill: color
    });

  const root = d3.hierarchy(data);

  treemap(
    root
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value)
  );
  display(root);

  function display(d) {
    grandparent
      .datum(d.parent)
      .on("click", transition)
      .select("text")
      .text(name(d));

    grandparent
      .datum(d.parent)
      .select("rect")
      .at({
        fill: background
      });

    const g1 = svg
      .insert("g", ".grandparent")
      .datum(d)
      .at({ class: "depth" });

    const g = g1
      .selectAll("g")
      .data(d.children)
      .enter()
      .append("g")
      .at({ class: "grandchild" });

    g.filter(d => d.children)
      .classed("children", true)
      .on("click", transition);

    g.selectAll(".child")
      .data(d => d.children || [d])
      .enter()
      .append("rect")
      .at({ class: "child" })
      .call(rect);

    g.append("rect")
      .at({ class: "parent" })
      .call(rect)
      .append("title");

    g.append("foreignObject")
      .call(rect)
      .at({
        // add a css class of small
        class: d =>
          d.x1 - d.x0 > 45 && d.y1 - d.y0 > 45
            ? "foreignobj"
            : "foreignobj small"
      })
      .append("xhtml:div")
      .at({
        dy: ".75em"
      })
      .html(
        d => "" + '<p class="title"> ' + d.data.name + " " + d.value + "</p>"
      )
      .at({ class: "textdiv" })
      .st({ color: color });

    function transition(d) {
      if (transitioning || !d) return;
      transitioning = true;
      const g2 = display(d);
      const t1 = g1.transition().duration(1);
      const t2 = g2
        .transition()
        .ease(d3.easeCubic)
        .delay(250)
        .duration(750);

      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);

      svg.style("shape-rendering", null);
      svg.selectAll(".depth").sort((a, b) => a.depth - b.depth);

      g2.selectAll("text").st({
        "fill-opacity": 0
      });

      g2.selectAll("foreignObject div").st({
        display: "none"
      });

      t1.selectAll("text")
        .call(text)
        .st({ "fill-opacity": 0 });

      t2.selectAll("text")
        .call(text)
        .st({ "fill-opacity": 1 });

      t1.selectAll("rect").call(rect);
      t2.selectAll("rect").call(rect);

      t1.selectAll(".textdiv").st({ display: "none" });
      t1.selectAll(".foreignobj").call(foreign);
      t2.selectAll(".textdiv").st({ display: "block" });
      t2.selectAll(".foreignobj").call(foreign);
      t1.on("end.remove", function() {
        this.remove();
        transitioning = false;
      });
    }
    return g;
  }
  function text(text) {
    text.at({
      x: d => x(d.x) + 6,
      y: d => y(d.y0)
    });
  }

  function rect(rect) {
    rect.at({
      x: d => x(d.x0),
      y: d => y(d.y0),
      width: d => x(d.x1) - x(d.x0),
      height: d => y(d.y1) - y(d.y0),
      fill: background
    });

    if (typeof rect._id === "undefined" && !isMobile) {
      rect.on("mouseover", d => {
        d["category"] = category;
        onHover(d);
      });
      rect.on("mouseout", () => onHover(null));
    }
  }
  function foreign(foreign) {
    foreign.at({
      x: d => x(d.x0),
      y: d => y(d.y0),
      width: d => x(d.x1) - x(d.x0),
      height: d => y(d.y1) - y(d.y0)
    });
  }
  function name(d) {
    return (
      breadcrumbs(d) +
      (d.parent ? " - Click to zoom out" : " - Click inside square to zoom in")
    );
  }
  function breadcrumbs(d) {
    var res = "";
    var sep = " > ";
    d.ancestors()
      .reverse()
      .forEach(i => (res += i.data.name + sep));
    return res
      .split(sep)
      .filter(i => i !== "")
      .join(sep);
  }
};
