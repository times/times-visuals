import styled from "styled-components";
import { breakpoints } from "@times-visuals/styles";

const smoothingRules = `
  font-smoothing: grayscale;
  -webkit-font-smoothing: grayscale;
  -moz-osx-font-smoothing: grayscale;
`;

export const HeadlineContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 0 1rem;
  padding: 2rem 0;
  @media only screen and (min-width: ${breakpoints.mobile}){
      margin: 0;
  }

  h1 {
    font-family: "TimesModern-Bold";
    font-size: 3rem;
    color: #1d1d1b;
    line-height: 3.3rem;
    margin: auto;
    ${smoothingRules}
  }

  h2 {
    font-family: "TimesDigital-Regular";
    font-size: 1.8rem;
    color: #7c7c7c;
    line-height: 2.7rem;
    ${smoothingRules};

  }

  h3 {
    text-transform: uppercase;
    font-size: 1rem;
    color: #13354e;
    letter-spacing: 0.12rem;
    line-height: 1.2rem;
    font-family: GillSansMTStd-Medium, GillSansW01-Medium;
    font-weight: 500;
    padding-bottom: 1rem;
    ${smoothingRules}
    @media only screen and (min-width: ${breakpoints.mobile}){
        font-size: 1.2rem;
    }
  }
`;
