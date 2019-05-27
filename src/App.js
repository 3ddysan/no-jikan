import React, { useState } from 'react'
import HistoryTable from 'components/HistoryTable'
import Timer from 'components/Timer'
import Logo from 'components/Logo'
import { transformSeconds } from 'helper'

const getLocales = () => navigator.languages && navigator.languages[0]

const formatSeconds = (s) => {
    const { hours, minutes } = transformSeconds(s);
    const h = hours > 0 ? hours + 'h' : '';
    const m = minutes > 0 ? minutes + 'm' : '';
    const readableFormat = h + m;
    return readableFormat === '' ? '1m' : readableFormat;
}

const createEntry = (s) => {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return {
        work: formatSeconds(s),
        break: '0m',
        date: now.toLocaleDateString(getLocales(), options)
    };
}

const App = () => {
    const [history, setHistory] = useState([]);
    return (
        <>
            <section className="section hero">
                <div className="hero-head">
                    <Logo />
                </div>
                <div className="hero-body has-text-centered">
                    <Timer active elapsedSeconds={0} onFinish={(s) => { setHistory(history => history.concat(createEntry(s))) }} />
                </div>
                <div className="hero-footer">
                    <HistoryTable entries={history} />
                </div>
            </section>
        </>
    )
};

export default App