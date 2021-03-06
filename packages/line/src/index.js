// Libraries
import React from "react";
import * as selection from "d3-selection";
import * as jetpack from "d3-jetpack";
import * as scale from "d3-scale";
import * as array from "d3-array";
import * as axis from "d3-axis";
import * as shape from "d3-shape";
import * as timeFormat from "d3-time-format";
import * as time from "d3-time";
import * as transition from "d3-transition";
import * as ease from "d3-ease";
import * as format from "d3-format";
import * as interpolate from "d3-interpolate";
import * as annotation from "d3-svg-annotation";

import { LineContainer } from "./style";

const d3 = {
  ...selection,
  ...jetpack,
  ...scale,
  ...array,
  ...axis,
  ...shape,
  ...timeFormat,
  ...time,
  ...transition,
  ...ease,
  ...format,
  ...interpolate,
  ...annotation
};

export class Line extends React.Component {
  drawChart(node) {
    node.innerHTML = "";
    const { width } = node.getBoundingClientRect();
    let height = width < 450 ? 200 : 400;

    const config = {
      padding: 0,
      margin: {
        top: 50,
        right: 50,
        left: 50,
        bottom: 50
      },
      line: d3.line(),
      area: d3.area(),
      dataset: this.props.data,
      formatTime: d3.timeFormat("%b ' %y"),
      xDomain: d3.extent(this.props.data.map(e => e.date)),
      yDomain: this.props.yDomain,
      lines: this.props.lines,
      xTicks: 4,
      yTicks: 4
    };
    config.usableWidth = width - config.margin.left - config.margin.right;
    config.usableHeight = height - config.margin.top - config.margin.bottom;
    config.xScale = d3
      .scaleTime()
      .domain(config.xDomain)
      .range([0, config.usableWidth]);
    config.yScale = d3
      .scaleLinear()
      .domain(config.yDomain)
      .range([config.usableHeight, 0]);

    config.xTickAmount = config.xTicks;
    config.yTickAmount = config.yTicks;

    //define axis
    const xAxis = d3
      .axisBottom()
      .scale(config.xScale)
      .tickFormat(config.formatTime)
      .ticks(config.xTickAmount);

    const yAxis = d3
      .axisLeft()
      .scale(config.yScale)
      .ticks(config.yTickAmount);
    if (this.props.percentage) {
      yAxis.tickFormat((d, i, n) => (n[i + 1] ? d : d + "%"));
    }

    //defining svg
    const svg = d3
      .select(node)
      .append("svg")
      .at({
        width: width,
        height: height
      });

    //Defining a group element for line chart
    const g = svg.append("g");
    g.translate([config.margin.left, config.margin.top]);

    //Create axes
    g.append("g")
      .at({
        class: ["axis", "xAxis"].join(" ")
      })
      .translate([0, config.usableHeight])
      .call(xAxis);

    g.append("g")
      .at({
        class: ["axis", "yAxis"].join(" ")
      })
      .translate([0, 0])
      .call(yAxis);

    //Draw lines
    const line = config.line
      .x(d => config.xScale(d.date))
      .y(d => config.yScale(d.value))
      .curve(this.props.curve ? d3.curveBasis : d3.curveLinear);

    const lines = g
      .selectAll(".line")
      .data([config.dataset])
      .enter()
      .append("g")
      .at({
        class: "line"
      });

    lines
      .append("path")
      .at({
        d: line
      })
      .st({
        stroke: "#254251"
      });

    //Draw area/s
    if (this.props.area === true) {
      const area = config.area
        .x(d => config.xScale(d.date))
        .y1(d => config.yScale(d.value))
        .y0(() => config.yScale.range()[0])
        .curve(this.props.curve ? d3.curveBasis : d3.curveLinear);

      g.selectAll(".area")
        .data([config.dataset])
        .enter()
        .append("path")
        .at({ class: "area", d: area, fill: "#254151" });
    }

    if (this.props.annotation) {
      const importAnnotation = [
        {
          type: annotation.annotationLabel,
          note: {
            title: this.props.annotation.title,
            label: "",
            wrap: 50
          },
          x: config.xScale(this.props.annotation.x),
          y: config.yScale(this.props.annotation.y),
          dx: this.props.annotation.dx,
          dy: this.props.annotation.dy
        }
      ];

      const makeAnnotation = annotation
        .annotation()
        .type(annotation.annotationLabel)
        .annotations(importAnnotation);

      g.append("g")
        .at({ class: "annotation" })
        .call(makeAnnotation);
    }
  }

  componentDidMount() {
    if (this.chart && this.props.data) this.drawChart(this.chart, this.props);
  }

  componentDidUpdate() {
    if (this.chart && this.props.data) this.drawChart(this.chart, this.props);
  }

  render() {
    return (
      <LineContainer>
        <div ref={node => (this.chart = node)} />
      </LineContainer>
    );
  }
}

export default Line;
