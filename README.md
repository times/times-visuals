# Times Visuals

> A library of libraries and React components for building visuals at The Times
> and The Sunday Times

## About

This is a monorepo containing all the charts, libraries and configuration for
building out charts and visuals for The Times and The Sunday Times.

## Getting started

1. Clone this repo
2. Install dependencies

```bash
$ yarn
```

3. Run the storybook

```bash
$ yarn storybook
```

## Adding a new package

To add a new package:

1. Create a new folder in the `./packages` directory
2. Copy the contents of `./template` to your new folder
3. Update the `name` and your `description` in the `package.json` file, and the
   package details in your `README.md`
4. Update your `./stories/index.stories.js` file with the details for your new
   package / component (remove this directory if your package does not require a
   Storybook story)
5. Run `yarn` in the project root (top level of the repository)

## Depending on other packages

Often you may wish to depend on another package in the repo (e.g.
`@times-visuals/styles`). To do this, manually add it to the `package.json` of
your new component, and run `yarn` from the project root to link everything
together.
