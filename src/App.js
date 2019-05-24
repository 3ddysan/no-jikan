import React from 'react'
import HistoryTable from './components/HistoryTable'
import Timer from './components/Timer'
import Logo from './components/Logo'

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