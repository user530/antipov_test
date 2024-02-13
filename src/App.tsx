import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup/Signup';
import { Catalogue } from './pages/Catalogue/Catagolue';
import { Person } from './pages/Person/Person';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/catalogue' element={<Catalogue />} />
        <Route path='/person' element={<Person />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
