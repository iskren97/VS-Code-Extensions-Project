import React from 'react';
import './Main.css';

import Items from './Item/Item';

import { Container, Divider, Grid } from '@mui/material';
import Section from './Section/Section';
import Intro from '../Intro/Intro';
import Search from '../Search/Search';
import Categories from '../Categories/Categories';
import Header from '../Header/Header';

const Main = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '10em' }}>
        <Intro />

        <Search />

        <Categories />

        <Container
          maxWidth="xl"
          sx={{
            height: 'auto',
            marginTop: '50px',
            paddingBottom: '50px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
            background: 'white',
            borderRadius: '7px',
          }}
        >
          <Section category={'Recommended'} />

          <Divider sx={{ marginBottom: '30px' }} />

          <Grid container direction="row" spacing={2} className="item-grid">
            <Grid item>
              <Items
                name={'Prettier'}
                logo={'https://prettier.io/icon.png'}
                author={'Prettier Inc'}
                category={'Code formatter'}
                rating={3.8}
                downloadLink={
                  'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
                }
              />
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>
          </Grid>
        </Container>

        <Container
          maxWidth="xl"
          sx={{
            height: 'auto',
            marginTop: '50px',
            paddingBottom: '50px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
            background: 'white',
            borderRadius: '7px',
          }}
        >
          <Section category={'Most Popular'} />

          <Divider sx={{ marginBottom: '30px' }} />

          <Grid container direction="row" spacing={2} className="item-grid">
            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Main;
