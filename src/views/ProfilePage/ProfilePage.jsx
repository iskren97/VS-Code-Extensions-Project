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
  getExtensionDownloads
} from '../../services/extensions.service';

import { getUserByHandle, getUserData } from '../../services/users.service';

import Info from './Info/Info';
import AdminPanel from './AdminPanel/AdminPanel';
import Downloads from './Downloads/Downloads';
import Uploads from './Uploads/Uploads';
import Notifications from './Notifications/Notifications';

import { tabStyle, profileButton } from '../../styles/styles.js';

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
      setUserUploads(
        ext
          .filter((ext) => ext.author === username)
          .sort((a, b) => (a.status > b.status ? 1 : b.status > a.status ? -1 : 0))
      )
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
                ? getExtensionById(ext.id).then((extension) => downloadedExtensions.push(extension))
                : null
            );

            setUserDownloads(downloadedExtensions);
          }
        });
      })
    );
  }, [username]);

  return (
    <div className="glass-container">
      <Header />

      <div>
        <Grid
          container
          direction="column"
          sx={{
            height: 'auto',
            background: 'rgba(255, 255, 255, 0.35)',
            flexWrap: 'nowrap',
            paddingBottom: '50px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.25)',
            borderRadius: '20px',
            marginTop: '50px',
            marginBottom: '50px',
            width: 'auto',
            color: 'black'
          }}>
          <h1 style={{ marginLeft: '2em', color: 'white' }}>{username}</h1>

          <Divider
            sx={{
              marginLeft: '2em',
              marginRight: '2em',
              background: 'hsla(210,18%,87%,1)'
            }}
          />

          <Grid
            container
            direction="row"
            sx={{ flexWrap: 'wrap', margin: '3em', width: 'auto', gap: '1em' }}>
            <Grid container direction="column" sx={{ gap: '1em', width: 'auto', maxWidth: '18em' }}>
              <Grid item>
                <img
                  src={userProfile?.avatarUrl ? userProfile?.avatarUrl : defaultAvatar}
                  alt="Profile"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />

                <UpdatePic userProfile={userProfile} setUserProfile={setUserProfile} />
              </Grid>

              <Grid item sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                <Button
                  onClick={() => setActiveView('Info')}
                  variant="contained"
                  sx={profileButton}>
                  Info
                </Button>

                {userData?.uid === userProfile?.uid ? (
                  <Button
                    onClick={() => setActiveView('Notifications')}
                    variant="contained"
                    sx={profileButton}>
                    Notifications
                  </Button>
                ) : null}

                <Button
                  onClick={() => setActiveView('Uploads')}
                  variant="contained"
                  sx={profileButton}>
                  Uploads
                </Button>

                <Button
                  onClick={() => setActiveView('Downloads')}
                  variant="contained"
                  sx={profileButton}>
                  Downloads
                </Button>
                {userData?.role === 'admin' ? (
                  <Button
                    onClick={() => setActiveView('AdminPanel')}
                    variant="contained"
                    sx={profileButton}>
                    Admin Panel
                  </Button>
                ) : null}
              </Grid>
            </Grid>

            <Divider
              orientation={
                window.matchMedia('(max-device-width: 768px)').matches ? 'horizontal' : 'vertical'
              }
              flexItem
              sx={{ background: 'hsla(210,18%,87%,1)' }}
            />

            <Grid container direction="column" sx={tabStyle}>
              <h1 style={{ color: 'white' }}>{activeView}</h1>

              <Divider
                flexItem
                sx={{
                  width: 'auto',
                  marginBottom: '1em',
                  background: 'hsla(210,18%,87%,1)'
                }}
              />

              <Grid container direction="row" spacing={2} className="item-grid">
                {activeView === 'Uploads' ? (
                  <Uploads userUploads={userUploads} isOwner={isProfileOwner} />
                ) : null}

                {activeView === 'Notifications' ? (
                  <Notifications userProfile={userProfile} />
                ) : null}

                {activeView === 'Info' ? <Info userProfile={userProfile} /> : null}

                {activeView === 'Downloads' ? <Downloads userDownloads={userDownloads} /> : null}

                {activeView === 'AdminPanel' ? <AdminPanel /> : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProfilePage;
