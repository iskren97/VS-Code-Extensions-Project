import React, { useEffect, useMemo, useState, useContext } from 'react';
import { Button, Grid } from '@mui/material';
import AppContext from '../../../../../providers/AppContext';

import './SortExt.css';

import {
  deleteExtension,
  setExtensionStatus,
} from '../../../../../services/extensions.service';

import {
  createNotification
} from '../../../../../services/notifications.service';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  
  const sortedItems = useMemo(() => {
    const sortableItems = [...items];

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const SortExt = ({ extensions, setAllExtensions, setDate, search }) => {
  const { items, requestSort, sortConfig } = useSortableData(extensions);
  const [allExtensions, setExtensions] = useState(items);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    setExtensions(items);
  }, [items, extensions]);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('author')}
              className={getClassNamesFor('author')}
              style={{ backgroundColor: 'black' }}
            >
              Author
            </button>
          </th>
        </tr>

        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('category')}
              className={getClassNamesFor('category')}
              style={{ backgroundColor: 'black' }}
            >
              Category
            </button>
          </th>
        </tr>

        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('createdOn')}
              className={getClassNamesFor('createdOn')}
              style={{ backgroundColor: 'black' }}
            >
              Date
            </button>
          </th>
        </tr>

        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('status')}
              className={getClassNamesFor('status')}
              style={{ backgroundColor: 'black' }}
            >
              Status
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            {allExtensions.map((ext) => {
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

              if (search) {
                return ext.title.toLowerCase().includes(search) ||
                  ext.tags.includes(search) ? (
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
                        key={ext.id}
                        item
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
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

                    <span
                      className="legendPending"
                      style={{ backgroundColor: rowColor }}
                    ></span>
                  </div>
                ) : null;
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
                      key={ext.id}
                      item
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
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
                        color="success"
                        disabled={ext.status === 'approved'}
                        onClick={() => {
                          setExtensionStatus(ext.id, 'approved');
                          createNotification('Admins', ext.author, `${userData.username} approved an extension - ${ext.title} `, ext.id);
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

                      <Button
                        variant="contained"
                        color="warning"
                        disabled={ext.status === 'rejected'}
                        onClick={() => {
                          setExtensionStatus(ext.id, 'rejected');
                          createNotification('Admins', ext.author, `${userData.username} rejected an extension - ${ext.title} `, ext.id);
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

                  <span
                    className="legendPending"
                    style={{ backgroundColor: rowColor }}
                  ></span>
                </div>
              );
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default SortExt;
