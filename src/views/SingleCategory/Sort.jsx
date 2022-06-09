import React, { useEffect, useState } from 'react';
import { Divider, Grid } from '@mui/material';

import './Sort.css';
import Items from '../../components/Main/Item/Item';
import useSortableData from '../ProfilePage/AdminPanel/Extensions/SortExt/SortExt';

const Sort = ({ extensions, search }) => {
  const { items, requestSort, sortConfig } = useSortableData(extensions);
  const [allExtensions, setExtensions] = useState(items);

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
              onClick={() => requestSort('title')}
              className={getClassNamesFor('title')}
              style={{ backgroundColor: 'black' }}
            >
              Title
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
              onClick={() => requestSort('averageRating')}
              className={getClassNamesFor('averageRating')}
              style={{ backgroundColor: 'black' }}
            >
              Rating
            </button>
          </th>
        </tr>
      </thead>

      <br />
      <Divider
        sx={{
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      />
      <br />

      <tbody>
        <tr>
          <td>
            <Grid container direction="row" spacing={2} className="item-grid">
              {allExtensions.map((ext) => {
                ext.averageRating =
                  ext?.rating?.reduce(
                    (sum, current) => sum + current.value,
                    0
                  ) / ext?.rating?.length || 0;

                if (search) {
                  return ext.title.toLowerCase().includes(search) ||
                    ext.tags.includes(search) ? (
                    <Grid key={ext.id} item>
                      <Items
                        key={ext.id}
                        name={ext.title}
                        logo={ext.logo}
                        author={ext.author}
                        category={ext.category}
                        rating={3.8}
                        downloadLink={ext.downloadLink}
                        extId={ext.id}
                      />
                    </Grid>
                  ) : null;
                }

                return (
                  <Grid key={ext.id} item>
                    <Items
                      key={ext.id}
                      name={ext.title}
                      logo={ext.logo}
                      author={ext.author}
                      category={ext.category}
                      rating={3.8}
                      downloadLink={ext.downloadLink}
                      extId={ext.id}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default Sort;
