import React, { useState } from 'react';

interface KeypadProps {
    onDigitClick: (digit: number) => void;
    onBackspaceClick: () => void;
    onSubmitClick: () => void;
    inputValue: string;
}

const Keypad: React.FC<KeypadProps> = ({ onDigitClick, onBackspaceClick, onSubmitClick, inputValue }) => {
    const [lastClicked, setLastClicked] = useState<number | null>(null);

    // button styling
    const buttonStyle: React.CSSProperties = {
        backgroundColor: '#D3D3D3', // Grey color
        borderRadius: '8px', // Rounded corners
        border: 'none', // No border
        padding: '10px', // Padding for larger size
        fontSize: '18px', // Font size
        cursor: 'pointer', // Cursor on hover
        fontWeight: 'bold',
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
    
    const clickedButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: 'black', // Black color when clicked
        color: 'white', // White text when clicked
    };

    // button components
    const DigitButton: React.FC<{ digit: number; onClick: () => void }> = ({ digit, onClick }) => (
        <button style={lastClicked === digit ? clickedButtonStyle : buttonStyle} onClick={onClick}>{digit}</button>
    );

    const BackspaceButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
        <button style={buttonStyle} onClick={onClick}>BACK</button>
    );
    
    const SubmitButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
        <button style={buttonStyle} onClick={onClick}>ENTER</button>
    );

    // callbacks
    const handleDigitClick = (digit: number) => {
        onDigitClick(digit);
        setLastClicked(digit);

        // Reset the style after a short delay
        setTimeout(() => {
            setLastClicked(null);
        }, 300);
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