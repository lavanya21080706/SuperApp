import React from 'react';
import './App.css';
import Form from './Form.jsx';
import Category from './Category.jsx';
import CountdownTimer from './CountdownTimer';
import Profile from './profile.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './Movies.jsx';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Form />} />
        <Route path="/categoryPage" element={<Category />} />
        <Route path="/profile" element={<Profile />} />
        <Route path = '/movies' element={<Movies />} />
      </Routes>
    </Router>
  );
}

export default App;

