import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup/Signup';
import { Catalogue } from './pages/Catalogue/Catagolue';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/catalogue' element={<Catalogue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
