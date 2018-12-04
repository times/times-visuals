/* global require, L */
// Libraries
import React from 'react';
require('leaflet/dist/leaflet.css');
import { Map, TileLayer, Marker, PopUp, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

// Styles
import style from './style.scss';

export class LeafletMap extends React.Component {
  state = {
    geoData: null,
    position: [51.505513, -0.087792],
  };
  render() {
    const { geoData, position } = this.state;
    const icon = new L.Icon({
      iconUrl:
        '//components.timesdev.tools.s3.amazonaws.com/lib2/boundaries-map/assets/2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, 0],
      shadowUrl:
        '//components.timesdev.tools.s3.amazonaws.com/lib2/boundaries-map/assets/44a526eed258222515aa21eaffd14a96.png',
      shadowSize: [30, 30],
      shadowAnchor: [15, 42],
    });
    return (
      <div
        id="container"
        className={[style.container, !geoData && style.isLoading].join(' ')}
      >
        <Map
          style={{ height: '500px' }}
          zoomControl={true}
          dragging={true}
          center={position}
          zoom={16}
          ref="map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
            attribution="Tiles courtesy of <a href=&quot;http://openstreetmap.se/&quot; target=&quot;_blank&quot;>OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a>"
          />
          {geoData ? (
            <GeoJSON
              ref="boundaries"
              data={geoData.features}
              className={style.overlay}
              onEachFeature={this.onEachFeature}
            />
          ) : null}
          <Marker position={position} icon={icon} />
        </Map>
      </div>
    );
  }
}

export default LeafletMap;
