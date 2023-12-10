import React from 'react';
import './App.css';
import Form from './Form.jsx';
import Category from './Category.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Form />} />
        <Route path="/categoryPage" element={<Category />} />
        {/* <Route path = "/countdown" element={<Count />} /> */}
      </Routes>
    </Router>

  );
}

export default App;

