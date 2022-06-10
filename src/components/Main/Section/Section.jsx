import React from 'react';
import { NavLink } from 'react-router-dom';

const Section = ({ category }) => {
  return (
    <div className="extensions-category">
      <div>
        <h3>{category}</h3>
      </div>

      {category !== 'Recommended' && category !== 'New' ? (
        <div>
          <NavLink to="/category/:most_popular">
            <h4 style={{ color: 'rgb(234 234 234)' }}>View All</h4>
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};

export default Section;
