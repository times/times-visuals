# Poll of polls PollOfPolls

> This is the description for the component

## Installation

```bash
# Yarn
$ yarn add @times-visuals/pollOfPolls

# npm
$ npm add @times-visuals/pollOfPolls
```

## Usage

Required parameters:

- `data`: an array of objects containing a `date` and a `poll` for a party
- `averages`: an array of objects containing a `date` and an average
- `parties`: an array of objects containing a list of parties and colours associated with them

```js
import PollOfPolls from '@times-visuals/pollOfPolls';

export default () => <PollOfPolls data={data} averages={averages} parties={parties}/>;

export default () => <PollOfPolls data={data} averages={averages} parties={parties} circleRadius={10}/>;

export default () => <PollOfPolls data={data} averages={averages} parties={parties} yDomain={[0,100]}/>;

export default () => <PollOfPolls data={data} averages={averages} parties={parties} startDate={"2018-06-01"} endDate={"2018-09-10"}/>;

export default () => <PollOfPolls data={data} averages={averages} parties={parties} dataSource={"Times research"}/>;
```
