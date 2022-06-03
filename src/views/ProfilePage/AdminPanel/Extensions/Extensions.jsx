import React from 'react';
import SortExt from './SortExt/SortExt';

const Extensions = ({ allExtensions, setAllExtensions, setDate, search }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1em',
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

      <br />

      <SortExt
        extensions={allExtensions}
        setAllExtensions={setAllExtensions}
        setDate={setDate}
        search={search}
      />
    </>
  );
};

export default Extensions;
