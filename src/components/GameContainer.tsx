import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import historicalData from '../data/data.json';

import EventRow from './GameRow';
import Keypad from './Keypad';

const numEvents = 3; // number of events to be displayed at one time
const maxGuesses = 5; // number of guesses available to user before loss

const GameContainer: React.FC = () => {
    // game state setup
    const [eventsToShow, setEventsToShow] = useState(numEvents);
    const [guessedYear, setGuessedYear] = useState<number | null>(null);
    const [guessedYears, setGuessedYears] = useState<number[]>([0]);
    const [numGuesses, setNumGuesses] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('');

    const [victory, setVictory] = useState(false);
    const [defeat, setDefeat] = useState(false);

    const minYear = historicalData.minYear;
    const maxYear = historicalData.maxYear;

    // addressing synchronicity issues when updating year
    useEffect(() => {
        const year: number = Number(inputValue);
        setGuessedYear(year);

        
        if (numGuesses === maxGuesses) {
            setDefeat(true);
        }
    }, [inputValue, numGuesses]);

    // when pressing a keypad number; updates 'year' immediately
    const handleDigitClick = (digit: number) => {
        if (inputValue.length < 4) {
            setInputValue((prevValue) => prevValue + digit);
            const year: number = Number(inputValue);
            setGuessedYear(year);
        }
    };

    // when pressing backspace on keypad
    const handleBackspaceClick = () => {
        setInputValue((prevValue) => prevValue.slice(0, -1));
    };

    // when pressing submit on keypad
    const handleSubmitClick = () => {
        const year: number = Number(inputValue);
        setGuessedYear(year);
        setInputValue('');

        // guess checking logic
        if (guessedYear != null && guessedYear >= minYear && guessedYear <= maxYear) {
            // guess is correct - we've won!
            setVictory(true);
        } else {
            // guess is incorrect
            setNumGuesses((prevNumGuesses) => prevNumGuesses + 1);

            // slide the 'events' window forward and log the guessed year
            if (!defeat) {
                setEventsToShow((prevEventsToShow) => prevEventsToShow + numEvents);
                if (guessedYear != null) setGuessedYears((prevGuessedYears) => [...prevGuessedYears, year]);
            }
        }
    };

    return (
        <div>
            {/* dynamic EventRow display */}
            <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'column' }}>
                {Array.from({ length: Math.ceil(eventsToShow / numEvents) }, (_, index) => (
                    <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <EventRow
                            key={index}
                            year={guessedYears[index]}
                            targetYear={historicalData.minYear}
                            events={historicalData.events.slice(index * numEvents, (index + 1) * numEvents)}
                        />
                    </motion.div>
                ))}
            </div>

            {/* year input & submit button */}
            {!victory && !defeat && (
                <form>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        What year is it?
                    </label>
                    <input 
                        type="text"
                        value={inputValue}
                        maxLength={4}
                        readOnly
                        onChange={(e) => setInputValue(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    />
                </form>
            )}

            {/* keypad for year input */}
            {!victory && !defeat && (
                <Keypad 
                    onDigitClick={handleDigitClick}
                    onBackspaceClick={handleBackspaceClick}
                    onSubmitClick={handleSubmitClick}
                    inputValue={inputValue}
                />
            )}

            {/* victory message */}
            {victory && <div>Congratulations! You guessed the correct year!</div>}

            {/* defeat message */}
            {defeat && <div>You lost.</div>}
        </div>
    );
};

export default GameContainer;