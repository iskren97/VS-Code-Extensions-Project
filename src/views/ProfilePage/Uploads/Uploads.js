import { Grid, Tooltip } from '@mui/material';
import Items from '../../../components/Main/Item/Item';

import DeleteIcon from '@mui/icons-material/Delete';

import { deleteExtension } from '../../../services/extensions.service';

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

        {isOwner ? (
          <Tooltip
            title="Delete"
            placement="right"
            onClick={() => {
              deleteExtension(upload.id);
            }}
          >
            <DeleteIcon sx={{ cursor: 'pointer' }} />
          </Tooltip>
        ) : null}
      </Grid>
    );
  });
};

export default Uploads;
