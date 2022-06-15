import React from 'react';

import { Item } from '../../styles/styles.js'


const ListCategory = ({ name }) => {
  return (
    <Item
      className="category-item"
      style={{
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2>{name}</h2>
    </Item>
  );
};
export default ListCategory;
