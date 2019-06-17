import React from "react";

import { HeadlineContainer } from "./style";

export const Headline = ({ label, headline, standfirst }) => (
  <HeadlineContainer>
    {label && <h3>{label}</h3>}
    {headline && <h1>{headline}</h1>}
    {standfirst && <h2>{standfirst}</h2>}
  </HeadlineContainer>
);

export default Headline;
