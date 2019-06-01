import React from 'react';
import App from 'App';
import { render, fireEvent, act, cleanup } from '@testing-library/react';

jest.useFakeTimers();

describe('App', () => {

  afterEach(cleanup);

  it('timer after 10 seconds', () => {
    const { getByTestId } = render(<App />)
    fireEvent.click(getByTestId("startButton"));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    const display = getByTestId("display");
    expect(display.textContent).toBe('00Hours00Minutes10Seconds')
  });

});