import React, { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';

import { Container, Divider, Tooltip } from '@mui/material';
import Search from '../../components/Search/Search';
import { useParams } from 'react-router';
import { getAllExtensions } from '../../services/extensions.service';
import SortIcon from '@mui/icons-material/Sort';
import Sort from './Sort';

const Category = () => {
  const { category } = useParams();
  const [extensions, setExtensions] = useState([]);
  const [search, setSearch] = useState('');

  let categoryName = '';
  if (category.includes('_')) {
    categoryName =
      category.charAt(1).toUpperCase() +
      category
        .slice(2)
        .replace('_', ' ')
        .replace(/(^\w{0})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  } else {
    categoryName = category.charAt(1).toUpperCase() + category.slice(2);
  }

  useEffect(() => {
    getAllExtensions().then((resp) =>
      setExtensions(resp.filter((o) => o.category === categoryName))
    );
  }, [categoryName]);

  return (
    <>
      <Header />

      <div style={{ textAlign: 'center', marginTop: '170px' }}>
        <h1>{categoryName}</h1>

        <h2>
          {extensions.length > 0
            ? extensions.length > 1
              ? extensions.length + ' extensions'
              : extensions.length + ' extension'
            : 'no extensions'}{' '}
          found
        </h2>
      </div>

      {extensions.length > 0 ? (
        <div>
          <p
            style={{
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '400',
              margin: '0px',
              textAlign: 'center',
              marginTop: '0.67em',
            }}
          >
            Browse Extensions
          </p>

          <Search setSearch={setSearch} />

          <Container
            maxWidth="xl"
            sx={{
              height: 'auto',
              width: 'auto',
              marginTop: '50px',
              marginBottom: '50px',
              paddingBottom: '50px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
              background: 'white',
              borderRadius: '7px',
            }}
          >
            <br />

            <div style={{ textAlign: 'center' }}>
              <Sort extensions={extensions} search={search} />
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
};

export default Category;
