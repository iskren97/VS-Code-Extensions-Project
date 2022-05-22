import React from 'react';
import './Header.css';

import SearchIcon from '@mui/icons-material/Search';
import { Container, Grid, Divider } from '@mui/material';
import ListCategory from './ListCategory';

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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '250px 50px',
          textAlign: 'center',
          alignItems: 'center',
          columnGap: '0',
          justifyContent: 'center',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '40px',
              fontStyle: 'normal',
              fontWeight: '600',
            }}
          >
            Extensions
          </h1>
        </div>

        <div>
          <img
            src="https://icons-for-free.com/download-icon-extension-1324760527053491862_512.png"
            alt=""
            srcset=""
            className="general-img"
          />
        </div>
      </div>

      <h2
        style={{
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: '400',
          margin: '0',
          textAlign: 'center',
        }}
      >
        Explore powerful tools and features to customize Visual Studio Code
      </h2>

      <div className="search-container">
        <div>
          <input type="search" id="search" placeholder="Find extensions" />
        </div>

        <div>
          <SearchIcon fontSize={'large'} cursor={'pointer'} />
        </div>
      </div>

      <Container
        maxWidth="xl"
        sx={{
          height: 'auto',
          marginTop: '50px',
          paddingBottom: '55px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
          background: 'white',
          borderRadius: '20px',
        }}
      >
        <div className="extensions-category">
          <h3>Categories</h3>
        </div>

        <Divider sx={{ marginBottom: '30px' }} />

        <Grid container direction="row" spacing={2} className="item-grid">
          <Grid item>
            <ListCategory name={'Code Formatters'} bgColor={'#008000'} />
          </Grid>

          <Grid item>
            <ListCategory name={'Linters'} bgColor={'#ff8243'} />
          </Grid>

          <Grid item>
            <ListCategory name={'Appearance'} bgColor={'skyblue'} />
          </Grid>

          <Grid item>
            <ListCategory name={'Themes'} bgColor={'#fdc0d1'} />
          </Grid>

          <Grid item>
            <ListCategory name={'Snippets'} bgColor={'#9400D3'} />
          </Grid>

          <Grid item>
            <ListCategory name={'Programming Languages'} bgColor={'#ffd700'} />
          </Grid>

          <Grid item>
            <ListCategory name={'Azure'} bgColor={'blue'} />
          </Grid>

          <Grid item>
            <ListCategory name={'Data Science'} bgColor={'#808080'} />
          </Grid>

          <Grid item>
            <ListCategory name={'Debuggers'} bgColor={'black'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Header;
