import React from 'react';
import { storiesOf } from '@storybook/react';

import Line from '../src';
import data from './fixtures/';
const colours = ['#95D5A0', '#4D718B', '#80b1e2', '#f37f2f'];

storiesOf('Charts/Line', module)
  .add('Default', () => (
    <Line data={data} curve={'curveBasis'} yDomain={[0, 200]} />
  ))
  .add('With area', () => (
    <Line data={data} curve={'curveBasis'} area={true} yDomain={[0, 100]} />
  ))
  .add('As percentage', () => (
    <Line
      data={data}
      curve={'curveBasis'}
      area={true}
      percentage={true}
      yDomain={[0, 100]}
    />
  ));
