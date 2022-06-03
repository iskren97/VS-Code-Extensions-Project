import React, { useEffect } from 'react';
import AppContext from '../../../providers/AppContext';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Divider, Grid } from '@mui/material';

import Button from '@mui/material/Button';

import './AdminPanel.css';

import { getAllExtensions } from '../../../services/extensions.service';

import Extensions from './Extensions/Extensions';
import Users from './Users/Users';

const AdminPanel = () => {
  const [allExtensions, setAllExtensions] = useState([]);
  const [extensionsView, setExtensionsView] = useState(true);
  const [usersView, setUsersView] = useState(false);

  useEffect(() => {
    getAllExtensions().then((ext) => setAllExtensions(ext));
  }, []);

  const setDate = (date) => {
    const newDate = new Date(date);

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    };

    return newDate.toLocaleString('en-US', options);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
            margin: '1em',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setExtensionsView(true);
              setUsersView(false);
            }}
          >
            Extensions{' '}
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setExtensionsView(false);
              setUsersView(true);
            }}
          >
            Users{' '}
          </Button>
        </div>

        <Divider sx={{ marginLeft: '2em', marginRight: '2em' }} />

        {extensionsView ? (
          <Extensions
            allExtensions={allExtensions}
            setAllExtensions={setAllExtensions}
            setDate={setDate}
            extensionsView={extensionsView}
          />
        ) : null}

        {usersView ? <Users /> : null}
      </Grid>
    </>
  );
};

export default AdminPanel;
