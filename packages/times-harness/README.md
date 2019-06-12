# Webpack config harness for The Times website

> Harness for running local dev inside The Times website

## Installation

```bash
# Yarn
$ yarn add @times-visuals/times-harness

# npm
$ npm add @times-visuals/times-harness
```

## Usage

```js
const path = require("path");
const webpackGenerator = require("@times-visuals/times-harness");

module.exports = webpackGenerator(
  "./src/index.js",
  {
    baseDirectory: path.resolve(__dirname, "./src"),
    distDirectory: path.resolve(__dirname, "./.tmp")
  },
  "your-component-name",
  `<your-component-name example="attribute"></your-component-name>`
);
```

You can optionally pass a build mode as the final argument – `development`
(default if not supplied) or `production`:

```js
module.exports = webpackGenerator(
  "./src/index.js",
  {
    baseDirectory: path.resolve(__dirname, "./src"),
    distDirectory: path.resolve(__dirname, "./.tmp")
  },
  "your-component-name",
  `<your-component-name example="attribute"></your-component-name>`,
  "production"
);
```
