import React from 'react';
import ReactDOM from 'react-dom';

import Calen from './components/Calen';

ReactDOM.render(
  <Calen />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
