import React from 'react';
import './Categories.css';

import { Container, Divider, Grid } from '@mui/material';
import ListCategory from './ListCategory';
import { NavLink } from 'react-router-dom';

const Categories = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          height: 'auto',
          marginTop: '50px',
          paddingBottom: '55px',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '16px',
        }}
      >
        <div className="extensions-category">
          <h3>Categories</h3>
        </div>

        <Divider
          sx={{
            marginBottom: '30px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        />

        <Grid container direction="row" spacing={2} className="item-grid">
          <Grid item>
            <NavLink to="/category/:code_formatters">
              <ListCategory name={'Code Formatters'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:linters">
              <ListCategory name={'Linters'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:themes">
              <ListCategory name={'Themes'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:snippets">
              <ListCategory name={'Snippets'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:programming_languages">
              <ListCategory name={'Programming Languages'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:azure">
              <ListCategory name={'Azure'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:data_science">
              <ListCategory name={'Data Science'} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to="/category/:debuggers">
              <ListCategory name={'Debuggers'} />
            </NavLink>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Categories;
