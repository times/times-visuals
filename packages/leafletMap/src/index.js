import React from "react";
import { Map, TileLayer, Marker, PopUp, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const LeafletMap = ({
  position = [51.505513, -0.087792],
  zoom = 16,
  tileset = {
    url: "https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png",
    attribution:
      'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }
}) => {
  const icon = new L.Icon({
    iconUrl:
      "//components.timesdev.tools.s3.amazonaws.com/lib2/boundaries-map/assets/2273e3d8ad9264b7daa5bdbf8e6b47f8.png",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, 0],
    shadowUrl:
      "//components.timesdev.tools.s3.amazonaws.com/lib2/boundaries-map/assets/44a526eed258222515aa21eaffd14a96.png",
    shadowSize: [30, 30],
    shadowAnchor: [15, 42]
  });

  return (
    <Map
      style={{ height: "500px" }}
      zoomControl={true}
      dragging={true}
      center={position}
      zoom={zoom}
    >
      <TileLayer {...tileset} />
      <Marker position={position} icon={icon} />
    </Map>
  );
};

export default LeafletMap;
