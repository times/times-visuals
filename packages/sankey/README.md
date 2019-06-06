# Sankey

> This is the description for the component

## Installation

```bash
# Yarn
$ yarn add @times-visuals/sankey

# npm
$ npm add @times-visuals/sankey
```

## Usage

Required parameters:

```js
Data structure:

{
"nodes": [
{ "node": 0, "name": "Conservative" },
{ "node": 1, "name": "Labour" },
    ],
"links": [
{ "source": 0, "target": 1, "value": 100 },
    ]
}
```

```js
import Sankey from '@times-visuals/sankey';

export default () => <Sankey data={data} onHover={function}/>;
```
