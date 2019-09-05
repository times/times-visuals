import React from "react";

import { WrapperContainer } from "./style";

export class Wrapper extends React.Component {
  render() {
    const { children } = this.props;
    return <WrapperContainer>{children && children}</WrapperContainer>;
  }
}

export default Wrapper;
