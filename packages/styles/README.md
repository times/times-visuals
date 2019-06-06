# Styles

> The core colours and breakpoints needed for visuals

## Installation

```bash
# Yarn
$ yarn add @times-visuals/styles

# npm
$ npm add @times-visuals/styles
```

## Usage

### Colors

```js
import { colors } from "@times-visuals/styles";

// Core digital colour palette
console.log(colors.digital);

// UK Political Parties
console.log(colors.ukPoliticalParties);
```

### Breakpoints

```js
import { breakpoints } from "@times-visuals/styles";
import styled from "styled-components";

export const SomeContainer = styled.main`
  // Main styles

  @media screen and (min-width: ${breakpoints.mobile}) {
    // Mobile and above override styles
  }
`;
```
