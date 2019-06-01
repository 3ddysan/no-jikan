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
    display: inline-block;
    ${({ paused }) => paused ? `
        background: #fff3c2;
    ` : `
        background: #F9F9F9;
    `}

    .unit {
        padding: 15px;
        border-radius: 3px;
        display: inline-block;
        width: 60px;
        ${({ paused }) => paused ? `
            background: #ffe26c;
        ` : `
            background: #F0F0F0;
        `}
    }

    .unit-label {
        padding-top: 3px;
    }
`

const pad = (v) => v.toString().padStart(2, 0)

export function Display({ hours, minutes, seconds, paused }) {
    return (
        <TimerDisplay paused={paused} data-testid="display">
            <TimeUnit paused={paused}>
                <div className="unit is-size-5">{pad(hours)}</div>
                <div className="unit-label is-size-7 has-text-centered">Hours</div>
            </TimeUnit>
            <TimeUnit paused={paused}>
                <div className="unit is-size-5">{pad(minutes)}</div>
                <div className="unit-label is-size-7 has-text-centered">Minutes</div>
            </TimeUnit>
            <TimeUnit paused={paused}>
                <div className="unit is-size-5">{pad(seconds)}</div>
                <div className="unit-label is-size-7 has-text-centered">Seconds</div>
            </TimeUnit>
        </TimerDisplay>
    );
}

const playPauseStyle = {
    stopped: 'is-primary',
    paused: 'is-warning',
    running: 'is-active',
};

export function Controls({ onToggle, onStop, state }) {
    return (
        <div className="columns is-mobile is-centered">
            <div className="column is-1" style={{ width: 'auto' }}>
                <button data-testid="startButton" onClick={onToggle} className={classes('button', 'is-medium', playPauseStyle[state])}>
                    {state === 'running' ? 'Pause' : 'Start'}
                </button>
            </div>
            <div className="column is-1" style={{ width: 'auto' }}>
                <button data-testid="stopButton" onClick={onStop} className="button is-danger is-medium" disabled={state === 'stopped'}>
                    Stop
            </button>
            </div>
        </div>
    );
}

const Timer = ({ active = false, elapsedSeconds = 0, onFinish }) => {
    const { timer, toggle, stop, state, totalSeconds } = useTimer(active, elapsedSeconds);
    const onStop = () => {
        onFinish && onFinish(totalSeconds);
        stop();
    };
    return (
        <>
            <div className="container">
                <Display {...timer} />
            </div>
            <div className="container">
                <Controls onToggle={toggle} onStop={onStop} state={state} />
            </div>
        </>
    )
};

export default Timer;