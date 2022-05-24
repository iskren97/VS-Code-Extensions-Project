import React from 'react';
import './Header.css';

import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <>
      <Grid className="header-container" container>
        <Grid item>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr',
              columnGap: '50px',
              alignItems: 'center',
              justifyContent: 'center',
              contentAlign: 'center',
              marginTop: '1em',
              marginBottom: '1em',
            }}
          >
            <div>
              <img
                src="https://www.elegantthemes.com/blog/wp-content/uploads/2019/01/000-VS-Code.png"
                style={{
                  width: '120px',
                  objectFit: 'contain',
                }}
                alt="img"
              ></img>
            </div>

            <div>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}
              >
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '25px',
                    color: 'rgba(0,122,205,255)',
                  }}
                >
                  V
                </span>
                isual{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '25px',
                    color: 'rgba(0,122,205,255)',
                  }}
                >
                  S
                </span>
                tudio{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '25px',
                    color: 'rgba(0,122,205,255)',
                  }}
                >
                  Code
                </span>{' '}
                <br />
                <span
                  style={{
                    fontSize: '30px',
                    fontWeight: 'bolder',
                    textTransform: 'uppercase',
                  }}
                >
                  extensions
                </span>{' '}
                <span> </span>
                <span
                  style={{
                    fontSize: '25px',
                  }}
                >
                  Marketplace
                </span>
              </h2>
            </div>
          </div>
        </Grid>

        <div className="header-buttons-container">
          <NavLink to="/register">
            <Button
              variant="contained"
              startIcon={<AccountCircleIcon />}
              sx={{ textDecoration: 'none' }}
            >
              {' '}
              Sign Up{' '}
            </Button>
          </NavLink>

          <NavLink to="/login">
            <Button variant="contained" startIcon={<LoginIcon />}>
              {' '}
              Sign In{' '}
            </Button>
          </NavLink>
        </div>
      </Grid>
    </>
  );
};

export default Header;
