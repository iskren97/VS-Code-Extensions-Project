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
import ScrollPage from './components/ScrollTop/ScrollPage';

import SingleExtension from './views/SingleExtensionPage/SingleExtension';
import ProfilePage from './views/ProfilePage/ProfilePage';
import Register from './views/Register/Register';
import AlertUser from './views/Register/AlertUser';
import Login from './views/Login/Login';
import Category from './views/SingleCategory/Category';
import Upload from './views/Upload/Upload';
import EditExtension from './views/ProfilePage/EditExtension/EditExtension';
import About from './views/About/About';
import ErrorPage from './views/Error/ErrorPage';
import ResetPass from './views/Login/ResetPassword/ResetPass';

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
          <ScrollPage />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password_reset" element={<ResetPass />} />
            <Route
              path="/category/:category"
              element={<Category key={window.location.pathname} />}
            />
            <Route path="/extensions/:id" element={<SingleExtension />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/extensions/edit/:id" element={<EditExtension />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>

          <ScrollTop showBelow={250} />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
};

export default App;
