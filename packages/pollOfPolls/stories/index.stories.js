import React from 'react';
import { storiesOf } from '@storybook/react';

import { parties, polls, averages } from './fixtures';
import PollOfPolls from '../src';

storiesOf('Charts/PollOfPolls', module).add('default', () => (
  <PollOfPolls parties={parties} data={polls} averages={averages} />
));
