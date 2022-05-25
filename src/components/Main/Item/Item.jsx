import React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

import './Item.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const Items = ({ name, logo, author, category, rating, downloadLink }) => {
  const [ratingValue, setRatingValue] = useState(rating || 0);

  return (
    <Item className="item">
      <div className="category-preview">
        <div>
          <img className="general-img" src={logo} alt="img"></img>
        </div>
        <div className="category-info">
          <h2>{name}</h2>
          <h3 style={{ color: 'grey' }}>{author}</h3>
          <h3 style={{ color: 'grey' }}>{category}</h3>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Rating
            name="simple-controlled"
            value={ratingValue}
            size="medium"
            onChange={(_, newValue) => {
              setRatingValue(newValue);
            }}
          />
          <div style={{ fontWeight: 'bold', fontSize: '1.25em' }}>
            {rating ?? null}
          </div>
        </div>
        <div></div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            onClick={() => window.open(downloadLink, '_blank')}
            variant="text"
            sx={{ color: 'blue', fontWeight: 'bold', fontSize: '1.25em' }}
          >
            Get
          </Button>
          <Button
            onClick={() => window.open(downloadLink, '_blank')}
            variant="text"
            sx={{ color: 'blue', fontWeight: 'bold', fontSize: '1.25em' }}
          >
            Details
          </Button>
        </div>
      </div>
    </Item>
  );
};

export default Items;
