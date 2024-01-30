import React, { useState } from 'react';
import EventRow from './EventRow';
import LoadMore from './LoadMore';
import historicalData from '../data/data.json';

const numEvents = 3; // number of events to be displayed at one time

const EventContainer: React.FC = () => {
    const [eventsToShow, setEventsToShow] = useState(numEvents);
    const [guessedYear, setGuessedYear] = useState<number | null>(null);
    const [victory, setVictory] = useState(false);

    const minYear = historicalData.minYear;
    const maxYear = historicalData.maxYear;

    // iterate eventsToShow by numEvents
    const loadMoreEvents = () => {
        setEventsToShow((prevEventsToShow) => prevEventsToShow + numEvents);
    };

    // handle year submission & guess checking logic
    const handleYearSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (guessedYear != null && guessedYear >= minYear && guessedYear <= maxYear) {
            setVictory(true);
        } else {
            setEventsToShow((prevEventsToShow) => prevEventsToShow + numEvents);
        }
    }

    // handle input field change
    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const year = parseInt(event.target.value, 10);
        setGuessedYear(year);
    }

    return (
        <div>
            {/* initial event display */}
            <EventRow events={historicalData.events.slice(0, eventsToShow)} />

            {/* load more events button */}
            {!victory && eventsToShow < historicalData.events.length && (
                <LoadMore onClick={loadMoreEvents} />
            )}

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

            {/* Victory screen */}
            {victory && <div>Congratulations! You guessed the correct year!</div>}
        </div>
    );
};

export default EventContainer;