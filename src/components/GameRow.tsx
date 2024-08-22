import React, { useEffect } from 'react';
import VerticalSpacer from './VerticalSpacer';

interface GameRowProps {
    year: number,
    targetYear: number,
    events: string[];
    backgroundColor?: string;
}
const GameRow: React.FC<GameRowProps> = ({ year, targetYear, events, backgroundColor='#ededed' }) => {
    const isWithinDecade = (year: number, targetYear: number): boolean => {
        const targetDecade = Math.floor(targetYear / 10) * 10;
        const lowerBound = targetDecade;
        const upperBound = lowerBound + 9;
    
        return (year >= lowerBound && year <= upperBound);
    }
    
    const isWithinCentury = (year: number, targetYear: number): boolean => {
        const targetCentury = Math.floor(targetYear / 100) + 1;
        const lowerBound = (targetCentury - 1) * 100;
        const upperBound = lowerBound + 99;
    
        return (year >= lowerBound && year <= upperBound);
    }
    
    // style for free space & last guessed year
    const leftColumnStyle: React.CSSProperties = {
        fontFamily: 'DM Sans, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
        width: '150px',
        maxWidth: '10%',
        flexShrink: 0,
        boxSizing: 'border-box',
    };
    
    // style for displayed hint (same decade/century)
    const hintStyle: React.CSSProperties = {
        width: '150px',
        margin: '3px 0 0 0',
        textAlign: 'center',
        fontWeight: 'bold',
    }
    
    const hintStyleCentury: React.CSSProperties = {
        ...hintStyle,
        backgroundColor: '#e60000',
        color: '#ffffff',
        paddingLeft: '5px',
        paddingRight: '5px'
    }
    
    const hintStyleDecade: React.CSSProperties = {
        ...hintStyle,
        backgroundColor: '#0082e6',
        color: '#ffffff',
        paddingLeft: '5px',
        paddingRight: '5px'
    }
    
    const yearStyle: React.CSSProperties = {
        width: 'max-content',
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#000000',
        color: '#ffffff',
        paddingLeft: '5px',
        paddingRight: '5px'
    }
    
    const eventStyle: React.CSSProperties = {
        textAlign: 'left',
        fontFamily: 'Amiri, serif',
        fontWeight: 700,
        lineHeight: '1.1',
        fontSize: '18px',
        paddingRight: '10px',
    }

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        width: '100%', // Ensure it takes full width of the parent
        boxSizing: 'border-box',
    }
    
    // useEffect to log 'year' on each render
    // for testing - remove later :)
    useEffect(() => {
        console.log('Year:', year);
    }, [year]);

    return (
        <div style={containerStyle}>
            {/* print either free space or last guessed year */}
            <div style={leftColumnStyle}>
                {year === -1
                    ? (<div style={leftColumnStyle}>
                            <span style={yearStyle}>
                                FREE
                            </span>
                        </div>
                    ) : (
                        <React.Fragment>
                            <span style={yearStyle}>
                                {`${year} ${year < targetYear ? '↑' : '↓'}`}
                            </span>
                        </React.Fragment>
                    )
                }
                
                {/* print hint(s) if applicable */}
                {isWithinDecade(year, targetYear) &&
                    <p style={hintStyleDecade}>
                        <span>same decade!</span>
                    </p>
                }

                {isWithinCentury(year, targetYear) &&
                    <p style={hintStyleCentury}>
                        <span>same century!</span>
                    </p>
                }
            </div>
            <VerticalSpacer />

            {/* render our slice of events[] as a list */}
            <div style={{ backgroundColor: backgroundColor, marginTop: '5px', marginBottom: '5px' }}>
                <ul style={{ listStyleType: 'disc' }}>
                    {events.map((event, index) => (
                        <li style={eventStyle} key={index}>
                            {event}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default GameRow;