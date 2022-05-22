import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import './Item.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const Items = ({ name, logo }) => {
  return (
    <Item className="item">
      <div className="category-preview">
        <div>
          <img className="general-img" src={logo} alt="img"></img>
        </div>
        <div className="category-info">
          <h2>{name}</h2>
        </div>
      </div>
    </Item>
  );
};

export default Items;
