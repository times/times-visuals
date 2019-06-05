# Web Component Harness

> Harness for loading a React component as a web component

## Installation

```bash
# Yarn
$ yarn add @times-visuals/web-component-harness

# npm
$ npm add @times-visuals/web-component-harness
```

## Usage

```js
const Demo = ({ name }) => <div>Hello, {name}</div>;

webComponentHarness(Demo, "sample-web-component");

return (
  <div>
    <sample-web-component name="Chris" />
  </div>
);
```
