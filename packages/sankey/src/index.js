import React from "react";

import { drawChart } from "./chart";

import { SankeyContainer } from "./style";

export class Sankey extends React.Component {
  componentDidMount() {
    const { data, onHover } = this.props;
    drawChart(this.chart, data, onHover);
  }

  render() {
    return (
      <SankeyContainer>
        <div ref={node => (this.chart = node)} />
      </SankeyContainer>
    );
  }
}

export default Sankey;
