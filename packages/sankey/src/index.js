import React from "react";
import { d3sankey } from "./sankey";
import { drawChart } from "./chart";

import { SankeyContainer } from "./style";

export class Sankey extends React.Component {
  componentDidMount() {
    const { data, onHover } = this.props;
    drawChart(this.chart, data, d3sankey, onHover);
  }

  render() {
    return (
      <SankeyContainer>
        <svg ref={node => (this.chart = node)} />
      </SankeyContainer>
    );
  }
}

export default Sankey;
