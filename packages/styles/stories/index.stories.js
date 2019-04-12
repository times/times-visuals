import React from "react";

import { storiesOf } from "@storybook/react";

import { colors } from "../src";

const rgbToHex = (r, g, b) =>
  "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");

const ColorGrid = ({ grid }) => (
  <ul
    style={{
      display: "flex",
      flexDirection: "row",
      listStyleType: "none",
      flexWrap: "wrap",
      margin: 0,
      padding: 0
    }}
  >
    {Object.keys(grid).map((key, index) => {
      const { r, g, b } = grid[key];
      const hex = rgbToHex(r, g, b);

      return (
        <li
          style={{
            marginRight: "1rem",
            marginBottom: "1rem"
          }}
        >
          <div
            key={index}
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: `rgb(${r}, ${g}, ${b})`,
              marginBottom: "0.2rem",
              borderRadius: "3px"
            }}
          />
          <p
            style={{
              color: "#898989",
              margin: 0
            }}
          >
            {hex}
          </p>
          <p
            style={{
              color: "#000",
              margin: 0,
              fontSize: "0.8rem"
            }}
          >
            {key}
          </p>
        </li>
      );
    })}
  </ul>
);

storiesOf("Styles/Colors", module)
  .add("Digital", () => <ColorGrid grid={colors.digital} />)
  .add("UK Political Parties", () => (
    <ColorGrid grid={colors.ukPoliticalParties} />
  ));
