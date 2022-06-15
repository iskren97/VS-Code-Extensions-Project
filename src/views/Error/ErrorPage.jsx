import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Error.css';

import { Divider, Grid } from '@mui/material';

import DisplayErr from './DisplayErr';

import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ErrorPage = () => {
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    fetch(
      'https://api.giphy.com/v1/gifs/search?api_key=L6yFCUcFk8wlKFtQK3IemTQQd7JLiHv5&q=error&limit=6&offset=0&rating=g&lang=en'
    )
      .then((resp) => resp.json())
      .then(({ data }) => setErrors(data));
  }, []);

  return (
    <>
      <div
        className="error-container"
        style={{
          paddingLeft: '70px',
          paddingRight: '70px',
          paddingTop: '50px'
        }}>
        <NavLink to="/home" style={{ all: 'unset', cursor: 'pointer' }}>
          <Tooltip placement="right-end" title="Back to Home">
            <ArrowBackIcon
              fontSize={'medium'}
              style={{ position: 'absolute', top: '5px', left: '5px' }}
            />
          </Tooltip>
        </NavLink>

        <h1 style={{ textAlign: 'center', marginTop: '0' }}>Oops.. Page not found!</h1>

        <Divider
          sx={{
            marginBottom: '30px',

            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        />

        <Grid container direction="row" spacing={2}>
          {errors.map((err) => {
            return (
              <Grid key={err.id} item>
                <DisplayErr title={'404 Page not found'} img={err.images.original.url} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default ErrorPage;
