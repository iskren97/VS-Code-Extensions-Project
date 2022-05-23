import React from 'react';
import { useState, useContext, useEffect } from 'react';
import AppContext from './providers/AppContext';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import { getUserData } from './services/users.service';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import SingleExtension from './components/SingleExtensionPage/SingleExtension';

import ScrollTop from './components/ScrollTop/ScrollTop';
import Register from './views/Register/Register';

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
      <Header />
      {/* <Main /> */}
      <SingleExtension />
      {/* <Register /> */}

      <ScrollTop showBelow={250} />
    </div>
  );
};

export default App;
