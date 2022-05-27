import React from 'react';

import Header from '../../components/Header/Header';

import { Container, Grid } from '@mui/material';
import Items from '../../components/Main/Item/Item';
import Search from '../../components/Search/Search';
import { useParams } from 'react-router';

const Category = () => {
  const { category } = useParams();

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

  return (
    <>
      <Header />

      <div style={{ textAlign: 'center', marginTop: '170px' }}>
        <h1>{categoryName}</h1>
        <p
          style={{
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '400',
            margin: '0px',
            textAlign: 'center',
            marginBottom: '0.67em',
          }}
        >
          Browse Extensions
        </p>
        <h2>335 Results</h2>
      </div>

      <Search />

      <Container
        maxWidth="xl"
        sx={{
          height: 'auto',
          width: 'auto',
          marginTop: '50px',
          marginBottom: '50px',
          paddingBottom: '50px',
          paddingTop: '50px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
          background: 'white',
          borderRadius: '7px',
        }}
      >
        <Grid container direction="row" spacing={2} className="item-grid">
          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>

          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>
          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>
          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>
          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>
          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>
          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>

          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>

          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>

          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>

          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>

          <Grid item>
            <Items
              name={'Prettier'}
              logo={'https://prettier.io/icon.png'}
              author={'Prettier Inc'}
              category={'Code formatter'}
              rating={3.8}
              downloadLink={
                'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'
              }
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Category;
