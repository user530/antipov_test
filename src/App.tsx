import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup/Signup';
import { Catalogue } from './pages/Catalogue/Catagolue';
import { Person } from './pages/Person/Person';
import { ProtectedRoute } from './features/protected-route/ProtectedRoute';
import { useAppDispatch } from './app/store/useStore';
import { setUserToken } from './features/form/userSlice';

function App() {
  const dispatch = useAppDispatch();

  // Try to load session on app startup
  const token = localStorage.getItem('token');
  dispatch(setUserToken(token));

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Catalogue />
            </ProtectedRoute>
          } />

        <Route
          path='/person/:id'
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
