import styled from "styled-components";
import { breakpoints } from "@times-visuals/styles";

export const HemicycleContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem 0 2rem 0;

  svg {
    background-color: unset !important;
  }
`;

export const LegendContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  width: 100%;
  padding: 1rem 0 1rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;

  @media only screen and (max-width: ${breakpoints.mobile}) {
    padding-top: 15px;
  }

  li {
    width: 33%;

    @media only screen and (max-width: ${breakpoints.mobile}) {
      padding-bottom: 1rem;
    }

    i {
      position: absolute;
      display: inline-block;
      content: "";
      width: 10px;
      height: 10px;
      margin: 0 0.4rem;
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      border-radius: 10px;
      transform: translate(-40px, 3px);
    }

    h1 {
      margin: 0;
      line-height: 1em;
      font-family: "TimesModern-Bold", serif;
      -webkit-font-smoothing: auto;
      -moz-osx-font-smoothing: grayscale;
      font-size: 20px;
      font-weight: normal;
      color: #000;
    }
  }
`;
