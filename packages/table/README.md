# [Times Visuals] Table

> This is the description for the component

## Installation

```bash
# Yarn
$ yarn add @times-visuals/table

# npm
$ npm add @times-visuals/table
```

## Usage

```js
import Table from "@times-visuals/table";

const data = [
  {
    Imports: "65",
    Exports: "26",
    rankImports: "117",
    rankExports: "125"
  },
  {
    Imports: "43",
    Exports: "12",
    rankImports: "117",
    rankExports: "125"
  }
];

const columns = [
  {
    Imports: {
      label: "Imports",
      isSortable: true
    },
    Exports: {
      label: "Exports",
      isSortable: true
    },
    rankImports: {
      label: "Rank Imports",
      isSortable: true
    },
    rankExports: {
      label: "Rank Exports",
      isSortable: true
    }
  }
];

export default () => <Table data={data} columns={columns} />;
```
