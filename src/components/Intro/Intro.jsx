import React from 'react';
import puzzle from '..//../assets/puzzle.png';

const Intro = () => {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '250px 50px',
          textAlign: 'center',
          alignItems: 'center',
          columnGap: '0',
          justifyContent: 'center',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '40px',
              fontStyle: 'normal',
              fontWeight: '600',
            }}
          >
            Extensions
          </h1>
        </div>

        <div>
          <img src={puzzle} alt="" className="general-img" />
        </div>
      </div>

      <h2
        style={{
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: '400',
          margin: '0',
          textAlign: 'center',
        }}
      >
        Explore powerful tools and features to customize Visual Studio Code
      </h2>
    </div>
  );
};

export default Intro;
