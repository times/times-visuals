import React from 'react';
import CountUp from 'react-countup';
import style from './style.scss';

export class BigNumber extends React.Component {
  render() {
    const { number, label, type, always = null, suffix, prefix } = this.props;
    return (
      <div className={style.root}>
        <div className={[style.number, style[type]].join(' ')}>
          {number === 0 ? (
            number
          ) : (
            <CountUp
              start={0}
              end={number}
              useEasing={true}
              separator=","
              suffix={suffix}
              prefix={prefix}
            />
          )}
        </div>
        <div className={[style.label, style[type]].join(' ')}>{label}</div>
      </div>
    );
  }
}
export default BigNumber;
