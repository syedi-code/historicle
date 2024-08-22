import React from 'react';

interface GuessTrackerProps {
    maxGuesses: number,
    numGuesses: number,
    victory: boolean
}

const guessContainerStyle: React.CSSProperties = {
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '900',
    fontSize: '2vh',
    marginTop: '10px'
}

const GuessTracker: React.FC<GuessTrackerProps> = ({ maxGuesses, numGuesses, victory }) => {
    const guesses = Array.from({ length: maxGuesses }, (_, index) => {
        if ((index !== 0 || numGuesses !== 0) && index < numGuesses) {
            return 'X';
        } else if (index >= numGuesses) {
            return '/';
        } else if (index == 0) {
            return 'X';
        }
    });

    return (
        <div style={guessContainerStyle}>
            {guesses.join('-')}
        </div>
    );
}

export default GuessTracker;