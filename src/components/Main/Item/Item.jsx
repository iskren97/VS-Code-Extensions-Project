import React from 'react';
import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import AppContext from '../../../providers/AppContext';

import { updateExtensionDownloads } from '../../../services/extensions.service.js';

import './Item.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const Items = ({
  name,
  logo,
  author,
  category,
  rating,
  downloadLink,
  extId,
}) => {
  const [ratingValue, setRatingValue] = useState(rating || 0);

  const navigate = useNavigate();

  const { user, userData, setContext } = useContext(AppContext);

  return (
    <div>
      <article
        className="card"
        style={{
          background: `url(${logo}) center no-repeat`,
          backgroundSize: 'contain',
        }}
      >
        <div className="card_content">
          <h3 className="card_title">{name}</h3>
          <span className="card_subtitle">{category}</span>
          <div className="card_description">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '18px',
                gap: '1em',
              }}
            >
              <button
                onClick={() => {
                  updateExtensionDownloads(extId, userData?.username);
                  window.open(downloadLink, '_blank');
                }}
                className="card_button"
              >
                Get{' '}
              </button>
              <button
                onClick={() => navigate(`../extensions/${extId}`)}
                className="card_button"
              >
                {' '}
                Details
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Items;
