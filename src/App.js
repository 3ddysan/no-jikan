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

const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(getLocales(), options)
}

const createEntry = (history, s) => {
    if (s <= 1) {
        return history;
    }
    return [...history, {
        work: formatSeconds(s),
        break: '0m',
        date: formatDate(new Date())
    }];
}

const App = () => {
    const [history, setHistory] = useState([]);

    const handleCreate = (s) => setHistory(history => createEntry(history, s));
    const handleDelete = (index) => setHistory(history => {
        history.splice(index, 1)
        return [...history];
    });

    return (
        <>
            <section className="section hero">
                <div className="hero-head">
                    <Logo />
                </div>
                <div className="hero-body has-text-centered">
                    <Timer active elapsedSeconds={0} onFinish={handleCreate} />
                </div>
                <div className="hero-footer">
                    <HistoryTable entries={history} onDelete={handleDelete} />
                </div>
            </section>
        </>
    )
};

export default App