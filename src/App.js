import './App.css';
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import { getUserData } from './services/users.service';
import AppContext from './providers/AppContext';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ScrollTop from './components/ScrollTop/ScrollTop';

import SingleExtension from './views/SingleExtensionPage/SingleExtension';
import ProfilePage from './views/ProfilePage/ProfilePage';
import Register from './views/Register/Register';
import AlertUser from './views/Register/AlertUser';
import Login from './views/Login/Login';
import Upload from './views/Upload/Upload';

const App = () => {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error('Something went wrong!');
        }

        setAppState({
          user,
          userData: snapshot.val()[Object.keys(snapshot.val())[0]],
        });
      })
      // eslint-disable-next-line no-undef
      .catch((e) => alert(e.message));
  }, [user]);


  


  return (
    <div>
    <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>

        {/* <Main /> */}
        {/* <SingleExtension /> */}
        {/* <Register /> */}
        {/* <ProfilePage /> */}

        <ScrollTop showBelow={250} />
      </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
};

export default App;
