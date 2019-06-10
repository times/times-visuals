import React from "react";
import { drawChart } from "./chart";

import { TreemapContainer } from "./style";

export class Treemap extends React.Component {
  componentDidMount() {
    const { data, onHover } = this.props;
    drawChart(this.chart, data, onHover);
  }

  render() {
    return (
      <TreemapContainer>
        <svg ref={node => (this.chart = node)} />
      </TreemapContainer>
    );
  }
}

export default Treemap;
