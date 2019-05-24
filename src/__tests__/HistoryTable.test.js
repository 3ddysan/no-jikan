import React from 'react';
import ReactDOM from 'react-dom';
import HistoryTable from '../components/HistoryTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HistoryTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
