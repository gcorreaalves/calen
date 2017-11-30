import React from 'react';
import ReactDOM from 'react-dom';
import Calen from './components/Calen';

ReactDOM.render(
  <Calen
    onDayClick={date => console.log(date)}
    onPeriodChange={period => console.log(period)}
    onDaysQuantityChange={quantity => console.log(quantity)}
  />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
