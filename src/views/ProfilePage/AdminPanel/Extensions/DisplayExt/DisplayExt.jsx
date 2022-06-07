import { Button, Grid } from '@mui/material';
import React from 'react';

const DisplayExt = ({
  ext,
  setDate,
  setExtensionStatus,
  setAllExtensions,
  allExtensions,
  deleteExtension,
  rowColor,
}) => {
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          columnGap: '7px',
        }}
      >
        <div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              margin: '0.25em',
              padding: '0.5em',
              backgroundColor: 'lightGray',
              borderRadius: '0.5em',
            }}
          >
            <Grid item>
              <img
                src={ext.logo}
                alt="extension"
                width="35rem"
                height="35rem"
                style={{ objectFit: 'cover' }}
              />
            </Grid>

            <Grid item>{ext.title}</Grid>

            <Grid item>{ext.author}</Grid>

            <Grid item sx={{ width: '11em' }}>
              {setDate(ext.createdOn)}
            </Grid>

            <Grid
              item
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0.25em',
              }}
            >
              <Grid container direction="row" spacing={0.5}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      window.location.href = `/extensions/${ext.id}`;
                    }}
                  >
                    View
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="success"
                    disabled={ext.status === 'approved'}
                    onClick={() => {
                      setExtensionStatus(ext.id, 'approved');

                      setAllExtensions(
                        allExtensions.map((extension) => {
                          if (extension.id === ext.id) {
                            extension.status = 'approved';
                          }
                          return extension;
                        })
                      );
                    }}
                  >
                    APPROVE
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="warning"
                    disabled={ext.status === 'rejected'}
                    onClick={() => {
                      setExtensionStatus(ext.id, 'rejected');
                      setAllExtensions(
                        allExtensions.map((extension) => {
                          if (extension.id === ext.id) {
                            extension.status = 'rejected';
                          }

                          return extension;
                        })
                      );
                    }}
                  >
                    REJECT
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleteExtension(ext.id);
                      setAllExtensions((allExtensions) =>
                        allExtensions.filter(
                          (extension) => extension.id !== ext.id
                        )
                      );
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div>
          <span
            className="legendPending"
            style={{ backgroundColor: rowColor }}
          ></span>
        </div>
      </div>
    </>
  );
};

export default DisplayExt;
