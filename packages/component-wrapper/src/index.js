import React from "react";

import { WrapperContainer } from "./style";

export class Wrapper extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <WrapperContainer>{children && <h1>{children}</h1>}</WrapperContainer>
    );
  }
}

export default Wrapper;
