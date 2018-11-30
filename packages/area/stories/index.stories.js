import React from 'react';
import { storiesOf } from '@storybook/react';

import Area from '../src';
import data from './fixtures/';
const colours = ['#95D5A0', '#4D718B', '#80b1e2', '#f37f2f'];

storiesOf('Charts/Area', module).add('default', () => (
  <Area data={data} curve={'curveBasis'} percentage={true} yDomain={[0, 100]} />
));
