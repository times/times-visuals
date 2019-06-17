import React from "react";

import { HeadlineContainer } from "./style";

export class Headline extends React.Component {
  render() {
    const { children, label, standfirst } = this.props;
    return (
      <HeadlineContainer>
        {label && <h3>{label}</h3>}
        {children && <h1>{children}</h1>}
        {standfirst && <h2>{standfirst}</h2>}
      </HeadlineContainer>
    );
  }
}

export default Headline;
