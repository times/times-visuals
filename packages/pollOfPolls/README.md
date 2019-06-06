# Poll of polls

> This is the description for the component

## Installation

```bash
# Yarn
$ yarn add @times-visuals/poll-of-polls

# npm
$ npm add @times-visuals/poll-of-polls
```

## Usage

Required parameters:

- `data`: an array of objects containing a `date` and a `poll` for a party
- `averages`: an array of objects containing a `date` and an average
- `parties`: an array of objects containing a list of parties and colours
  associated with them

```jsx
import PollOfPolls from "@times-visuals/poll-of-polls";

<PollOfPolls
  data={data}
  averages={averages}
  parties={parties}
  yDomain={[0, 100]}
  circleRadius={2}
  startDate="2018-06-01"
  endDate="2018-09-10"
  dataSource="Times research"
/>;
```
