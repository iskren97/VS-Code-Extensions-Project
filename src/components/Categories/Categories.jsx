import React from 'react';
import './Categories.css';
import { NavLink } from 'react-router-dom';
import { Container, Divider, Grid } from '@mui/material';
import { containerStyle, dividerStyle } from '../../styles/styles';
import ListCategory from './ListCategory';

const Categories = () => {
  return (
    <>
      <Container maxWidth="xl" sx={containerStyle}>
        <div className="extensions-category">
          <h3>Categories</h3>
        </div>

        <Divider sx={dividerStyle} />

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
