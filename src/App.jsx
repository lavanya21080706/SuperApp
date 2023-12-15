import React from 'react';
import './App.css';
import Form from './Form.jsx';
import Category from './Category.jsx';
import CountdownTimer from './CountdownTimer';
import Profile from './profile.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Form />} />
        <Route path="/categoryPage" element={<Category />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/count" element={<CountdownTimer />} />
      </Routes>
    </Router>
  );
}

export default App;

