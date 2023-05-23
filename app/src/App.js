import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
