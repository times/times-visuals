import React from 'react';

import { storiesOf } from '@storybook/react';

import { colors } from '../src';

const config = {
  barColor: colors.yellow,
};

storiesOf('Styles', module).add('Digital colours', () => (
  <ul>
    {Object.keys(colors).map((key, index) => {
      const { r, g, b } = colors[key];
      return (
        <li>
          <div
            key={index}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: `rgb(${r}, ${g}, ${b})`,
            }}
          />
          {key}
        </li>
      );
    })}
  </ul>
));
