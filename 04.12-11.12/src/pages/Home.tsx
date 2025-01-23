import React, { useEffect } from 'react';

interface HomeProps {
    setCurrentPage: (page: string) => void; // Prop do ustawienia nazwy strony
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
    useEffect(() => {
        setCurrentPage('Home'); // Ustaw nazwę strony na "Home"
    }, [setCurrentPage]);

    return (
        <div className="home">
            <h1>Welcome</h1>
            <p>This is the homepage of my blog.</p>
        </div>
    );
};

export default Home;