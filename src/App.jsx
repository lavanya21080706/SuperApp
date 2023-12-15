import React from 'react';
import './App.css';
import Form from './Form.jsx';
import Category from './Category.jsx';
import Profile from './profile.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './Movies.jsx';

function App() {
  return (
    <Router basename="/SuperApp">
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

