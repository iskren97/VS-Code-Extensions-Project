import React from 'react';

import { Container, Grid } from '@mui/material';

const DisplayErr = ({ img, title }) => {
  return (
    <Container
      className="profile-container"
      maxWidth="xs"
      sx={{
        width: 200,
        height: 'auto',
        paddingBottom: '16px',
        paddingTop: '16px',

        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.2)',
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item sx={{ textAlign: 'center' }}>
          <img
            src={img}
            style={{ width: '160px', height: '160px', objectFit: 'cover' }}
            alt="profile-pic"
          />
        </Grid>

        <Grid item sx={{ textAlign: 'center' }}>
          <h3>{title}</h3>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DisplayErr;
