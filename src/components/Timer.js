import React from 'react'
import styled from 'styled-components'

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

const Timer = ({ hours = '00', minutes = '00', seconds = '0' }) => (
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
                    <a href="#/" className="button is-primary is-medium">Play</a>
                </div>
                <div className="column is-1" style={{ width: 'auto' }}>
                    <a href="#/" className="button is-danger is-medium">Stop</a>
                </div>
            </div>
        </div>
    </>
);

export default Timer;