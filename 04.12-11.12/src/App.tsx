import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import Categories from './pages/Categories';
import Header from './components/Header';
import Footer from './components/Footer';
import PostListPage from "./pages/PostListPage";

const App = () => {
    const [currentPage, setCurrentPage] = useState('Home'); // Stan przechowujący nazwę strony

    return (
        <Router>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Home setCurrentPage={setCurrentPage} />}
                />
                <Route
                    path="/post/:id"
                    element={<PostPage setCurrentPage={setCurrentPage} />}
                />
                <Route
                    path="/categories"
                    element={<Categories setCurrentPage={setCurrentPage} />}
                />
                <Route
                    path="/postList"
                    element={<PostListPage   setCurrentPage={setCurrentPage} />}
                />
            </Routes>
            <Footer currentPage={currentPage} />
        </Router>
    );
};

export default App;