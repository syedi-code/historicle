import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import historicalData from '../data/data.json';

import EventRow from './GameRow';
import Keypad from './Keypad';
import GuessTracker from './GuessTracker';
import CountdownTimer from './CountdownTimer';

const numEvents = 3; // number of events to be displayed at one time
const maxGuesses: number = Number(7); // number of guesses available to user before loss

const GameContainer: React.FC = () => {
    /************* GAME VARIABLES *************/
    const [eventsToShow, setEventsToShow] = useState(numEvents);
    const [guessedYear, setGuessedYear] = useState<number | null>(null);
    const [guessedYears, setGuessedYears] = useState<number[]>([-1]);
    const [numGuesses, setNumGuesses] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('');

    const [victory, setVictory] = useState(false);
    const [defeat, setDefeat] = useState(false);
    
    const eventRowContainerRef = useRef<HTMLDivElement>(null);

    const minYear = historicalData.minYear;
    const maxYear = historicalData.maxYear;

    
    /************* LOGIC *************/
    useEffect(() => {
        const year: number = Number(inputValue);
        setGuessedYear(year);

        // event container scroll
        if (eventRowContainerRef.current) {
            eventRowContainerRef.current.scrollTop = eventRowContainerRef.current.scrollHeight;
        }

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

        if (guessedYear != null && guessedYear >= minYear && guessedYear <= maxYear) {      // guess is correct - we've won!
            setVictory(true);
        } else {
            setNumGuesses((prevNumGuesses) => prevNumGuesses + 1);

            if (!defeat) {      // slide the 'events' window forward and log the guessed year
                setEventsToShow((prevEventsToShow) => prevEventsToShow + numEvents);
                if (guessedYear != null) setGuessedYears((prevGuessedYears) => [...prevGuessedYears, year]);
            }
        }
    };

    // :)
    const generateAffirmation = () => {
        const affirmations = ["Nicely done!", "Good job!", "Nice one!", "Awesome!", "Well done.", "You might be the greatest to ever do it..."];

        return affirmations[Math.floor(Math.random() * affirmations.length)];
    }

    /************* CSS STYLING *************/
    const inputStyle: React.CSSProperties = {
        width: '15%',
        height: '90px',
        textAlign: 'right',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: '900',
        fontSize: '84px'
    }

    const labelStyle: React.CSSProperties = {
        width: 'max-content',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: '900',
        fontSize: '24px',
        paddingRight: '10px',
        paddingLeft: '10px'
    }

    const eventContainerStyle: React.CSSProperties = {
        maxHeight: '35%',
        overflowY: 'auto',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
    }

    const inputContainerStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: '2%',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
    }

    const endGameStyle: React.CSSProperties = {
        marginTop: '20px',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '24px'
    }

    /************* COMPONENT RENDER *************/
    return (
        <div style={{ height: '80vh', overflowY: 'auto' }}>
            {/* dynamic EventRow display */}
            <div ref={eventRowContainerRef} style={eventContainerStyle}>
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

            <div style={inputContainerStyle}>
                {/* year input & submit button */}
                {!victory && !defeat && (
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: '5px' }}>
                            <span style={labelStyle}>
                                WHAT YEAR IS IT?
                            </span>
                        </div>
                        <form>
                            <input 
                                style={inputStyle}
                                type="text"
                                value={inputValue}
                                maxLength={4}
                                readOnly
                                onChange={(e) => setInputValue(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            />
                        </form>
                    </div>
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

                {/* guess tracker */}
                {!victory && !defeat && (
                    <GuessTracker 
                        maxGuesses={maxGuesses}
                        numGuesses={numGuesses}
                        victory={victory} 
                    />
                )}
            </div>
            

            {/* victory message */}
            {
                victory && 
                <React.Fragment>
                    <div style={endGameStyle}>
                        <span style={{ fontWeight: '600', color: '#0082e6' }}>
                            {generateAffirmation()}
                        </span>
                        {' '} The years were {' '}
                        <span style={{ fontWeight: '600', color: '#e60000' }}>
                            {minYear} - {maxYear}.
                        </span>
                    </div>

                    <CountdownTimer />
                </React.Fragment>
            }

            {/* defeat message */}
            {
                defeat && 
                <React.Fragment>
                    <div style={endGameStyle}>
                        <span style={{ fontWeight: '600', color: '#e60000' }}>
                            Better luck next time!
                        </span>
                        {' '} The years were {' '}
                        <span style={{ fontWeight: '600', color: '#0082e6' }}>
                            {minYear} - {maxYear}.
                        </span>
                    </div>

                    <CountdownTimer />
                </React.Fragment>
            }
        </div>
    );
};

export default GameContainer;