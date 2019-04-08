// Libraries
import React from "react";

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

// Styles
import style from "./style.scss";

export class PollOfPolls extends React.Component {
  state = { polls: null, averages: null, latestAverages: null };

  drawChart(node) {
    // check if start and end date properties are set and if so, filter the polling data and averages
    const startDate = this.props.startDate
      ? new Date(this.props.startDate)
      : null;

    const endDate = this.props.endDate ? new Date(this.props.endDate) : null;

    const dataset = startDate
      ? endDate
        ? this.state.polls
            .filter(poll => poll.date > startDate)
            .filter(poll => poll.date < endDate)
        : this.state.polls.filter(poll => poll.date >= startDate)
      : endDate
      ? this.state.polls.filter(poll => poll.date <= endDate)
      : this.state.polls;

    const averages = startDate
      ? endDate
        ? this.state.averages
            .filter(average => average.date >= startDate)
            .filter(average => average.date <= endDate)
        : this.state.averages.filter(average => average.date >= startDate)
      : endDate
      ? this.state.averages.filter(average => average.date <= endDate)
      : this.state.averages;

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
      parties: this.props.parties,
      circleRadius: this.props.circleRadius ? this.props.circleRadius : 4,
      yDomainFromProps: this.props.yDomain ? this.props.yDomain : null,
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
          config.parties.filter(
            party => party.name.toLowerCase() === d.party
          )[0]
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
  }

  // Quick parsing of the data we pass in
  // ie numbers as integers, dates as dates, etc.
  // Will trigger a re-render
  makePollsAndAverages(polls, averages, parties) {
    const parseDate = d3.timeParse("%Y-%m-%d");
    polls.forEach((d, i, o) => {
      if (d.poll != "NA") {
        d.date = new Date(d.date);
        d.poll = +d.poll;
      } else {
        o.splice(i, 1);
      }
    });
    averages.forEach((d, i) => {
      d.date = new Date(d.date);
      parties.forEach(party => {
        d[party.name] = +d[party.name];
      });
    });

    this.setState({ polls, averages });
  }

  componentDidMount() {
    if (this.chart && this.props.data && this.props.averages) {
      this.makePollsAndAverages(
        this.props.data,
        this.props.averages,
        this.props.parties
      );
    }
  }

  // Once the above has finished it gets set to state
  // This updates the component, now we can draw our chart
  componentDidUpdate() {
    if (this.state.polls && this.state.averages)
      this.drawChart(this.chart, this.props, this.state);
  }

  render() {
    const { parties, dataSource } = this.props;
    return (
      <div className={style.Container}>
        <div ref={node => (this.chart = node)} />
        {parties ? (
          <div className={style.labelsContainer}>
            {parties.map((e, key) => (
              <div className={[style.label, style.text].join(" ")} key={key}>
                <div className={style.circle} style={{ background: e.color }} />
                <div
                  className={[style.number, style[e.name]].join(" ")}
                  key={key}
                >
                  {e.latest}%
                </div>
                {e.long_name ? e.long_name : e.name}
              </div>
            ))}
          </div>
        ) : null}
        <p className={style.source}>
          Source: {dataSource ? dataSource : "PollOfPolls.eu"}
        </p>
      </div>
    );
  }
}

export default PollOfPolls;
