import styled from "styled-components";

export const BarcodeContainer = styled.div`
  svg {
    height: 100px;
    overflow: visible;
    width: 100%;

    text {
      font-family: "GillSansMTStd-Medium", "GillSans-Medium";
      font-size: 1.3rem;
      fill: #666666;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-weight: 100;
    }

    .circleImport {
      fill: rgb(37, 66, 81);
    }

    .circleExport {
      fill: rgb(224, 171, 38);
    }

    .xAxis path {
      display: none;
    }

    .annotation path {
      stroke: #696969;
      stroke-width: 2px;
      fill: none;
    }

    .annotation-note-title,
    .annotation-note-label {
      font: 1.5rem GillSansMTStd-Medium, GillSansW01-Medium;
      text-transform: none;
      transform: translateX(-10px);
    }

    .importAnnotation {
      .annotation path {
        stroke: rgb(37, 66, 81);
      }
      .annotation text {
        fill: #fff;
        font-size: 2.4rem;
        font-family: TimesModern-Bold;
      }
      .annotation-note-content rect {
        width: 8rem;
        height: 3rem;
        fill: rgb(37, 66, 81);
        fill-opacity: 1;
        border-radius: 2px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      }
    }

    .exportAnnotation {
      .annotation path {
        stroke: rgb(224, 171, 38);
      }
      .annotation text {
        fill: #fff;
        font-size: 2.4rem;
        font-family: TimesModern-Bold;
      }
      .annotation-note-content rect {
        width: 8rem;
        height: 3rem;
        fill: rgb(224, 171, 38);
        fill-opacity: 1;
        border-radius: 2px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      }
    }

    .xAxis line {
      display: none;
    }
  }
`;
