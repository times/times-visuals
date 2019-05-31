import React from "react";
import CountUp from "react-countup";

import { BigNumberContainer } from "./style";

export const BigNumber = ({
  number,
  label,
  color,
  type,
  suffix,
  prefix,
  defaultStart = 0
}) => (
  <BigNumberContainer type={type} color={color}>
    <h1>
      {number === 0 ? (
        number
      ) : (
        <CountUp
          start={defaultStart}
          end={number}
          suffix={suffix}
          prefix={prefix}
          useEasing={true}
          separator=","
        />
      )}
    </h1>

    <label>{label}</label>
  </BigNumberContainer>
);

export default BigNumber;
