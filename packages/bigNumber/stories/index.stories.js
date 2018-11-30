import React from 'react';
import { storiesOf } from '@storybook/react';

import BigNumber from '../src';

storiesOf('Styles/BigNumber', module)
  .add('Default', () => <BigNumber number={23} label="this is a label" />)
  .add('Bigger number', () => (
    <BigNumber number={23} type="big" label="this is a label" />
  ))
  .add('Prefixed/suffixed', () => (
    <BigNumber number={23} label="this is a label" prefix={'£'} suffix={'m'} />
  ));
