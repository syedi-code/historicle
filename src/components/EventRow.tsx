import React from 'react';

interface EventRowProps {
    events: string[];
}

const EventRow: React.FC<EventRowProps> = ({ events }) => (
    <div>
        {events.map((event, index) => (
            <p key={index}>{event}</p>
        ))}
    </div>
);

export default EventRow;