import React from 'react';

export default () => (
  <main>
    <ul>
      <li>
        <a href="https://times.github.io/dataviz-catalogue/hemicycle/">
          Catalogue reference
        </a>
      </li>
      <li>
        <a href="https://github.com/times/times-hemicycle-react">
          React implementation
        </a>
      </li>
      <li>
        <a href="https://components.timesdev.tools/sys/builder/?component=lib2/midterms2018SenateResults/SenateResults.json">
          US Senate results
        </a>
      </li>
      <li>
        This layout is based on{' '}
        <a href="https://github.com/geoffreybr/d3-parliament">
          <code>d3-parliament</code>
        </a>, though it was re-implemented as a bunch of IFFEs, lol
      </li>
    </ul>
  </main>
);
