import { Grid } from '@mui/material';
import React from 'react';
import Items from '../../../components/Main/Item/Item';

import DeleteIcon from '@mui/icons-material/Delete';

const Uploads = ({ userUploads, isOwner }) => {
  return userUploads.map((upload) => {
    return (
      <Grid key={upload.id} item>
        <Items
          key={upload.id}
          name={upload.title}
          logo={upload.logo}
          author={upload.author}
          category={upload.category}
          rating={3.8}
          downloadLink={upload.downloadLink}
          extId={upload.id}
        />

        {isOwner ? <DeleteIcon /> : null}
      </Grid>
    );
  });
};

export default Uploads;
