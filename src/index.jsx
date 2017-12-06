import React from 'react';
import ReactDOM from 'react-dom';
import Calen from './components/Calen';

const data = {
  '2017-12-05': {
    events: [{
      id: 1,
      name: '12 Services',
    },
    {
      id: 2,
      name: '12 actions',
    }],
  },
};

ReactDOM.render(
  <Calen
    data={data}
    onDayChange={date => console.log(date)}
    onPeriodChange={period => console.log(period)}
    onDaysQuantityChange={quantity => console.log(quantity)}
  />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
