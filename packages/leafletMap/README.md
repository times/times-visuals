# Leaflet map LeafletMap

> This is the description for the component

## Installation

```bash
# Yarn
$ yarn add @times-visuals/leafletMap

# npm
$ npm add @times-visuals/leafletMap
```

## Usage

Optional parameters:

* `position`: a `[lat, lon]` array
* `zoom`: an `integer`
* `tileset`: an object containing `url, attribution`, and maybe `ext` - plenty can be found [on the Leaflet providers list](https://leaflet-extras.github.io/leaflet-providers/preview/)

```js
import LeafletMap from '@times-visuals/leafletMap';

// custom zoom and centering
export default () => <LeafletMap position={[52.518391, 13.403617]} zoom={10} />

// custom tileset
const stamenTonerTileset = {
  url:
    'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
  attribution:
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  ext: 'png',
};

export default () => <LeafletMap
      position={[52.518391, 13.403617]}
      zoom={10}
      tileset={stamenTonerTileset}
    />;
```
