import React, { useEffect } from 'react';
import AppContext from '../../providers/AppContext';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import './ProfilePage.css';

import Header from '../../components/Header/Header';
import UpdatePic from './UpdatePic';

import { Divider, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import defaultAvatar from '../../assets/avatar.jpg';
import {
  getAllExtensions,
  getExtensionById,
  getExtensionDownloads,
} from '../../services/extensions.service';

import { getUserByHandle, getUserData } from '../../services/users.service';

import Info from './Info/Info';
import AdminPanel from './AdminPanel/AdminPanel';
import Downloads from './Downloads/Downloads';
import Uploads from './Uploads/Uploads';

const ProfilePage = () => {
  const [activeView, setActiveView] = useState('Info');
  const [userProfile, setUserProfile] = useState('');
  const [userUploads, setUserUploads] = useState([]);

  const [userDownloads, setUserDownloads] = useState([]);

  const [isProfileOwner, setIsProfileOwner] = useState(false);

  const { userData } = useContext(AppContext);

  const { username } = useParams();

  useEffect(() => {
    if (username) {
      getUserByHandle(username).then((res) => {
        setUserProfile(res.val());
      });
    } else {
      getUserData(userData?.uid).then((user) => {
        if (userProfile === '') {
          setUserProfile(user.val()[Object.keys(user.val())[0]]);
        }
      });
    }

    if (!userData) {
      setIsProfileOwner(false);
    } else if (userData?.username === username) {
      setIsProfileOwner(true);
    } else {
      setIsProfileOwner(false);
    }
  }, [username, userData]);

  useEffect(() => {
    getAllExtensions().then((ext) =>
      setUserUploads(ext.filter((ext) => ext.author === username))
    );
  }, [username]);

  useEffect(() => {
    getUserByHandle(username).then((user) => {
      setUserProfile(user.val());
    });
  }, [username]);

  useEffect(() => {
    const downloadedExtensions = [];

    getAllExtensions().then((resp) =>
      resp.map((ext) => {
        return getExtensionDownloads(ext.id).then((resp) => {
          if (resp.length > 0) {
            resp.filter((down) =>
              down.username === username
                ? getExtensionById(ext.id).then((extension) =>
                    downloadedExtensions.push(extension)
                  )
                : null
            );

            setUserDownloads(downloadedExtensions);
          }
        });
      })
    );
  }, [username]);



  const tabStyle = {
   

    '@media (max-width: 1024px)' : {
      gap: '1em', 
      width: '55vw',
      alignItems: 'flex-start'

    },
    '@media (max-width: 768px)' : {
      gap: '1em', 
      width: '40vw',
      alignItems: 'flex-start'

    },
    '@media (max-width: 425px)' : {
      gap: '1em', 
      width: 'auto',
      alignItems: 'flex-start'

    },

    '@media (min-width: 1280px)' : {
      gap: '1em', 
      width: '65vw',
      alignItems: 'flex-start'

    },


  }


  return (
    <>
      <Header />

      <div style={{ marginTop: '13em' }}>
        <Grid
          container
          direction="column"
          sx={{
            height: 'auto',
            flexWrap: 'nowrap',
            marginTop: '50px',
            paddingBottom: '50px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
            background: 'white',
            borderRadius: '20px',
            marginBottom: '50px',
            marginLeft: '1em',
            marginRight: '1em',
            width: 'auto',
          }}
        >
          <h1 style={{ marginLeft: '2em' }}>{username}</h1>

          <Divider sx={{ marginLeft: '2em', marginRight: '2em'}} />

          <Grid
            container
            direction="row"
            sx={{ flexWrap: 'wrap', margin: '3em', width: 'auto', gap: '1em' }}
          >
            <Grid
              container
              direction="column"
              sx={{ gap: '1em', width: 'auto', maxWidth: '18em' }}
            >
              <Grid item>
                <img
                  src={
                    userProfile?.avatarUrl
                      ? userProfile?.avatarUrl
                      : defaultAvatar
                  }
                  alt="Profile"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                />

                <UpdatePic
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                />
              </Grid>

              <Grid
                item
                sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
              >
                <Button
                  onClick={() => setActiveView('Info')}
                  variant="contained"
                >
                  Info
                </Button>

                {userData?.uid === userProfile?.uid ? (
                  <Button
                    onClick={() => setActiveView('Inbox')}
                    variant="contained"
                  >
                    Inbox
                  </Button>
                ) : null}

                <Button
                  onClick={() => setActiveView('Uploads')}
                  variant="contained"
                >
                  Uploads
                </Button>

                <Button
                  onClick={() => setActiveView('Downloads')}
                  variant="contained"
                >
                  Downloads
                </Button>
                {userData?.role === 'admin' ? (
                  <Button
                    onClick={() => setActiveView('AdminPanel')}
                    variant="contained"
                  >
                    Admin Panel
                  </Button>
                ) : null}
              </Grid>
            </Grid>

            <Divider orientation={window.matchMedia('(max-device-width: 768px)').matches ? "horizontal" : 'vertical'} flexItem />

            <Grid
              container
              direction="column"
              sx={tabStyle}
            >
              <h1>{activeView}</h1>

              <Divider flexItem  sx={{width: 'auto', marginBottom: '1em'}}/>

              <Grid container direction="row" spacing={2} className="item-grid">
                {activeView === 'Uploads' ? (
                  <Uploads userUploads={userUploads} isOwner={isProfileOwner} />
                ) : null}

                {activeView === 'Info' ? (
                  <Info userProfile={userProfile} />
                ) : null}

                {activeView === 'Downloads' ? (
                  <Downloads userDownloads={userDownloads} />
                ) : null}

                {activeView === 'AdminPanel' ? <AdminPanel /> : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProfilePage;
