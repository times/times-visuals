import React from 'react';
import { storiesOf } from '@storybook/react';

import Line from '../src';
import { data, annotation } from './fixtures';

storiesOf('Charts/Line', module)
  .add('Default', () => <Line data={data} yDomain={[0, 200]} />)
  .add('With area', () => (
    <Line data={data} curve="curveBasis" area={true} yDomain={[0, 100]} />
  ))
  .add('As percentage', () => (
    <Line
      data={data}
      curve="curveBasis"
      area={true}
      percentage={true}
      yDomain={[0, 100]}
    />
  ))
  .add('With annotation', () => (
    <Line
      data={data}
      curve="curveBasis"
      area={true}
      percentage={true}
      yDomain={[0, 100]}
      annotation={annotation}
    />
  ));
