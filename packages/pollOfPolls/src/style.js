import styled from "styled-components";
import { breakpoints } from "@times-visuals/styles";

export const PollOfPollsContainer = styled.div`
  svg {
    overflow: visible;
    font-size: initial;
  }

  text,
  .text {
    font-family: GillSansMTStd-Medium, GillSansW01-Medium;
    fill: #696969;
    color: #696969;
    font-size: 12px;
  }

  .tick line {
    display: unset !important;
    stroke: lightgrey;
    stroke-width: 1px;
    shape-rendering: crispEdges;
    stroke-dasharray: 5;
  }

  .domain {
    display: none;
  }

  ul {
    width: 100%;
    margin: 0;
    list-style-type: none;
    margin-top: 1px;
    padding-bottom: 1.5em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding-top: 1rem;

    li {
      width: 33%;
      transform: translateX(30%);
      font-family: GillSansMTStd-Medium, GillSansW01-Medium;
      fill: #696969;
      color: #696969;
      font-size: 12px;
      padding-bottom: 1rem;

      @media only screen and (min-width: ${breakpoints.mobile}) {
        width: 16.66%;
        padding-bottom: 0;
      }
    }

    @media only screen and (max-width: ${breakpoints.mobile}) {
      padding-top: 15px;
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
      transform: translate(-20px, 3px);
    }

    label {
      font-family: TimesModern-Bold;
      -webkit-font-smoothing: auto;
      -moz-osx-font-smoothing: grayscale;
      font-size: 20px;
      font-weight: 800;
      color: #000;
      fill: #000;
      display: block;
    }
  }

  caption {
    width: 100%;
    font-size: 12px;
    color: #666;
    margin: 1rem 0;
  }
`;
