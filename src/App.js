import React, { useState } from 'react'
import HistoryTable from 'components/HistoryTable'
import Timer from 'components/Timer'
import Logo from 'components/Logo'
import { formatSeconds, formatDate } from 'helper'

const dateBefore = (s) => new Date(new Date().getTime() - s * 1000)

const createEntry = (history, w, b) => {
    return (w <= 1) ? history :
        [...history, {
            work: formatSeconds(w),
            break: formatSeconds(b),
            date: formatDate(dateBefore(w)),
        }];
}

const App = () => {
    const [history, setHistory] = useState([]);

    const handleCreate = (workSeconds, breakSeconds) => setHistory(history => createEntry(history, workSeconds, breakSeconds));
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