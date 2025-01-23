import React from 'react';

interface FooterProps {
    currentPage: string; // Prop do przekazania nazwy strony
}

const Footer: React.FC<FooterProps> = ({ currentPage }) => {
    return (
        <footer className="footer">
            <p>Blog | {currentPage}</p>
        </footer>
    );
};

export default Footer;