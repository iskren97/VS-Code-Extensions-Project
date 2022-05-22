import React from 'react';

const Section = ({ category }) => {
  return (
    <div className="extensions-category">
      <div>
        <h3>{category}</h3>
      </div>

      {category !== 'Recommended' ? (
        <div>
          <h4 style={{ color: 'rgba(0,122,205,255)' }}>View All</h4>
        </div>
      ) : null}
    </div>
  );
};

export default Section;
