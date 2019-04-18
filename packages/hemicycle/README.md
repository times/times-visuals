# Hemicycle

> This is the description for the component

## Installation

```bash
# Yarn
$ yarn add @times-visuals/hemicycle

# npm
$ npm add @times-visuals/hemicycle
```

## Usage

Takes a data object in the following format:

[{
id: "upa",
name: "UPA",
seats: 66,
color: #00BFFF,
longName: "United Progressive Alliance"
}]

```js
import Hemicycle from '@times-visuals/hemicycle';

export default () => <Hemicycle data={data}/>;

export default () => <Hemicycle data={data} showLegend={true}/>;
```
