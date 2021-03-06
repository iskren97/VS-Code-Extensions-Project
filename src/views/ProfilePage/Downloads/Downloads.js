import { Grid } from '@mui/material';
import React from 'react';
import Items from '../../../components/Main/Item/Item';

const Downloads = ({ userDownloads }) => {
  return userDownloads.map((download) => {
    return (
      <Grid key={download.id} item>
        <Items
          key={download.id}
          name={download.title}
          logo={download.logo}
          category={download.category}
          downloadLink={download.downloadLink}
          extId={download.id}
        />
      </Grid>
    );
  });
};

export default Downloads;
