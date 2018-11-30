import React from 'react';
import { storiesOf } from '@storybook/react';

import PostcodeSearch from '../src';

storiesOf('Helpers/PostcodeSearch', module).add('default', () => (
  <PostcodeSearch />
));
