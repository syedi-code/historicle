import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import historicalData from '../data/data.json';

import GameRow from './GameRow';
import Keypad from './Keypad';
import GuessTracker from './GuessTracker';
import CountdownTimer from './CountdownTimer';

const numEvents = 3; // number of events to be displayed at one time
const maxGuesses: number = Number(7); // number of guesses available to user before loss

const GameContainer: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

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

    const useIsMobile = () => {
        const [isMobile, setIsMobile] = useState<boolean>(false);
    
        useEffect(() => {
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            setIsMobile(mediaQuery.matches);
    
            const handleResize = () => setIsMobile(mediaQuery.matches);
    
            // Add event listener to handle screen resize
            mediaQuery.addEventListener('change', handleResize);
    
            // Cleanup event listener on component unmount
            return () => mediaQuery.removeEventListener('change', handleResize);
        }, []);
    
        return isMobile;
    };

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

    // gradient function
    const getBackgroundColor = (index: number): string => {
        const blue = [142, 202, 230]; // RGB for #8ecae6
        const lightRed = [255, 150, 150];    // Lighter RGB for a pastel red
    
        const interpolate = (start: number, end: number, factor: number) => 
            Math.round(start + (end - start) * factor);
    
        const factor = index / 5; // Normalize index to a range of 0 to 1
        const r = interpolate(blue[0], lightRed[0], factor);
        const g = interpolate(blue[1], lightRed[1], factor);
        const b = interpolate(blue[2], lightRed[2], factor);
    
        return `rgb(${r}, ${g}, ${b})`;
    };

    /************* CSS STYLING *************/
    const inputStyle: React.CSSProperties = {
        width: '500px',
        maxWidth: '90%',
        height: '90px',
        margin: '10px',
        marginTop: '0',
        textAlign: 'right',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: '900',
        fontSize: '90px'
    }

    const labelStyle: React.CSSProperties = {
        width: 'max-content',
        fontFamily: "Playfair Display, serif",
        fontWeight: '900',
        backgroundColor: '#000000',
        color: '#ffffff',
        fontSize: '24px',
        paddingRight: '10px',
        paddingLeft: '10px'
    }

    const eventContainerStyle: React.CSSProperties = {
        maxHeight: '35vh',
        overflowY: 'auto',
        width: '1200px',
        maxWidth: '90%',
        margin: '1vh 5vw',
        display: 'flex',
        flexDirection: 'column',
    }

    const inputContainerStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: '0',
        left: 0,
        right: 0,
        paddingBottom: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
    }

    const endGameStyle: React.CSSProperties = {
        margin: '20px 10vw',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '24px'
    }

    const bodyStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // Stack elements vertically
        margin: 0, // Remove default margin
        padding: 0, // Remove default padding
        boxSizing: 'border-box', // Ensure padding and border are included in width/height
    };

    /************* COMPONENT RENDER *************/
    return (
        <div style={bodyStyle}>
            {/* dynamic EventRow display */}
            <div ref={eventRowContainerRef} style={eventContainerStyle}>
                {Array.from({ length: Math.ceil(eventsToShow / numEvents) }, (_, index) => (
                    <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <GameRow
                            key={index}
                            year={guessedYears[index]}
                            targetYear={historicalData.minYear}
                            events={historicalData.events.slice(index * numEvents, (index + 1) * numEvents)}
                            backgroundColor={getBackgroundColor(index)}
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