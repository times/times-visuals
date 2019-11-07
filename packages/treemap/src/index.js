import React from "react";
import { drawChart, drawLayeredChart } from "./chart";

import { TreemapContainer } from "./style";

export class Treemap extends React.Component {
  componentDidMount() {
    const { data, onHover, layers } = this.props;
    layers
      ? drawLayeredChart(this.chart, "#254251", "#fff", onHover, data)
      : drawChart(this.chart, data, onHover);
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
