import React, { useState } from 'react';
import historicalData from '../data/data.json';

interface HistoricalData {
    years: number[];
    events: string[];
}

const EventList: React.FC<{ events: string[] }> = ({ events }) => (
    <ul>
        {events.map((event, index) => (
            <li key={index}>{event}</li>
        ))}
    </ul>
);

const EventData: React.FC = () => {
    const [data, setData] = useState<HistoricalData | null>(historicalData);

    return (
        <div>
            <h2>Historical Events</h2>
            {data ? (
                <div>
                    <EventList events={data.events} />
                </div>
            ) : (
                <p>Loading....</p>
            )}
        </div>
    );
};

export default EventData;