# Hemicycle

> A hemicycle shaped D3 chart

## Installation

```bash
# Yarn
$ yarn add @times-visuals/hemicycle

# npm
$ npm add @times-visuals/hemicycle
```

## Usage

Takes a data array in the following format:

```jsx
import Hemicycle from "@times-visuals/hemicycle";

const data = [
  {
    id: "upa",
    name: "UPA",
    seats: 66,
    color: "#00BFFF",
    longName: "United Progressive Alliance"
  }
];

export default () => <Hemicycle data={data} showLegend={true} />;
```
