import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import Calen from './components/Calen';

const data = {
  '2017-11-20': {
    events: [],
    tasks: [],
  },
  '2017-11-21': {
    events: [],
    tasks: [],
  },
  '2017-11-22': {
    events: [{
      id: 1,
      name: '12 Services',
    }],
    tasks: [],
    active: true,
  },
  '2017-11-23': {
    events: [],
    tasks: [],
  },
  '2017-11-24': {
    events: [],
    tasks: [],
  },
  '2017-11-25': {
    events: [],
    tasks: [],
  },
  '2017-11-26': {
    events: [],
    tasks: [],
  },
};

ReactDOM.render(
  <Calen
    data={data}
    onPeriodChange={period => console.log(period)}
    onDaysQuantityChange={quantity => console.log(quantity)}
  />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
