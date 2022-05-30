import React, { useEffect, useState } from 'react';
import './Main.css';

import Items from './Item/Item';

import { Container, Divider, Grid } from '@mui/material';
import Section from './Section/Section';
import Intro from '../Intro/Intro';
import Categories from '../Categories/Categories';
import Header from '../Header/Header';

import { getAllExtensions } from '../../services/extensions.service';

const Main = () => {
  const [recommended, setRecommended] = useState([]);
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    getAllExtensions().then((resp) => setRecommended(resp.slice(6, 12)));
  }, []);

  useEffect(() => {
    getAllExtensions().then((resp) => setPopular(resp.slice(0, 6)));
  }, []);

  return (
    <>
      <Header />
      <div style={{ marginTop: '10em' }}>
        <Intro />

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
            {recommended.map((ext) => {
              return (
                <Grid key={ext.id} item>
                  <Items
                    key={ext.id}
                    name={ext.title}
                    logo={ext.logo}
                    author={ext.author}
                    category={ext.category}
                    rating={3.8}
                    downloadLink={ext.downloadLink}
                    extId={ext.id}
                  />
                </Grid>
              );
            })}
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
            {popular.map((ext) => {
              return (
                <Grid item>
                  <Items
                    key={ext.id}
                    name={ext.title}
                    logo={ext.logo}
                    author={ext.author}
                    category={ext.category}
                    rating={3.8}
                    downloadLink={ext.downloadLink}
                    extId={ext.id}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Main;
