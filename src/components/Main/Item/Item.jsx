import React from 'react';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import AppContext from '../../../providers/AppContext';

import { updateExtensionDownloads } from '../../../services/extensions.service.js';

import './Item.css';

const Items = ({
  name,
  logo,
  category,
  downloadLink,
  extId,
}) => {
  const navigate = useNavigate();

  const { userData } = useContext(AppContext);

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
