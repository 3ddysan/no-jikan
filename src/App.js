import React, { useState } from 'react'
import HistoryTable from 'components/HistoryTable'
import Timer from 'components/Timer'
import Logo from 'components/Logo'
import { formatSeconds, formatDate } from 'helper'

const dateBefore = (s) => new Date(new Date().getTime() - s * 1000)

const createEntry = (history, s) => {
    return (s <= 1) ? history :
        [...history, {
            work: formatSeconds(s),
            break: '0m',
            date: formatDate(dateBefore(s)),
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
                    <Timer elapsedSeconds={0} onFinish={handleCreate} />
                </div>
                <div className="hero-footer">
                    <HistoryTable entries={history} onDelete={handleDelete} />
                </div>
            </section>
        </>
    )
};

export default App