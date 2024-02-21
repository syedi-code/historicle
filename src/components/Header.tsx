import React from 'react';

interface HeaderProps {
    title: string;
}

const titleStyle: React.CSSProperties = {
    fontFamily: "Playfair Display, serif",
    fontWeight: '700',
    fontSize: '48px',
    marginBottom: '0px'
}

const subtitleStyle: React.CSSProperties = {
    fontFamily: "DM Sans, sans-serif",
    fontSize: '24px',
    marginTop: '10px',
    marginBottom: '10px'
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header>
            <h1 style={titleStyle}>{title}</h1>

            <div>
                <p style={subtitleStyle}>
                    In this year...
                </p>
            </div>
        </header>
    );
};

export default Header;