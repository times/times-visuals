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
  state = { latestAverages: null };

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
      dataset: this.props.data,
      averages: this.props.averages,
      parties: this.props.parties,
      parseDate: d3.timeParse('%Y-%m-%d'),
      circleRadius: this.props.circleRadius ? this.props.circleRadius : 4,
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
          .domain([0, 35]);
      },
    };

    config.dataset.forEach(function(d, i, o) {
      if (d.poll != 'NA') {
        d.date = new Date(d.date);
        d.poll = +d.poll;
      } else {
        o.splice(i, 1);
      }
    });
    config.averages.forEach(function(d, i) {
      console.log(d, d.date, config.parseDate(d.date));
      d.date = config.parseDate(d.date);
    });
    config.averages.forEach(function(d, i) {
      d.date = new Date(d.date);
      d['AfD'] = +d['AfD'];
      d['Green'] = +d['Green'];
      d['CDU/CSU'] = +d['CDU/CSU'];
      d['Left'] = +d['Left'];
      d['FDP'] = +d['FDP'];
      d['SPD'] = +d['SPD'];
    });

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
      console.log(config.averages);
      // PoP line
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

    // send that back up to be picked up by index.html
    this.setState({ latestAverages: averagesArray });
  }

  componentDidMount() {
    if (this.chart && this.props.data && this.props.averages) {
      this.extractLatestAverages(this.props.averages, this.props.parties);
      this.drawChart(this.chart, this.props);
    }
  }

  componentDidUpdate() {
    //if (this.chart && this.props.data) this.drawChart(this.chart, this.props);
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
