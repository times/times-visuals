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

export default () => <Treemap data={data} onHover={function}/>;
```

## Data format

```js
   [
    {
      category: "HouseOfCommons",
      children: [
        {
          category: "Commons staff",
          number: "7194",
          id: "commons"
        },
        ...
      ],
      id: "HouseOfCommons",
      color: "#254251",
      font_color: "#ffffff"
    },
```
