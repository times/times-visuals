import styled from "styled-components";

export const TreemapContainer = styled.div`
  svg {
    width: 100%;
    height: 100%;
    text {
      font-size: 1.4rem;
      font-family: GillSansMTStd-Medium, GillSansW01-Medium;
    }

    .grandparent text {
      font-weight: bold;
    }
    rect {
      stroke: #fff;
      stroke-width: 1px;
    }

    g.children:hover {
      cursor: pointer;
    }

    rect.parent,
    .grandparent rect {
      stroke-width: 3px;
    }

    .grandparent text {
      fill: #000000;
      font-family: GillSansMTStd-Medium, GillSansW01-Medium;
      font-weight: normal;
      font-size: 1.5rem;
    }

    .grandparent:hover rect {
      fill: grey;
      cursor: pointer;
    }

    .children rect.child {
      opacity: 0;
    }

    .children:hover rect.parent {
      @media only screen and (min-width: 500px) {
        opacity: 0.5;
      }
    }

    .grandchild:hover {
      @media only screen and (min-width: 500px) {
        opacity: 0.5;
      }
    }

    .textdiv {
      padding: 7px;
      overflow: none;
    }

    .textdiv .title {
      font-size: 102%;
      font-weight: bold;
      margin-top: 8px;
      font-size: 1.4rem;
      line-height: 1.6rem;
      @media screen and (min-width: 500px) {
        font-size: 1.6rem;
        line-height: 2rem;
      }
      font-family: GillSansMTStd-Medium, GillSansW01-Medium;
    }

    .textdiv p {
      line-height: 1.4rem;
      margin: 0 0 4px !important;
      padding: 0px;
    }

    .small {
      div {
        display: none !important;
      }
    }
  }
`;
