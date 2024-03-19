import React from 'react';

interface HeaderProps {
    title: string;
}

const titleContainerStyle: React.CSSProperties = {
    marginTop: '50px',
    marginBottom: '25px',
    textAlign: 'center'
}

const titleStyle: React.CSSProperties = {
    fontFamily: "Playfair Display, serif",
    fontWeight: '700',
    fontSize: '48px',
    width: 'max-content',
    textAlign: 'center',
    backgroundColor: '#000000',
    color: '#ffffff',
    paddingLeft: '10px',
    paddingRight: '10px',
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
            <div style={titleContainerStyle}>
                <span style={titleStyle}>{title}</span>
            </div>

            <div>
                <p style={subtitleStyle}>
                    In this year...
                </p>
            </div>
        </header>
    );
};

export default Header;