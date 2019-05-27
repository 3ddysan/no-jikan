import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { classes } from 'helper'

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
const pad = (v) => v.toString().padStart(2, 0)

const formatSeconds = (s) => {
    const minutes = pad(Math.floor(s / 60) % 60);
    const hours = pad(Math.floor(s / 3600));
    const seconds = pad(s % 60);
    return { hours, minutes, seconds };
}

export const useTimer = (active = false, elapsedSeconds = 0) => {
    const [state, setState] = useState('stopped')
    const [seconds, setSeconds] = useState(elapsedSeconds)
    const [isActive, setActive] = useState(active)
    const intervalRef = useRef()

    useEffect(() => {
        if (isActive) {
            setState('running');
            intervalRef.current = setInterval(() => {
                setSeconds(previous => previous + 1)
            }, 1000);
            return () => {
                clearInterval(intervalRef.current)
            }
        }
        clearInterval(intervalRef.current)
        setState(s => s === 'running' ? 'paused' : 'stopped');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive])

    const toggle = () => {
        setActive(isActive => !isActive)
    }

    const reset = () => {
        setActive(false)
        setSeconds(0)
        setState('stopped');
    }

    return {
        timer: formatSeconds(seconds),
        toggle,
        reset,
        state
    };
}

const playPauseStyle = {
    stopped: 'is-primary',
    paused: 'is-warning',
    running: 'is-active',
};

const Timer = ({ active = false, elapsedSeconds = 0 }) => {
    const { timer, toggle, reset, state } = useTimer(active, elapsedSeconds);
    const { hours, minutes, seconds } = timer;
    return (
        <>
            <div className="container">
                <TimerDisplay>
                    <TimeUnit>
                        <div className="unit is-size-5">{hours}</div>
                        <div className="unit-label is-size-7 has-text-centered">Hours</div>
                    </TimeUnit>
                    <TimeUnit>
                        <div className="unit is-size-5">{minutes}</div>
                        <div className="unit-label is-size-7 has-text-centered">Minutes</div>
                    </TimeUnit>
                    <TimeUnit>
                        <div className="unit is-size-5">{seconds}</div>
                        <div className="unit-label is-size-7 has-text-centered">Seconds</div>
                    </TimeUnit>
                </TimerDisplay>
            </div>
            <div className="container">
                <div className="columns is-mobile is-centered">
                    <div className="column is-1" style={{ width: 'auto' }}>
                        <button onClick={toggle} className={classes('button', 'is-medium', playPauseStyle[state])}>
                            {state === 'running' ? 'Pause' : 'Play'}
                        </button>
                    </div>
                    <div className="column is-1" style={{ width: 'auto' }}>
                        <button onClick={reset} className="button is-danger is-medium" disabled={state === 'stopped'}>
                            Stop
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Timer;