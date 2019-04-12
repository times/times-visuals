import * as selection from "d3-selection";
import * as jetpack from "d3-jetpack";
import * as scale from "d3-scale";
import * as timeFormat from "d3-time-format";
import * as array from "d3-array";
import * as shape from "d3-shape";
import * as axis from "d3-axis";

const d3 = {
  ...selection,
  ...jetpack,
  ...scale,
  ...timeFormat,
  ...array,
  ...shape,
  ...axis
};

export const drawChart = (node, props, state) => {
  // check if start and end date properties are set and if so, filter the polling data and averages
  const startDate = props.startDate ? new Date(props.startDate) : null;

  const endDate = props.endDate ? new Date(props.endDate) : null;

  const dataset = startDate
    ? endDate
      ? state.polls
          .filter(poll => poll.date > startDate)
          .filter(poll => poll.date < endDate)
      : state.polls.filter(poll => poll.date >= startDate)
    : endDate
    ? state.polls.filter(poll => poll.date <= endDate)
    : state.polls;

  const averages = startDate
    ? endDate
      ? state.averages
          .filter(average => average.date >= startDate)
          .filter(average => average.date <= endDate)
      : state.averages.filter(average => average.date >= startDate)
    : endDate
    ? state.averages.filter(average => average.date <= endDate)
    : state.averages;

  node.innerHTML = "";
  const { width } = node.getBoundingClientRect();
  const config = {
    padding: 0,
    height: 450,
    opacity: 0.2,
    ticksno: 5,
    extent: [0, 35],
    margin: {
      top: 50,
      right: 50,
      left: 50,
      bottom: 50
    },
    dataset: dataset,
    averages: averages,
    parties: props.parties,
    circleRadius: props.circleRadius ? props.circleRadius : 4,
    yDomainFromProps: props.yDomain ? props.yDomain : null,
    startDate: startDate,
    endDate: endDate,
    get yExtent() {
      return d3.extent(config.dataset.map(e => e.poll));
    },
    get usableWidth() {
      return width - config.margin.left - config.margin.right;
    },
    get usableHeight() {
      return config.height - config.margin.top - config.margin.bottom;
    },
    get xScale() {
      return d3
        .scaleTime()
        .range([0, config.usableWidth])
        .domain([
          config.startDate ? config.startDate : new Date("2018-03-01"),
          config.endDate ? config.endDate : new Date("2018-10-31")
        ]);
    },
    get yScale() {
      return d3
        .scaleLinear()
        .range([config.usableHeight, 0])
        .domain(
          config.yDomainFromProps ? config.yDomainFromProps : config.yExtent
        );
    }
  };

  const svg = d3
    .select(node)
    .append("svg")
    .at({
      width: width,
      height: config.height
    });

  //Defining a group element for line chart
  const g = svg.append("g").at({
    transform: `translate(${config.margin.left},${config.margin.top})`
  });

  // X-axis
  // renders full year on January,
  // short month names otherwise
  g.append("g")
    .at({
      class: "axis axis--x"
    })
    .translate([0, config.usableHeight])
    .call(
      d3
        .axisBottom(config.xScale)
        .ticks(config.ticksno)
        .tickSizeOuter(0)
        .tickFormat(function(dataset) {
          if (d3.timeFormat("%-b")(dataset) === "Jan") {
            return d3.timeFormat("%Y")(dataset);
          } else {
            return d3.timeFormat("%-b")(dataset);
          }
        })
    );

  // Y-axis
  // with more or less padding and ticks depending on viewport
  g.append("g")
    .at({
      class: "axis axis--y"
    })
    .call(
      d3
        .axisLeft(config.yScale)
        .ticks(config.ticksno)
        .tickSizeInner(-width)
        .tickSizeOuter(0)
        .tickFormat((d, i, n) => (n[i + 1] ? d : d + "%"))
    );

  g.selectAll("circle")
    .data(config.dataset)
    .enter()
    .append("circle")
    .at({
      cx: d => config.xScale(d.date),
      cy: d => config.yScale(d.poll),
      r: config.circleRadius
    })
    .st({
      opacity: 0.2,
      fill: d =>
        config.parties.filter(party => party.name.toLowerCase() === d.party)[0]
          ? config.parties.filter(
              party => party.name.toLowerCase() === d.party
            )[0].color
          : ""
    });

  // One set of dots for each party
  // One line for each party
  config.parties.forEach(party => {
    const popline = d3
      .line()
      .x(d => config.xScale(d.date))
      .y(d => config.yScale(d[party.name]))
      .curve(d3.curveCardinal);

    g.append("path")
      .datum(config.averages)
      .at({
        fill: "none",
        stroke: "#fff",
        strokeWidth: 3,
        d: popline
      });
    g.append("path")
      .datum(config.averages)
      .at({
        fill: "none",
        stroke: party.color,
        strokeWidth: 1.5,
        d: popline
      });
  });
};

// Quick parsing of the data we pass in
// ie numbers as integers, dates as dates, etc.
// Will trigger a re-render
export const generatePolls = polls => {
  polls.forEach((d, i, o) => {
    if (d.poll != "NA") {
      d.date = new Date(d.date);
      d.poll = +d.poll;
    } else {
      o.splice(i, 1);
    }
  });
  return polls;
};

export const generateAverages = (averages, parties) => {
  averages.forEach((d, i) => {
    d.date = new Date(d.date);
    parties.forEach(party => {
      d[party.name] = +d[party.name];
    });
  });
  return averages;
};
