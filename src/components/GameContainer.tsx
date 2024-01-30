import React, { useState } from 'react';
import EventRow from './GameRow';
import historicalData from '../data/data.json';

const numEvents = 3; // number of events to be displayed at one time

const GameContainer: React.FC = () => {
    // game state setup
    const [eventsToShow, setEventsToShow] = useState(numEvents);
    const [guessedYear, setGuessedYear] = useState<number | null>(null);
    const [guessedYears, setGuessedYears] = useState<number[]>([0]);
    const [victory, setVictory] = useState(false);

    const minYear = historicalData.minYear;
    const maxYear = historicalData.maxYear;

    // handle year submission & guess checking logic
    const handleYearSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (guessedYear != null && guessedYear >= minYear && guessedYear <= maxYear) {
            // guess is correct - we've won!
            setVictory(true);
        } else {
            // guess is incorrect - slide the 'events' window forward and log the guessed year
            setEventsToShow((prevEventsToShow) => prevEventsToShow + numEvents);
            if (guessedYear != null) setGuessedYears((prevGuessedYears) => [...prevGuessedYears, guessedYear]);
        }
    }

    // handle input field change
    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const year = parseInt(event.target.value, 10);
        setGuessedYear(year);
    }

    return (
        <div>
            {/* dynamic EventRow display */}
            <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'column' }}>
                {Array.from({ length: Math.ceil(eventsToShow / numEvents) }, (_, index) => (
                    <EventRow
                        key={index}
                        year={guessedYears[index]}
                        targetYear={historicalData.minYear}
                        events={historicalData.events.slice(index * numEvents, (index+1) * numEvents)}
                    />
                ))}
            </div>

            {/* year input & submit button */}
            {!victory && (
                <form onSubmit={handleYearSubmit}>
                    <label>
                        What year is it?
                        <input 
                            type="number"
                            value={guessedYear !== null ? guessedYear : ''}
                            onChange={handleYearChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            )}

            {/* victory message */}
            {victory && <div>Congratulations! You guessed the correct year!</div>}
        </div>
    );
};

export default GameContainer;