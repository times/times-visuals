// Libraries
import React from "react";
import { drawChart } from "./chart";
import { makeParliament } from "./parliament";

// Styles
import style from "./style.scss";

export class Hemicycle extends React.Component {
  componentDidMount() {
    const { data } = this.props;
    drawChart(this.chart, data, makeParliament);
  }

  render() {
    const { data, legend } = this.props;
    return (
      <div className={style.Container}>
        <div ref={node => (this.chart = node)} />
        {legend && (
          <div className={style.labelsContainer}>
            {data.map((e, key) => (
              <div className={[style.label, style.text].join(" ")} key={key}>
                <div className={style.circle} style={{ background: e.color }} />
                <div
                  className={[style.number, style[e.name]].join(" ")}
                  key={key}
                >
                  {e.seats}
                </div>
                {e.longName || e.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Hemicycle;
