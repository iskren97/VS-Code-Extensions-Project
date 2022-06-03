import React from 'react';
import { useNavigate } from 'react-router';

import './Users.css';

import { Button, Grid } from '@mui/material';

import defaultPic from '../../../../assets/avatar.jpg';

const Users = ({ allUsers, search }) => {
  const navigate = useNavigate();

  return (
    <>
      <br />

      {allUsers.map((user) => {
        if (search) {
          return user.username.toLowerCase().includes(search) ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="users-container"
                sx={{
                  margin: '0.25em',
                  padding: '0.5em',
                  backgroundColor: 'lightGray',
                  borderRadius: '0.5em',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '1em',
                    flex: '1',
                    justifyContent: 'space-between',
                    marginRight: '1em',
                  }}
                >
                  <Grid item>
                    <img
                      src={user.avatarUrl ?? defaultPic}
                      alt="userPic"
                      width="35rem"
                      height="35rem"
                      style={{ objectFit: 'cover' }}
                    />
                  </Grid>

                  <Grid item>
                    Username: <span>{user.username}</span>{' '}
                  </Grid>

                  <Grid item>
                    Phone: <span>{user.phoneNumber}</span>
                  </Grid>

                  <Grid item>
                    Email: <span>{user.email}</span>
                  </Grid>
                </div>

                <Grid
                  key={user.uid}
                  item
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '0.25em',
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/profile/${user.username}`)}
                  >
                    View
                  </Button>

                  <Button
                    variant="contained"
                    color="warning"
                    // disabled={ext.status === 'rejected'}
                    onClick={() => {
                      // setExtensionStatus(ext.id, 'rejected');
                      // setAllExtensions(
                      //   allExtensions.map((extension) => {
                      //     if (extension.id === ext.id) {
                      //       extension.status = 'rejected';
                      //     }
                      //     return extension;
                      //   })
                      // );
                    }}
                  >
                    Block
                  </Button>
                </Grid>
              </Grid>
            </div>
          ) : null;
        }

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="users-container"
              sx={{
                margin: '0.25em',
                padding: '0.5em',
                backgroundColor: 'lightGray',
                borderRadius: '0.5em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '1em',
                  flex: '1',
                  justifyContent: 'space-between',
                  marginRight: '1em',
                }}
              >
                <Grid item>
                  <img
                    src={user.avatarUrl ?? defaultPic}
                    alt="userPic"
                    width="35rem"
                    height="35rem"
                    style={{ objectFit: 'cover' }}
                  />
                </Grid>

                <Grid item>
                  Username: <span>{user.username}</span>{' '}
                </Grid>

                <Grid item>
                  Phone: <span>{user.phoneNumber}</span>
                </Grid>

                <Grid item>
                  Email: <span>{user.email}</span>
                </Grid>
              </div>

              <Grid
                key={user.uid}
                item
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.25em',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/profile/${user.username}`)}
                >
                  View
                </Button>

                <Button
                  variant="contained"
                  color="warning"
                  // disabled={ext.status === 'rejected'}
                  onClick={() => {
                    // setExtensionStatus(ext.id, 'rejected');
                    // setAllExtensions(
                    //   allExtensions.map((extension) => {
                    //     if (extension.id === ext.id) {
                    //       extension.status = 'rejected';
                    //     }
                    //     return extension;
                    //   })
                    // );
                  }}
                >
                  Block
                </Button>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </>
  );
};

export default Users;
