import styled from "styled-components";

export const LineContainer = styled.div`
  svg {
    overflow: visible;
  }

  text {
    font: 13px "GillSansMTStd-Medium";
    fill: #768692;
  }

  .line {
    stroke-width: 2px;
  }

  .axis {
    path {
      stroke: #dbdbdb;
      stroke-width: 1px;
    }

    .domain {
      display: none;
    }
  }

  .xAxis {
    text-anchor: "middle";
  }

  .yAxis {
    .tick:last-of-type > text {
      transform: translateY(5px);
    }

    .tick:first-of-type > text {
      transform: translateY(-5px);
    }
  }

  .line {
    fill: none;
  }

  .breaks {
    stroke: #d3d3d3;
    stroke-width: 1px;
    stroke-dasharray: 2px, 2px;
  }

  .tick line {
    display: none;
  }

  .stroked {
    stroke-dasharray: 5px, 5px !important;
    stroke: rgba(108, 116, 123, 0.5);
    stroke-width: 1px;
  }
`;
