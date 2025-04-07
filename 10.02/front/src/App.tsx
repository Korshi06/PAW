import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsList from './PostsList';
import PostDetail from './PostDetail';
import './App.css';

const App: React.FC = () => {
  return (
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
