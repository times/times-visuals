import * as selection from "d3-selection";
import * as scale from "d3-scale";
import * as hierarchy from "d3-hierarchy";
import * as jetpack from "d3-jetpack";

const d3 = {
  ...selection,
  ...scale,
  ...hierarchy,
  ...jetpack
};

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
