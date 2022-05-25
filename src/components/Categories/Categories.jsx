import React from 'react';
import './Categories.css';

import { Container, Divider, Grid } from '@mui/material';
import ListCategory from './ListCategory';
import { NavLink } from 'react-router-dom';

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
          borderRadius: '7px',
        }}
      >
        <div className="extensions-category">
          <h3>Categories</h3>
        </div>

        <Divider sx={{ marginBottom: '30px' }} />

        <Grid container direction="row" spacing={2} className="item-grid">
          <Grid item>
            <NavLink
              style={{ all: 'unset', cursor: 'pointer' }}
              to="/code_formatters"
            >
              <ListCategory name={'Code Formatters'} bgColor={'#008000'} />
            </NavLink>
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
