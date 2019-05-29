import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faClock, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(faCalendarDay, faClock, faCoffee)

function list(entries, onDelete) {
    if (entries.length > 0) {
        return entries.map((entry, index) => (
            <tr key={index} className="on-mobile-higher">
                <td>{entry.work}</td>
                <td>{entry.break}</td>
                <td className="has-text-centered">{entry.date}</td>
                <td className="is-hidden-mobile has-text-centered">
                    <button className="button is-light" onClick={() => onDelete(index)}>
                        <span className="">Delete</span>
                    </button>
                </td>
            </tr>
        ))
    } else {
        return (
            <tr>
                <td colSpan="4" className='has-text-centered'>
                    There's no data
                </td>
            </tr>
        );
    }
}

const HistoryTable = ({ entries = [], onDelete }) => (
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
                {list(entries, onDelete)}
            </tbody>
        </table>
    </div>
);

export default HistoryTable;