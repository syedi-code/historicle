import React from 'react';
import VerticalSpacer from './VerticalSpacer';

interface EventRowProps {
    year: number,
    targetYear: number,
    events: string[];
}

// style for free space & last guessed year
const leftColumnStyle: React.CSSProperties = {
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '75px',
    flexShrink: 0,
    boxSizing: 'border-box',
};

const EventRow: React.FC<EventRowProps> = ({ year, targetYear, events }) => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {/* print either free space or last guessed year */}
        {year === 0
            ? (<p style={leftColumnStyle}>
                    FREE
                </p>
            ) : (
                <React.Fragment>
                    <p style={leftColumnStyle}>
                        {`${year} ${year < targetYear ? '↑' : '↓'}`}
                    </p>
                </React.Fragment>
            )
        }
        <VerticalSpacer />

        {/* render our slice of events[] as a list */}
        <div>
            <ul style={{ listStyleType: 'disc' }}>
                {events.map((event, index) => (
                    <li style={{ textAlign: 'left' }} key={index}>
                        {event}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default EventRow;