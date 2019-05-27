import React from 'react'
import styled from 'styled-components'
import { classes } from 'helper'
import { useTimer } from 'components/Timer/hooks'

const TimerDisplay = styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
`

const TimeUnit = styled.div`
    padding: 10px;
    background: #F9F9F9;
    display: inline-block;

    .unit {
        padding: 15px;
        border-radius: 3px;
        background: #F0F0F0;
        display: inline-block;
        width: 60px;
    }

    .unit-label {
        padding-top: 3px;
    }
`

const playPauseStyle = {
    stopped: 'is-primary',
    paused: 'is-warning',
    running: 'is-active',
};

const pad = (v) => v.toString().padStart(2, 0)

export function Display({ hours, minutes, seconds }) {
    return (
        <TimerDisplay>
            <TimeUnit>
                <div className="unit is-size-5">{pad(hours)}</div>
                <div className="unit-label is-size-7 has-text-centered">Hours</div>
            </TimeUnit>
            <TimeUnit>
                <div className="unit is-size-5">{pad(minutes)}</div>
                <div className="unit-label is-size-7 has-text-centered">Minutes</div>
            </TimeUnit>
            <TimeUnit>
                <div className="unit is-size-5">{pad(seconds)}</div>
                <div className="unit-label is-size-7 has-text-centered">Seconds</div>
            </TimeUnit>
        </TimerDisplay>
    );
}

export function Controls({ onToggle, onReset, state }) {
    return (
        <div className="columns is-mobile is-centered">
            <div className="column is-1" style={{ width: 'auto' }}>
                <button onClick={onToggle} className={classes('button', 'is-medium', playPauseStyle[state])}>
                    {state === 'running' ? 'Pause' : 'Play'}
                </button>
            </div>
            <div className="column is-1" style={{ width: 'auto' }}>
                <button onClick={onReset} className="button is-danger is-medium" disabled={state === 'stopped'}>
                    Stop
            </button>
            </div>
        </div>
    );
}

const Timer = ({ active = false, elapsedSeconds = 0 }) => {
    const { timer, toggle, reset, state } = useTimer(active, elapsedSeconds);
    return (
        <>
            <div className="container">
                <Display {...timer} />
            </div>
            <div className="container">
                <Controls onToggle={toggle} onReset={reset} state={state} />
            </div>
        </>
    )
};

export default Timer;