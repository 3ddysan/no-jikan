import React from 'react';
import Timer, { Controls, Display } from 'components/Timer';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

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

  it('should toggle start/pause callback', () => {
    const toggle = jest.fn();
    const stop = jest.fn();
    const { getByTestId } = render(<Controls onToggle={toggle} onReset={stop} state='stopped' />);

    fireEvent.click(getByTestId('startButton'));
    expect(toggle).toBeCalled();
    expect(stop).not.toBeCalled();
  });

  it('should toggle reset callback', () => {
    const toggle = jest.fn();
    const stop = jest.fn();
    const { getByTestId } = render(<Controls onToggle={toggle} onStop={stop} state='running' />);

    fireEvent.click(getByTestId('stopButton'));

    expect(stop).toBeCalled();
    expect(toggle).not.toBeCalled();
  });

});

describe('Timer', () => {
  it('should execute "onFinish" callback on stop', async () => {
    const finish = jest.fn();
    const { getByTestId } = render(<Timer activeMode="work" elapsedSeconds={1000} onReset={finish} />);

    fireEvent.click(getByTestId('stopButton'))

    expect(finish).toBeCalledWith(1000, 0);
  });

});