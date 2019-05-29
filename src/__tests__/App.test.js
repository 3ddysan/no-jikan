import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import { render, fireEvent, act, cleanup } from 'react-testing-library';

jest.useFakeTimers();

describe('App', () => {

  afterEach(cleanup);

  it('timer after 10 seconds', () => {
    const { getByTestId } = render(<App />)

    const startButton = getByTestId("startButton");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(10000);
    });

    const display = getByTestId("display");
    expect(display.textContent).toBe('00Hours00Minutes10Seconds')
  });

});