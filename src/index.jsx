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
    locale="pt"
    date="2018-01-10"
    data={data}
    onDayChange={date => console.log(date)}
    onDayAddEventClick={date => console.log(date, 'add event')}
    onPeriodChange={period => console.log(period)}
    onDaysQuantityChange={quantity => console.log(quantity)}
  />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
