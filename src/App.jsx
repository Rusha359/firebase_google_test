import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Chat } from './components/Chat';
import { Login } from './components/Login';
import { Context } from './index';
import './App.css';

import { NavBar } from './components/NavBar';
import Loader from './components/Loader';

function App() {
  // const navigate = useNavigate();
  const { auth } = useContext(Context);
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {user ? (
          <>
            <Route key={'/chat'} path="/chat" element={<Chat />} />
            <Route path="/login" element={<Navigate replace to="/chat" />} />
          </>
        ) : (
          <>
            <Route key={'/login'} path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
