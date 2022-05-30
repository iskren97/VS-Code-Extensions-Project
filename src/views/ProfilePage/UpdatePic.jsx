import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from '../../config/firebase-config';

import AppContext from '../../providers/AppContext';

import { Grid, Modal, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';

import {
  getUserData,
  getUserByHandle,
  updateUserProfilePicture,
} from '../../services/users.service';
import AlertUser from '../Register/AlertUser';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '20px',
};

const UpdatePic = ({ userProfile, setUserProfile }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const { user, userData, setContext } = useContext(AppContext);

  const [isProfileOwner, setIsProfileOwner] = useState(false);

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
  }, [userData?.uid, username, userData]);

  const uploadPicture = (e) => {
    e.preventDefault();

    const file = e.target[0]?.files?.[0];

    if (!file) {
      setError(true);
      setErrorMsg('Please select a file!');
      setMsgType('error');
    }

    if (file['type'].split('/')[0] !== 'image') {
      setError(true);
      setErrorMsg('Please upload an image!');
      setMsgType('error');

      return;
    }

    const picture = storageRef(storage, `images/${userData.username}/avatar`);

    uploadBytes(picture, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((url) => {
          return updateUserProfilePicture(userData.username, url).then(() => {
            setContext({
              user,
              userData: {
                ...userData,
                avatarUrl: url,
              },
            });

            setError(true);
            setErrorMsg(`Image successfully uploaded!`);
            setMsgType('success');

            setUserProfile({ ...userData, avatarUrl: url });
            handleClose();
          });
        });
      })
      .catch(console.error);
  };

  return (
    <>
      <div style={{ textAlign: 'right' }}>
        {isProfileOwner ? (
          <a
            href="#/"
            onClick={handleOpen}
            style={{
              fontSize: '13.5px',
              textTransform: 'none',
            }}
          >
            <Tooltip title="Change profile picture" placement="right-end">
              <EditIcon sx={{ cursor: 'pointer', color: 'black' }} />
            </Tooltip>
          </a>
        ) : null}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: 'flex',
                top: '-50px',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3>Upload a picture</h3>

              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onClick={handleClose}
              >
                X
              </button>
            </div>

            <form onSubmit={uploadPicture} className="upload-pic-form">
              <Grid
                container
                direction="column"
                spacing={0}
                sx={{ textAlign: 'center', alignItems: 'center' }}
              >
                <Grid>
                  <input
                    type="file"
                    accept="image/*"
                    className="custom-file-upload"
                  />
                </Grid>

                <Grid>
                  <button className="upload-pic-btn" type="submit">
                    Click to upload
                  </button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>

      {error ? (
        <AlertUser
          msg={errorMsg}
          type={msgType}
          err={error}
          setErr={setError}
        />
      ) : null}
    </>
  );
};

export default UpdatePic;
