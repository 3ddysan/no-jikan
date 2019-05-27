import React from 'react';
import HistoryTable from 'components/HistoryTable';
import renderer from 'react-test-renderer';

describe('HistoryTable', () => {

  it('renders empty state', () => {
    const tree = renderer
      .create(<HistoryTable entries={[]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with single ', () => {
    const tree = renderer
      .create(<HistoryTable entries={[{ work: 'work-time', break: 'break-time', date: 'date' }]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
