// Libraries
import React from 'react';

import * as selection from 'd3-selection';
import * as jetpack from 'd3-jetpack';
import * as scale from 'd3-scale';
import * as timeFormat from 'd3-time-format';
import * as array from 'd3-array';
import * as shape from 'd3-shape';
import * as axis from 'd3-axis';

const d3 = {
  ...selection,
  ...jetpack,
  ...scale,
  ...timeFormat,
  ...array,
  ...shape,
  ...axis,
};

// Styles
import style from './style.scss';

export class PollOfPolls extends React.Component {
  state = { polls: null, averages: null, latestAverages: null };

  drawChart(node) {
    node.innerHTML = '';
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
        bottom: 50,
      },
      dataset: this.state.polls,
      averages: this.state.averages,
      parties: this.props.parties,
      circleRadius: this.props.circleRadius ? this.props.circleRadius : 4,
      yDomainFromProps: this.props.yDomain ? this.props.yDomain : null,
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
          .domain([new Date('2018-03-01'), new Date('2018-11-01')]);
      },
      get yScale() {
        return d3
          .scaleLinear()
          .range([config.usableHeight, 0])
          .domain(
            config.yDomainFromProps ? config.yDomainFromProps : config.yExtent
          );
      },
    };

    const svg = d3
      .select(node)
      .append('svg')
      .at({
        width: width,
        height: config.height,
      });

    //Defining a group element for line chart
    const g = svg.append('g');
    g.translate([config.margin.left, config.margin.top]);

    // X-axis
    // renders full year on January,
    // short month names otherwise
    g
      .append('g')
      .attr('class', 'axis axis--x')
      .translate([0, config.usableHeight])
      .call(
        d3
          .axisBottom(config.xScale)
          .ticks(config.ticksno)
          .tickFormat(function(dataset) {
            if (d3.timeFormat('%-b')(dataset) === 'Jan') {
              return d3.timeFormat('%Y')(dataset);
            } else {
              return d3.timeFormat('%-b')(dataset);
            }
          })
      );

    // Y-axis
    // with more or less padding and ticks depending on viewport
    g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(
        d3
          .axisLeft(config.yScale)
          .ticks(config.ticksno)
          .tickSize(-width)
          .tickPadding(20)
          .tickFormat((d, i, n) => (n[i + 1] ? d : d + '%'))
      );

    g
      .selectAll('circle')
      .data(config.dataset)
      .enter()
      .append('circle')
      .at({
        cx: d => config.xScale(d.date),
        cy: d => config.yScale(d.poll),
        r: config.circleRadius,
        class: d => style[d.party],
      })
      .st({
        opacity: 0.2,
      });

    // One set of dots for each party
    // One line for each party
    for (var i = 0; i < config.parties.length; i++) {
      const popline = d3
        .line()
        .x(d => config.xScale(d.date))
        .y(d => config.yScale(d[config.parties[i].name]))
        .curve(d3.curveCardinal);

      g
        .append('path')
        .datum(config.averages)
        .at({
          fill: 'none',
          stroke: '#fff',
          strokeWidth: 3,
          d: popline,
        });
      g
        .append('path')
        .datum(config.averages)
        .at({
          fill: 'none',
          stroke: config.parties[i].color,
          strokeWidth: 1.5,
          d: popline,
        });
    }
  }

  extractLatestAverages(averages, parties) {
    const lastAverages = averages[averages.length - 1];
    let averagesArray = [];
    for (var k in lastAverages) {
      if (lastAverages.hasOwnProperty(k)) {
        let temp = {};

        // Extract party colour through lookup
        const fill = parties.find(value => {
          for (var i in Object.keys(lastAverages)) {
            if (Object.keys(lastAverages)[i] === value.name) {
              return value.color.toString();
            }
          }
        });

        // Build temporary array of results
        // then push it Scotty
        temp['party'] = k;
        temp['partyshort'] = k.replace('/', '');
        temp['poll'] = Math.round(parseFloat(lastAverages[k]));
        temp['color'] = fill.color;
        averagesArray.push(temp);
      }
    }
    averagesArray.shift();
    averagesArray = averagesArray.sort(function(a, b) {
      return parseFloat(b.poll) - parseFloat(a.poll);
    });

    this.setState({ latestAverages: averagesArray });
  }

  // 2. Quick parsing of the data we pass in
  // ie numbers as integers, dates as dates, etc.
  // Will trigger a re-render
  makePollsAndAverages(polls, averages) {
    const parseDate = d3.timeParse('%Y-%m-%d');
    polls.forEach(function(d, i, o) {
      if (d.poll != 'NA') {
        d.date = new Date(d.date);
        d.poll = +d.poll;
      } else {
        o.splice(i, 1);
      }
    });
    averages.forEach(function(d, i) {
      d.date = new Date(d.date);
      d['AfD'] = +d['AfD'];
      d['Green'] = +d['Green'];
      d['CDU/CSU'] = +d['CDU/CSU'];
      d['Left'] = +d['Left'];
      d['FDP'] = +d['FDP'];
      d['SPD'] = +d['SPD'];
    });

    this.setState({ polls, averages });
  }

  // 1. Pick out most recent average polling
  // Sort descending
  // We use this to build the key at the bottom
  // 2. Quick parsing of the data we pass in
  // ie numbers as integers, dates as dates, etc.
  componentDidMount() {
    if (this.chart && this.props.data && this.props.averages) {
      this.makePollsAndAverages(this.props.data, this.props.averages);
      this.extractLatestAverages(this.props.averages, this.props.parties);
    }
  }

  // Once the above has finished it gets set to state
  // This updates the component, now we can draw our chart
  componentDidUpdate() {
    if (this.state.polls && this.state.averages)
      this.drawChart(this.chart, this.props, this.state);
  }

  render() {
    const { latestAverages } = this.state;
    return (
      <div className={style.Container}>
        <div ref={node => (this.chart = node)} />
        {latestAverages ? (
          <div className={style.labelsContainer}>
            {latestAverages.map((e, key) => (
              <div className={[style.label, style.text].join(' ')} key={key}>
                <div
                  className={[style.number, style[e.partyshort]].join(' ')}
                  key={key}
                >
                  {e.poll}
                </div>
                {e.party}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default PollOfPolls;
