import * as selection from "d3-selection";
import * as pack from "d3-jetpack";

const d3 = { ...selection, ...pack };

const computeNodeSize = node => node.getBoundingClientRect();

export const drawChart = (node, data, makeParliament) => {
  const { width } = computeNodeSize(node);
  const height = width < 450 ? 150 : 300;
  const innerRadiusCoef = 0.2;
  const { seats, rowWidth } = makeParliament(
    data,
    width,
    height,
    innerRadiusCoef
  );
  const seatRadius = d => {
    let r = 0.4 * rowWidth;
    if (d.data && typeof d.data.size === "number") {
      r *= d.data.size;
    }
    return r;
  };
  const svg = d3
    .select(node)
    .append("svg")
    .at({
      width: width,
      height: height
    })
    .st({
      backgroundColor: "#f9f9f9"
    });

  svg
    .append("g")
    .translate([width / 2, Math.min(width / 2, height)])
    .selectAll(".seat")
    .data(seats)
    .enter()
    .append("circle")
    .at({
      class: d => `seat ${d.party.id}`,
      cx: d => d.cartesian.x,
      cy: d => d.cartesian.y,
      fill: d => {
        return d.party.color;
      },
      r: seatRadius
    });
};
