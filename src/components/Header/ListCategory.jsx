import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import './Header.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const ListCategory = ({ name, bgColor }) => {
  return (
    <Item
      className="category-item"
      style={{ backgroundColor: bgColor, color: 'white' }}
    >
      <h2>{name}</h2>
    </Item>
  );
};
export default ListCategory;
