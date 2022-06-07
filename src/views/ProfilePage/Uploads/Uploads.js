import React, { useState } from 'react';

import { Grid } from '@mui/material';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { deleteExtension } from '../../../services/extensions.service';

const Uploads = ({ userUploads, isOwner }) => {
  const [uploaded, setUploaded] = useState(userUploads);
  const navigate = useNavigate();

  const setDate = (date) => {
    const newDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    };
    return newDate.toLocaleString('en-US', options);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        wrap="nowrap"
        sx={{ width: '100%' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 'auto',
            gap: '1em',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '0.5em',
            marginBottom: '0.5em',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.25em',
            }}
          >
            <span className="legendPending"></span>Pending
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.25em',
            }}
          >
            <span className="legendApproved"></span>Approved
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.25em',
            }}
          >
            <span className="legendRejected"></span>Rejected
          </div>
        </div>

        {isOwner
          ? uploaded.map((ext) => {
              let rowColor = '';

              switch (ext.status) {
                case 'pending':
                  rowColor = 'rgb(229, 255, 0)';
                  break;
                case 'approved':
                  rowColor = 'rgb(0, 255, 42)';
                  break;
                case 'rejected':
                  rowColor = 'rgb(255, 102, 0)';
                  break;
                default:
                  break;
              }

              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      width: '100%',
                      margin: '0.25em',
                      padding: '0.5em',
                      backgroundColor: 'lightGray',
                      borderRadius: '0.5em',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '1em',
                        flex: '1',
                        justifyContent: 'space-between',
                        marginRight: '1em',
                      }}
                    >
                      <Grid item>
                        <img
                          src={ext.logo}
                          alt="extension"
                          width="35rem"
                          height="35rem"
                        />
                      </Grid>

                      <Grid item>{ext.title}</Grid>

                      <Grid item>{ext.author}</Grid>

                      <Grid item sx={{ width: '11em' }}>
                        {setDate(ext.createdOn)}
                      </Grid>
                    </div>

                    <Grid
                      item
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',

                        gap: '0.25em',
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          window.location.href = `/extensions/${ext.id}`;
                        }}
                      >
                        View
                      </Button>

                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          navigate(`../extensions/edit/${ext.id}`);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          deleteExtension(ext.id);
                          setUploaded((allExtensions) =>
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

                  <span
                    className="legendPending"
                    style={{
                      backgroundColor: rowColor,
                      minWidth: '24px',
                      minHeight: '24px',
                    }}
                  ></span>
                </div>
              );
            })
          : uploaded
              .filter((ext) => ext.status === 'approved')
              .map((ext) => {
                let rowColor = '';

                switch (ext.status) {
                  case 'pending':
                    rowColor = 'rgb(229, 255, 0)';
                    break;
                  case 'approved':
                    rowColor = 'rgb(0, 255, 42)';
                    break;
                  case 'rejected':
                    rowColor = 'rgb(255, 102, 0)';
                    break;
                  default:
                    break;
                }

                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
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
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '1em',
                          flex: '1',
                          justifyContent: 'space-between',
                          marginRight: '1em',
                        }}
                      >
                        <Grid item>
                          <img
                            src={ext.logo}
                            alt="extension"
                            width="35rem"
                            height="35rem"
                          />
                        </Grid>

                        <Grid item>{ext.title}</Grid>

                        <Grid item>{ext.author}</Grid>

                        <Grid item sx={{ width: '11em' }}>
                          {setDate(ext.createdOn)}
                        </Grid>
                      </div>

                      <Grid
                        item
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '0.25em',
                        }}
                      >
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
                    </Grid>

                    <span
                      className="legendPending"
                      style={{ backgroundColor: rowColor }}
                    ></span>
                  </div>
                );
              })}

        {}
      </Grid>
    </>
  );
};

export default Uploads;
