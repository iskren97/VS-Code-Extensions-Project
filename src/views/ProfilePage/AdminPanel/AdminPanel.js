import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

import { Divider, Grid } from '@mui/material';
import Button from '@mui/material/Button';

import { getAllExtensions } from '../../../services/extensions.service';
import { getAllUsers } from '../../../services/users.service';

import Extensions from './Extensions/Extensions';
import Users from './Users/Users';
import Search from '../../../components/Search/Search';
import Legend from '../StatusLegend/Legend';

const AdminPanel = () => {
  const [allExtensions, setAllExtensions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [extensionsView, setExtensionsView] = useState(true);
  const [usersView, setUsersView] = useState(false);

  const [search, setSearch] = useState('');

  const [extBgColor, setExtBgColor] = useState('');
  const [usersBgColor, setUsersBgColor] = useState('transparent');

  useEffect(() => {
    getAllExtensions().then((ext) => setAllExtensions(ext));
  }, []);

  useEffect(() => {
    getAllUsers().then((resp) => setAllUsers(Object.values(resp.val())));
  }, []);

  const setDate = (date) => {
    const newDate = new Date(date);

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    return newDate.toLocaleString('en-US', options);
  };

  return (
    <>
      <Grid item sx={{ marginLeft: '0.5em' }}>
        <Grid
          container
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center' }}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textDecoration: 'none',
                background: `${extBgColor}`,
                color: 'white',
                fontWeight: 'bold',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
              }}
              onClick={() => {
                setExtensionsView(true);
                setUsersView(false);
                setExtBgColor('#1976d2');
                setUsersBgColor('transparent');
              }}
            >
              Extensions{' '}
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textDecoration: 'none',
                background: `${usersBgColor}`,
                color: 'white',
                fontWeight: 'bold',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
              }}
              onClick={() => {
                setExtensionsView(false);
                setUsersView(true);
                setUsersBgColor('#1976d2');
                setExtBgColor('transparent');
              }}
            >
              Users{' '}
            </Button>
          </Grid>

          <Grid item>
            {extensionsView ? <Search setSearch={setSearch} /> : null}

            {usersView ? (
              <Search
                setSearch={setSearch}
                searchType={'search username, email ...'}
              />
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <Divider
              sx={{
                marginTop: '18px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
          </Grid>
        </Grid>

        <br />

        <Grid container direction="row" spacing={2}>
          {extensionsView ? (
            <Grid item xs={12}>
              <Legend />

              <Extensions
                extensions={allExtensions}
                setAllExtensions={setAllExtensions}
                setDate={setDate}
                search={search}
              />
            </Grid>
          ) : null}

          <Grid item xs={12}>
            {usersView ? (
              <Users
                allUsers={allUsers}
                setAllUsers={setAllUsers}
                search={search}
              />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminPanel;
