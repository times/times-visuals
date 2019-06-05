# Script Loader

> Simple React component for loading a script before rendering its children

## Installation

```bash
# Yarn
$ yarn add @times-visuals/script-loader

# npm
$ npm add @times-visuals/script-loader
```

## Usage

```js
import ScriptLoader from "@times-visuals/script-loader";

export default () => (
  <ScriptLoader src="url/to/script">
    <div>Hello, world! This renders once the `src` script has loaded</div>
  </ScriptLoader>
);
```
