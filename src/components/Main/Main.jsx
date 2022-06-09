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
  const [newAddons, setNewAddons] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [popular, setPopular] = useState([]);

  const setDate = (date) => {
    const newDate = new Date(date);

    return newDate;
  };

  useEffect(() => {
    getAllExtensions().then((resp) =>
      setNewAddons(
        resp
          .slice(-6)
          .map((ext) => ({ ...ext, date: setDate(ext.createdOn) }))
          .sort((a, b) => setDate(b.createdOn) - setDate(a.createdOn))
      )
    );
  }, []);

  useEffect(() => {
    getAllExtensions().then((resp) => setRecommended(resp.slice(4, 10)));
  }, []);

  useEffect(() => {
    getAllExtensions().then((resp) =>
      setPopular(
        resp
          .map((ext) => ({ ...ext, popularity: ext.downloads?.length || 0 }))
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6)
      )
    );
  }, []);

  return (
    <>
      <div className="glass-container">
        <Header />
        <div style={{ marginTop: '8em' }}>
          <Intro />

          <Categories />

          <Container
            maxWidth="xl"
            sx={{
              height: 'auto',
              marginTop: '50px',
              paddingBottom: '50px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px',
            }}
          >
            <Section category={'New'} />

            <Divider
              sx={{
                marginBottom: '30px',

                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />

            <Grid container direction="row" spacing={2} className="item-grid">
              {newAddons.map((ext) => {
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
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px',
            }}
          >
            <Section category={'Recommended'} />

            <Divider
              sx={{
                marginBottom: '30px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />

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
              marginBottom: '50px',
              paddingBottom: '50px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Section category={'Most Popular'} />

            <Divider
              sx={{
                marginBottom: '30px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />

            <Grid container direction="row" spacing={2} className="item-grid">
              {popular.map((ext) => {
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
        </div>
      </div>
    </>
  );
};

export default Main;
