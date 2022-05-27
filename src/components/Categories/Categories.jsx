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
            <NavLink to="/category/:code_formatters">
              <ListCategory name={'Code Formatters'} bgColor={'#008000'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:linters">
              <ListCategory name={'Linters'} bgColor={'#ff8243'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:appearance">
              <ListCategory name={'Appearance'} bgColor={'skyblue'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:themes">
              <ListCategory name={'Themes'} bgColor={'#fdc0d1'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:snippets">
              <ListCategory name={'Snippets'} bgColor={'#9400D3'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:programming_languages">
              <ListCategory
                name={'Programming Languages'}
                bgColor={'#ffd700'}
              />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:azure">
              <ListCategory name={'Azure'} bgColor={'blue'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:data_science">
              <ListCategory name={'Data Science'} bgColor={'#808080'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:debuggers">
              <ListCategory name={'Debuggers'} bgColor={'black'} />
            </NavLink>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Categories;
