import React from 'react';
import './Main.css';

import Items from './Item/Item';

import { Container, Divider, Grid } from '@mui/material';
import Section from './Section/Section';

const Main = () => {
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          height: 'auto',
          marginTop: '50px',
          paddingBottom: '50px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
          background: 'white',
          borderRadius: '20px',
        }}
      >
        <Section category={'Recommended'} />

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

      <Container
        maxWidth="xl"
        sx={{
          height: 'auto',
          marginTop: '50px',
          paddingBottom: '50px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
          background: 'white',
          borderRadius: '20px',
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
  );
};

export default Main;
