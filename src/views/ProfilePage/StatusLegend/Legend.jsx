import { Grid } from '@mui/material';
import React from 'react';

const Legend = () => {
  return (
    <>
      <Grid container direction="row" justifyContent="center" spacing={1}>
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{ gap: '0.25em' }}
          >
            <Grid item>
              <span className="legendPending"></span>
            </Grid>

            <Grid item>Pending</Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{ gap: '0.25em' }}
          >
            <Grid item>
              <span className="legendApproved"></span>
            </Grid>

            <Grid item>Approved</Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{ gap: '0.25em' }}
          >
            <Grid item>
              <span className="legendRejected"></span>
            </Grid>

            <Grid item>Rejected</Grid>
          </Grid>
        </Grid>
      </Grid>

      <br />
    </>
  );
};

export default Legend;
