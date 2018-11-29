import React from "react";
import { drawChart } from "./chart";

import style from "./style.scss";

class Barcode extends React.Component {
  clearChart = node => {
    if (node) node.innerHTML = "";
  };

  drawChart = () => {
    const { data, valueField, config } = this.props;

    this.clearChart(this.node);

    drawChart(this.node, data, valueField, config);
  };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.drawChart();
    }
  }

  render() {
    return (
      <div className={style.Barcode}>
        <svg ref={node => (this.node = node)} />
      </div>
    );
  }
}

export default Barcode;
