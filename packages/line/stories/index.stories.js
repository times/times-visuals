import React from 'react';
import { storiesOf } from '@storybook/react';

import Line from '../src';
import data from './fixtures/';
const colours = ['#95D5A0', '#4D718B', '#80b1e2', '#f37f2f'];

storiesOf('Charts/Line', module).add('default', () => (
  <Line data={data} curve={'curveBasis'} percentage={true} yDomain={[0, 100]} />
));
