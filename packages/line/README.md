# Line chart

> This is the description for the component

## Installation

```bash
# Yarn
$ yarn add @times-visuals/line

# npm
$ npm add @times-visuals/line
```

## Usage

Required parameters:

* `data`: an array of objects containing at least two key/value pairs (one for the x axis, one for the y axis)
* `yDomain`: an array of two integers we'll use to set the domain of the y axis

```js
import Line from '@times-visuals/line';

// simplest version
export default () => <Line data={data} yDomain={[0,100]}/>;

// area chart
export default () => <Line data={data} curve={'curveBasis'} area={true} yDomain={[0, 100]} />;

// area chart with y axis formatted as percentages
export default () => <Line
      data={data}
      curve={'curveBasis'}
      area={true}
      percentage={true}
      yDomain={[0, 100]}
    />;

// the above, with an annotation (see section below)
export default () => <Line
      data={data}
      curve={'curveBasis'}
      area={true}
      percentage={true}
      yDomain={[0, 100]}
      annotation={annotation}
    />;
```

Annotations must be of this format:

```js
const annotation = {
  title: 'this is an annotation',
  x: new Date('2018-06-01'),
  y: 50,
  dx: 20,
  dy: -30,
};
```
