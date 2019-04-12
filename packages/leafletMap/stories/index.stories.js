import React from "react";
import { storiesOf } from "@storybook/react";

import LeafletMap from "../src";

const stamenTonerTileset = {
  url:
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}",
  attribution:
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  ext: "png"
};

storiesOf("Elements/Leaflet Map", module)
  .add("default", () => <LeafletMap />)
  .add("Center on a point", () => (
    <LeafletMap position={[52.518391, 13.403617]} zoom={10} />
  ))
  .add("Custom tileset", () => (
    <LeafletMap
      position={[52.518391, 13.403617]}
      zoom={10}
      tileset={stamenTonerTileset}
    />
  ));
