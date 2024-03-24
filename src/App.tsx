import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup/Signup';
import { Catalogue } from './pages/Catalogue/Catagolue';
import { Person } from './pages/Person/Person';
import { ProtectedRoute } from './features/protected-route/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />

        <Route
          path='/catalogue'
          element={
            <ProtectedRoute>
              <Catalogue />
            </ProtectedRoute>
          } />

        <Route
          path='/person'
          element={
            <ProtectedRoute>
              <Person />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
