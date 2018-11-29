# [Times Visuals] Barcode chart

> Renders a barcode chart

## Installation

```bash
# Yarn
$ yarn add @times-visuals/barcode

# npm
$ npm add @times-visuals/barcode
```

## Usage

```js
import Barcode from "@times-visuals/barcode";

const data = [
  {
    fieldName: 100,
    otherField: "France"
  },
  {
    fieldName: 200,
    otherField: "Germany"
  },
  {
    fieldName: 150,
    otherField: "Poland"
  }
];

export default () => <Barcode data={data} valueField="fieldName" />;
```

You can optionally pass a configuration option with a colour too:

```js
import { colors } from "@times-stories/styles";

export default () => (
  <Barcode
    data={data}
    valueField="fieldName"
    config={{
      color: colors.blue
    }}
  />
);
```
