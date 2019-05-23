import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faClock, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(faCalendarDay, faClock, faCoffee)

const Title = styled.h1`
    width: 75px;
    background-color: lightcoral;
    padding-left: 2px;
    box-shadow: 0px 0px 1px 5px rgba(0,0,0,1);

    span {
        background-color: white;
    }
`

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

const Logo = () => (
    <div className="container">
        <Title className="title">no<span>-</span>jikan</Title>
    </div>
);

const Timer = ({ hours = '00', minutes = '00', seconds = '00' }) => (
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

const HistoryTable = ({ entries = [] }) => (
    <div className="container">
        <table className="table is-fullwidth">
            <thead>
                <tr>
                    <th>
                        <FontAwesomeIcon icon="clock" />
                        <span className="is-hidden-mobile"> Time</span>
                    </th>
                    <th>
                        <FontAwesomeIcon icon="coffee" />
                        <span className="is-hidden-mobile"> +Break</span>
                    </th>
                    <th className="has-text-centered">
                        <FontAwesomeIcon icon="calendar-day" />
                        <span className="is-hidden-mobile"> Date</span>
                    </th>
                    <th className="has-text-centered is-hidden-mobile">
                        <span>Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {entries.map(entry => (
                    <tr className="on-mobile-higher">
                        <td>{entry.work}</td>
                        <td>{entry.break}</td>
                        <td className="has-text-centered">{entry.date}</td>
                        <td className="is-hidden-mobile has-text-centered">
                            <a className="button is-light" href="#/">
                                <span className="">Delete</span>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const App = () => {
    return (
        <>
            <section className="section hero">
                <div className="hero-head">
                    <Logo />
                </div>
                <div className="hero-body has-text-centered">
                    <Timer hours='00' minutes='34' seconds='23' />
                </div>
                <div className="hero-footer">
                    <HistoryTable entries={[
                        { work: '8h13m', break: '55m', date: 'Wed, 23 May' },
                        { work: '7h33m', break: '22m', date: 'Tue, 22 May' },
                        { work: '7h53m', break: '15m', date: 'Mon, 21 May' },
                        { work: '6h00m', break: '30m', date: 'Fri, 20 May' },
                    ]} />
                </div>
            </section>
        </>
    )
};

export default App