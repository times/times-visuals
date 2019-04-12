// Libraries
import React from "react";
import { drawChart, generatePolls, generateAverages } from "./chart";

// Styles
import style from "./style.scss";

export class PollOfPolls extends React.Component {
  state = { polls: null, averages: null, latestAverages: null };

  componentDidMount() {
    const { averages, data, parties } = this.props;
    if (averages && data && parties) {
      this.setState({
        polls: generatePolls(data),
        averages: generateAverages(averages, parties)
      });
    }
  }

  // Once the above has finished it gets set to state
  // This updates the component, now we can draw our chart
  componentDidUpdate() {
    if (this.state.polls && this.state.averages)
      drawChart(this.chart, this.props, this.state);
  }

  render() {
    const { parties, dataSource } = this.props;
    return (
      <div className={style.Container}>
        <div ref={node => (this.chart = node)} />
        {parties ? (
          <div className={style.labelsContainer}>
            {parties.map((e, key) => (
              <div className={[style.label, style.text].join(" ")} key={key}>
                <div className={style.circle} style={{ background: e.color }} />
                <div
                  className={[style.number, style[e.name]].join(" ")}
                  key={key}
                >
                  {e.latest}%
                </div>
                {e.long_name ? e.long_name : e.name}
              </div>
            ))}
          </div>
        ) : null}
        {dataSource && <p className={style.source}>Source: {dataSource}</p>}
      </div>
    );
  }
}

export default PollOfPolls;
