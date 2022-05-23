import React from 'react';
import './Header.css';

import { Grid } from '@mui/material';

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
            }}
          >
            <div>
              <img
                src="https://www.elegantthemes.com/blog/wp-content/uploads/2019/01/000-VS-Code.png"
                style={{
                  width: '120px',
                  height: '120px',
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
                </span>
                <br />
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

        <Grid item>
          <h3>Sign Up</h3>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
