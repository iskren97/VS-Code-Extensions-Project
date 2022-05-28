import React, { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';

import './Sort.css';
import Items from '../../components/Main/Item/Item';

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
              onClick={() => requestSort('rating')}
              className={getClassNamesFor('rating')}
              style={{ backgroundColor: 'black' }}
            >
              Rating
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <Grid container direction="row" spacing={2} className="item-grid">
              {allExtensions.map((ext) => {
                if (search) {
                  return ext.title.toLowerCase().includes(search) ? (
                    <Grid key={ext.id} item>
                      <Items
                        key={ext.id}
                        name={ext.title}
                        logo={ext.logo}
                        author={ext.author}
                        category={ext.category}
                        rating={3.8}
                        downloadLink={ext.downloadLink}
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
