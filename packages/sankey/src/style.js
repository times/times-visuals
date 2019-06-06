import styled from "styled-components";
import { breakpoints } from "@times-visuals/styles";

export const SankeyContainer = styled.div`
  width: 100%;
  padding: 1rem 0 2rem 0;
  position: relative;

  svg {
    width: 100%;
    height: 600px;
    @media only screen and (max-width: ${breakpoints.mobile}) {
      height: 500px;
    }

    .node rect {
      fill-opacity: 0.9;
      shape-rendering: crispEdges;
    }

    .link {
      fill: none;
      stroke-opacity: 0.1;
    }

    .link:hover {
      stroke-opacity: 0.6 !important;
    }

    text {
      font-size: 1.4rem;
      font-family: GillSansMTStd-Medium, GillSansW01-Medium;
      fill: #666666;
      font-weight: normal;
    }
  }
`;
