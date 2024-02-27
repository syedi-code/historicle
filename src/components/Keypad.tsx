import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface KeypadProps {
    onDigitClick: (digit: number) => void;
    onBackspaceClick: () => void;
    onSubmitClick: () => void;
    inputValue: string;
}

const Keypad: React.FC<KeypadProps> = ({ onDigitClick, onBackspaceClick, onSubmitClick, inputValue }) => {
    // button styling
    const buttonStyle: React.CSSProperties = {
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: '900',
        backgroundColor: '#D3D3D3', // Grey color
        borderRadius: '8px', // Rounded corners
        border: 'none', // No border
        padding: '10px', // Padding for larger size
        fontSize: '18px', // Font size
        cursor: 'pointer', // Cursor on hover
        transition: 'background-color 1.0s',
    };

    // keypad styling
    const keypadStyle: React.CSSProperties = {
        justifyContent: 'center',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '5px',
        width: '15%',
        margin: 'auto',
        marginBottom: '10px',
    }

    // button components
    const DigitButton: React.FC<{ digit: number; onClick: () => void }> = ({ digit, onClick }) => (
        <motion.div
            key={digit}
            style={buttonStyle}
            whileHover={{ scale: 0.9, backgroundColor: 'black', color: 'white' }}
            transition={{ duration: 0.3 }}
            onClick={() => {
                handleDigitClick(digit);
            }}
        >
            {digit}
        </motion.div>
    );

    const BackspaceButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
        <motion.div
            style={buttonStyle}
            whileHover={{ scale: 0.9, backgroundColor: 'black', color: 'white' }}
            transition={{ duration: 0.3 }}
            onClick={() => {
                onBackspaceClick();
            }}
        >
            BACK
        </motion.div>
    );
    
    const SubmitButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
        <motion.div
            style={buttonStyle}
            whileHover={{ scale: 0.9, backgroundColor: 'black', color: 'white' }}
            transition={{ duration: 0.3 }}
            onClick={() => {
                onSubmitClick();
            }}
        >
            ENTER
        </motion.div>
    );

    // callbacks
    const handleDigitClick = (digit: number) => {
        onDigitClick(digit);
    }

    // display
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px', margin: 'auto', marginTop: '10px' }}>
            <div style={keypadStyle}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                    <DigitButton
                        key={digit}
                        digit={digit}
                        onClick={() => handleDigitClick(digit)}
                    />
                ))}

                <BackspaceButton onClick={onBackspaceClick} />
                <SubmitButton onClick={onSubmitClick} />
            </div>
        </div>
    )
};

export default Keypad;