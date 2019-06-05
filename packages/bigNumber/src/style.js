import styled from "styled-components";
import { breakpoints } from "@times-visuals/styles";

const smoothingRules = `
  font-smoothing: grayscale;
  -webkit-font-smoothing: grayscale;
  -moz-osx-font-smoothing: grayscale;
`;

export const BigNumberContainer = styled.div`
  h1 {
    color: ${props => props.color || "#333"}
    width: 100%;
    line-height: 1.1em;
    font-family: "TimesModern-Bold";
    font-size: 4.8rem;
    ${smoothingRules}

    @media only screen and (min-width: ${breakpoints.mobile}) {
      font-size: 6.4rem;

      ${props => {
        switch (props.type) {
          case "big":
            return `font-size: 6.4rem;`;
        }
      }}
    }

    @media only screen and (min-width: ${breakpoints.tablet}) {
      ${props => {
        switch (props.type) {
          case "big":
            return `font-size: 11rem;`;
        }
      }}
    }

    @media only screen and (min-width: ${breakpoints.desktop}) {
      font-size: 8rem;

      ${props => {
        switch (props.type) {
          case "big":
            return `font-size: 14rem;`;
        }
      }}
    }
  }

  label {
    width: 100%;
    color: #425563;
    font-size: 1.5rem;
    line-height: 1.2em;
    font-family: "GillSansMTStd-Medium";
    ${smoothingRules}

    @media only screen and (min-width: ${breakpoints.mobile}) {
      font-size: 1.9rem;
    }
  }
`;
