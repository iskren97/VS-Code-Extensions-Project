import React, { useEffect, useState } from 'react';
import './SortExt.css';

import {
  deleteExtension,
  setExtensionStatus,
} from '../../../../services/extensions.service';
import DisplayExt from './DisplayExt/DisplayExt';

import useSortableData from './SortExt/SortExt';

const Extensions = ({ extensions, setAllExtensions, setDate, search }) => {
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
    <>
      {allExtensions.length !== 0 ? (
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
                <DisplayExt
                  key={ext.id}
                  ext={ext}
                  setDate={setDate}
                  setExtensionStatus={setExtensionStatus}
                  setAllExtensions={setAllExtensions}
                  allExtensions={allExtensions}
                  deleteExtension={deleteExtension}
                  rowColor={rowColor}
                />
              ) : null;
            }

            return (
              <DisplayExt
                key={ext.id}
                ext={ext}
                setDate={setDate}
                setExtensionStatus={setExtensionStatus}
                setAllExtensions={setAllExtensions}
                allExtensions={allExtensions}
                deleteExtension={deleteExtension}
                rowColor={rowColor}
              />
            );
          })}
        </table>
      ) : (
        <h3 style={{color: 'white'}}>There are no extensions yet.</h3>
      )}
    </>
  );
};

export default Extensions;
