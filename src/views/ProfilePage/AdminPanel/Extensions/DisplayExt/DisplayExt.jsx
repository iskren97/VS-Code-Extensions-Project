import { Button, Grid } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import AppContext from '../../../../../providers/AppContext';

import { createNotification } from '../../../../../services/notifications.service';

import { profileButton } from '../../../../../styles/styles.js';
const DisplayExt = ({
  ext,
  setDate,
  setExtensionStatus,
  setAllExtensions,
  allExtensions,
  deleteExtension,
  rowColor,
}) => {
  const { userData } = useContext(AppContext);
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
            alignItems="center"
            justify="space-around"
            sx={{
                      margin: '0.25em',
                        padding: '0.5em',
                        textDecoration: 'none',
                        backgroundColor: 'transparent',
                        color: 'white',
                        fontWeight: 'bold',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '16px',
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

            <Grid item xs>
              {ext.title}
            </Grid>

            <Grid item xs>
              {ext.author}
            </Grid>

            <Grid item xs sx={{ width: '11em' }}>
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
                    sx={profileButton}
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
                    sx={profileButton}
                    disabled={ext.status === 'approved'}
                    onClick={() => {
                      setExtensionStatus(ext.id, 'approved');
                      createNotification(
                        'Admins',
                        ext.author,
                        `${userData.username} approved an extension - ${ext.title} `,
                        ext.id
                      );

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
                    sx={profileButton}
                    onClick={() => {
                      setExtensionStatus(ext.id, 'rejected');
                      createNotification(
                        'Admins',
                        ext.author,
                        `${userData.username} rejected an extension - ${ext.title} `,
                        ext.id
                      );

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
                    sx={profileButton}
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
            style={{ backgroundColor: rowColor, marginLeft: '8px' }}
          ></span>
        </div>
      </div>
    </>
  );
};

export default DisplayExt;
