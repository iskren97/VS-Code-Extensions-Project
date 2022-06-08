import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, Grid } from '@mui/material';
import { updateUserRole } from '../../../../services/users.service';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const DisplayUser = ({
  username,
  email,
  phoneNumber,
  uid,
  avatar,
  role,
  allUsers,
  setUsers,
}) => {
  const navigate = useNavigate();

  const [isUserBlocked, setIsUserBlocked] = useState(role === 'blocked');

  const handleBlockUser = () => {
    if (isUserBlocked) {
      updateUserRole(username, 'user').then(() => {
        setIsUserBlocked(false);
      });
    } else {
      updateUserRole(username, 'blocked').then(() => {
        setIsUserBlocked(true);
      });
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-around"
        className="users-container"
        sx={{
          margin: '0.45em',
          padding: '0.5em',
          backgroundColor: 'lightGray',
          borderRadius: '0.5em',
        }}
      >
        <Grid item>
          <img
            src={avatar}
            alt="userPic"
            width="35rem"
            height="35rem"
            style={{ objectFit: 'cover', marginRight: '55px' }}
          />
        </Grid>

        <Grid item xs>
          <Grid container direction="row" spacing={1}>
            <Grid item>Username:</Grid>
            <Grid item>
              <span>{username}</span>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid container direction="row" spacing={1}>
            <Grid item>Phone:</Grid>
            <Grid item>
              <span>{phoneNumber}</span>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid container direction="row" spacing={1}>
            <Grid item>Email:</Grid>
            <Grid item>
              <span>{email}</span>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.55em',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/profile/${username}`)}
          >
            View
          </Button>

          {role !== 'blocked' ? (
            role !== 'admin' ? (
              <Button
                variant="contained"
                color="error"
                disabled={role === 'blocked'}
                onClick={() => {
                  handleBlockUser();
                  const blocked = allUsers.find((user) => user.uid === uid);
                  blocked.role = 'blocked';

                  setUsers((allUsers) =>
                    [...allUsers, blocked].filter(
                      (user, index) => allUsers.indexOf(user) === index
                    )
                  );
                }}
              >
                Block
              </Button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ fontWeight: 'bold', fontSize: '19.5px' }}>Admin</p>

                <AdminPanelSettingsIcon color="success" />
              </div>
            )
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleBlockUser();
                const blocked = allUsers.find((user) => user.uid === uid);
                blocked.role = 'user';

                setUsers((allUsers) =>
                  [...allUsers, blocked].filter(
                    (user, index) => allUsers.indexOf(user) === index
                  )
                );
              }}
            >
              Unblock
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DisplayUser;
