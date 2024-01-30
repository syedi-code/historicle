import React, { useState } from 'react';
import historicalData from '../data/data.json';

import EventRow from './GameRow';
import Keypad from './Keypad';

const numEvents = 3; // number of events to be displayed at one time

const GameContainer: React.FC = () => {
    // game state setup
    const [eventsToShow, setEventsToShow] = useState(numEvents);
    const [guessedYear, setGuessedYear] = useState<number | null>(null);
    const [guessedYears, setGuessedYears] = useState<number[]>([0]);
    const [victory, setVictory] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');

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
    };

    const handleDigitClick = (digit: number) => {
        if (inputValue.length < 4) {
            setInputValue((prevValue) => prevValue + digit);
        }
        
        const year: number = Number(inputValue);
        console.log(year);
        setGuessedYear(year);
    };

    const handleBackspaceClick = () => {
        setInputValue((prevValue) => prevValue.slice(0, -1));
    };

    const handleSubmitClick = () => {
        const year: number = Number(inputValue);
        setGuessedYear(year);
        setInputValue('');

        if (guessedYear != null && guessedYear >= minYear && guessedYear <= maxYear) {
            // guess is correct - we've won!
            setVictory(true);
        } else {
            // guess is incorrect - slide the 'events' window forward and log the guessed year
            setEventsToShow((prevEventsToShow) => prevEventsToShow + numEvents);
            if (guessedYear != null) setGuessedYears((prevGuessedYears) => [...prevGuessedYears, year]);
        }
    };

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
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        What year is it?
                    </label>
                    <input 
                        type="text"
                        value={inputValue}
                        maxLength={4}
                        onChange={(e) => setInputValue(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    />
                </form>
            )}

            <Keypad 
                onDigitClick={handleDigitClick}
                onBackspaceClick={handleBackspaceClick}
                onSubmitClick={handleSubmitClick}
                inputValue={inputValue}
            />

            {/* victory message */}
            {victory && <div>Congratulations! You guessed the correct year!</div>}
        </div>
    );
};

export default GameContainer;