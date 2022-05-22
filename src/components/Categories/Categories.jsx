import React from 'react';
import './Categories.css';

import { Container, Divider, Grid } from '@mui/material';
import ListCategory from './ListCategory';

const Categories = () => {
  return (
    <div>
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
    </div>
  );
};

export default Categories;
