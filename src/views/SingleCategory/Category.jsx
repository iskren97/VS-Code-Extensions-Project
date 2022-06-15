import React, { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';

import { Container } from '@mui/material';
import Search from '../../components/Search/Search';
import { useParams } from 'react-router';
import { getAllExtensions } from '../../services/extensions.service';
import Sort from './Sort';

const Category = () => {
  const { category } = useParams();
  const [extensions, setExtensions] = useState([]);
  const [popular, setPopular] = useState([]);
  const [search, setSearch] = useState('');

  let categoryName = '';
  if (category.includes('_')) {
    categoryName
      = category.charAt(1).toUpperCase()
      + category
        .slice(2)
        .replace('_', ' ')
        .replace(/(^\w{0})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  } else {
    categoryName = category.charAt(1).toUpperCase() + category.slice(2);
  }

  useEffect(() => {
    getAllExtensions().then((resp) =>
      setExtensions(
        resp.filter((ext) => ext.status === 'approved').filter((o) => o.category === categoryName)
      )
    );
  }, [categoryName]);

  useEffect(() => {
    getAllExtensions().then((resp) =>
      setPopular(
        resp
          .filter((ext) => ext.status === 'approved')
          .map((ext) => ({ ...ext, popularity: ext.downloads?.length || 0 }))
          .sort((a, b) => b.popularity - a.popularity)
      )
    );
  }, [categoryName]);

  return (
    <>
      <div className="glass-container">
        <Header />

        <div style={{ textAlign: 'center', marginTop: '8em' }}>
          <h1>{categoryName}</h1>

          {categoryName !== 'Most Popular' ? (
            <h2>
              {extensions.length > 0
                ? extensions.length > 1
                  ? extensions.length + ' extensions'
                  : extensions.length + ' extension'
                : 'no extensions'}{' '}
              found
            </h2>
          ) : (
            <h2>
              {popular.length > 0
                ? popular.length > 1
                  ? popular.length + ' extensions'
                  : popular.length + ' extension'
                : 'no extensions'}{' '}
              found
            </h2>
          )}
        </div>

        {extensions.length > 0 && categoryName !== 'Most Popular' ? (
          <div>
            <p
              style={{
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '400',
                margin: '0px',
                textAlign: 'center',
                marginTop: '0.67em'
              }}>
              Browse Extensions
            </p>

            <br />
            <br />

            <Search setSearch={setSearch} />

            <Container
              maxWidth="xl"
              sx={{
                height: 'auto',
                width: 'auto',
                marginTop: '50px',
                marginBottom: '50px',
                paddingBottom: '50px',

                background: 'rgba(255, 255, 255, 0.2)',

                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px'
              }}>
              <br />

              <div style={{ textAlign: 'center' }}>
                <Sort extensions={extensions} search={search} />
              </div>
            </Container>
          </div>
        ) : categoryName === 'Most Popular' ? (
          <div>
            <p
              style={{
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '400',
                margin: '0px',
                textAlign: 'center',
                marginTop: '0.67em'
              }}>
              Browse Extensions
            </p>

            <br />
            <br />

            <Search setSearch={setSearch} />

            <Container
              maxWidth="xl"
              sx={{
                height: 'auto',
                width: 'auto',
                marginTop: '50px',
                marginBottom: '50px',
                paddingBottom: '50px',

                background: 'rgba(255, 255, 255, 0.2)',

                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px'
              }}>
              <br />

              <div style={{ textAlign: 'center' }}>
                <Sort extensions={popular} search={search} />
              </div>
            </Container>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Category;
