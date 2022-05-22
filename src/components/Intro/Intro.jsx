import React from 'react';

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
          <img
            src="https://icons-for-free.com/download-icon-extension-1324760527053491862_512.png"
            alt=""
            srcset=""
            className="general-img"
          />
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
