import React, { useEffect } from 'react';
import AppContext from '../../providers/AppContext';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import './ProfilePage.css';

import Header from '../../components/Header/Header';
import Items from '../../components/Main/Item/Item';
import UpdatePic from './UpdatePic';

import { Divider, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import defaultAvatar from '../../assets/avatar.jpg';
import {
  getAllExtensions,
  getExtensionById,
  getExtensionDownloads,
} from '../../services/extensions.service';

import { getUserByHandle } from '../../services/users.service';

import Info from './Info/Info'
import AdminPanel from './AdminPanel/AdminPanel';


const ProfilePage = () => {
  const [activeView, setActiveView] = useState('Info');
  const [userProfile, setUserProfile] = useState('');
  const [userUploads, setUserUploads] = useState([]);


  const [userDownloads, setUserDownloads] = useState([]);

  const { userData } = useContext(AppContext);

  const { username } = useParams();

  useEffect(() => {
    getAllExtensions().then((ext) =>
      setUserUploads(ext.filter((ext) => ext.author === username))
    );
  }, [username]);

useEffect(() => {
  getUserByHandle(username).then((user) => {
    setUserProfile(user.val());
  });
  
},[])

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


  return (
    <>
      <Header />

      <div style={{ marginTop: '10em' }}>
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

          <Divider sx={{ marginLeft: '2em', marginRight: '2em' }} />

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
                  src={userProfile.avatarUrl ? userProfile.avatarUrl : defaultAvatar}
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

                <Button
                  onClick={() => setActiveView('Inbox')}
                  variant="contained"
                >
                  Inbox
                </Button>

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
                </Button>) : null
                    }
                
              </Grid>
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid
              container
              direction="column"
              sx={{ gap: '1em', width: '65vw', alignItems: 'flex-start' }}
            >
              <h1>{activeView}</h1>
              <Divider flexItem />

              <Grid container direction="row" spacing={2} className="item-grid">
                {activeView === 'Uploads'
                  ? userUploads.map((upload) => {
                      return (
                        <Grid key={upload.id} item>
                          <Items
                            key={upload.id}
                            name={upload.title}
                            logo={upload.logo}
                            author={upload.author}
                            category={upload.category}
                            rating={3.8}
                            downloadLink={upload.downloadLink}
                            extId={upload.id}
                          />
                        </Grid>
                      );
                    })
                  : null}

                {activeView === 'Info' ? (
                  <Info userProfile={userProfile} />
                ) : null}

                {activeView === 'Downloads'
                  ? userDownloads.map((download) => {
                      return (
                        <Grid key={download.id} item>
                          <Items
                            key={download.id}
                            name={download.title}
                            logo={download.logo}
                            author={download.author}
                            category={download.category}
                            rating={3.8}
                            downloadLink={download.downloadLink}
                            extId={download.id}
                          />
                        </Grid>
                      );
                    })
                  : null}


                  {activeView === 'AdminPanel' ? <AdminPanel/> : null }

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProfilePage;
