import React from "react";

import { drawChart } from "./chart";
import { makeParliament } from "./parliament";

import { HemicycleContainer, LegendContainer } from "./style";

export class Hemicycle extends React.Component {
  componentDidMount() {
    const { data } = this.props;
    drawChart(this.chart, data, makeParliament);
  }

  render() {
    const { data, showLegend } = this.props;

    return (
      <HemicycleContainer>
        <div ref={node => (this.chart = node)} />

        {showLegend && (
          <LegendContainer>
            {data.map((e, key) => (
              <li key={key}>
                <i style={{ "background-color": e.color }} />

                <h1>{e.seats}</h1>

                {e.longName || e.name}
              </li>
            ))}
          </LegendContainer>
        )}
      </HemicycleContainer>
    );
  }
}

export default Hemicycle;
