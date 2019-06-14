# Treemap

> A treemap chart built in d3

## Installation

```bash
# Yarn
$ yarn add @times-visuals/treemap

# npm
$ npm add @times-visuals/treemap
```

## Usage

```js
import Treemap from '@times-visuals/treemap';

export default () => <Treemap data={data} onHover={function} />;
```

## Data format

```js
   [
    {
      id: "HouseOfCommons",
      children: [
        {
          category: "Commons staff",
          number: "7194",
          id: "commons"
        },
        ...
      ],
      color: "#254251",
      fontColor: "#ffffff"
    },
```

## On hover return

If an onHover function is added, it will get passed an object in the following structure:

```js
{
    data: Object of the square,
    depth: 2,
    height: 2,
    parent: Object of the parent,
    value: value of the square,
    x0: xx,
    x1: xx,
    y0: yy,
    y1: yy
}
```
