import React from 'react';
import { Controls, Display } from 'components/Timer';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from 'react-testing-library';

describe('Display', () => {

  it('renders state correctly', () => {
    const tree = renderer
      .create(<Display hours="02" minutes="41" seconds="03" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});

describe('Controls', () => {

  it('renders paused state correctly', () => {
    const tree = renderer
      .create(<Controls state='paused' />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders running state correctly', () => {
    const tree = renderer
      .create(<Controls state='running' />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders stopped state correctly', () => {
    const tree = renderer
      .create(<Controls state='stopped' />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  afterEach(cleanup);

  it('should toggle play/pause callback', () => {
    const toggle = jest.fn();
    const reset = jest.fn();
    const { getByText } = render(<Controls onToggle={toggle} onReset={reset} state='stopped' />);

    fireEvent.click(getByText('Play'));

    expect(toggle).toBeCalled();
    expect(reset).not.toBeCalled();
  });

  it('should toggle reset callback', () => {
    const toggle = jest.fn();
    const reset = jest.fn(() => console.log('click on Stop button'));
    const { getByText } = render(<Controls onToggle={toggle} onReset={reset} state='running' />);

    fireEvent.click(getByText('Stop'));

    expect(reset).toBeCalled();
    expect(toggle).not.toBeCalled();
  });

});