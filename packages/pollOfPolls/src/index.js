// Libraries
import React from "react";

import { PollOfPollsContainer } from "./style";
import { drawChart, generatePolls, generateAverages } from "./chart";

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
      <PollOfPollsContainer>
        <div ref={node => (this.chart = node)} />

        {parties && (
          <ul>
            {parties.map((e, key) => (
              <li key={key}>
                <i style={{ "background-color": e.color }} />

                <label key={key}>{e.latest}%</label>
                {e.long_name ? e.long_name : e.name}
              </li>
            ))}
          </ul>
        )}

        {dataSource && <caption>Source: {dataSource}</caption>}
      </PollOfPollsContainer>
    );
  }
}

export default PollOfPolls;
