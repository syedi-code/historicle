import React, { useEffect } from 'react';
import VerticalSpacer from './VerticalSpacer';

interface EventRowProps {
    year: number,
    targetYear: number,
    events: string[];
}

const isWithinDecade = (year: number, targetYear: number): boolean => {
    const targetDecade = Math.floor(targetYear / 10) * 10;
    const lowerBound = targetDecade;
    const upperBound = lowerBound + 9;

    return year >= lowerBound && year <= upperBound;
}

const isWithinCentury = (year: number, targetYear: number): boolean => {
    const targetCentury = Math.floor(targetYear / 100) + 1;
    const lowerBound = (targetCentury - 1) * 100;
    const upperBound = lowerBound + 99;

    return year >= lowerBound && year <= upperBound;
}

// style for free space & last guessed year
const leftColumnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '150px',
    flexShrink: 0,
    boxSizing: 'border-box',
};

// style for displayed hint (same decade/century)
const hintStyle: React.CSSProperties = {
    width: '150px',
    margin: 0,
    textAlign: 'center',
    fontWeight: 'bold',
}

const EventRow: React.FC<EventRowProps> = ({ year, targetYear, events }) => {
    // useEffect to log 'year' on each render
    // for testing - remove later :)
    useEffect(() => {
        console.log('Year:', year);
    }, [year]);

    return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {/* print either free space or last guessed year */}
        <div style={leftColumnStyle}>
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
            
            {/* print hint(s) if applicable */}
            <p style={hintStyle}>
                {isWithinDecade(year, targetYear) && <span>same decade!</span>}
            </p>
            <p style={hintStyle}>
                {isWithinCentury(year, targetYear) && <span>same century!</span>}
            </p>
        </div>
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
    )
};

export default EventRow;