import React from 'react';
import './Footer.css';

import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';

import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import RecommendIcon from '@mui/icons-material/Recommend';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <Grid container spacing={5} direction="row" className="footer-grid">
        <Grid item xs={3} style={{ textAlign: 'center' }}>
          <h3>About</h3>
          <Divider
            sx={{ border: '1px solid rgba(255, 255, 255, 0.3)' }}
            variant={'middle'}
          />

          <NavLink to="/about">
            <InfoIcon style={{ marginTop: '6px', cursor: 'pointer' }} />
          </NavLink>
          <p>Who are we?</p>
        </Grid>

        <Grid item xs={3} style={{ textAlign: 'center' }}>
          <h3>Contact</h3>
          <Divider
            sx={{ border: '1px solid rgba(255, 255, 255, 0.3)' }}
            variant={'middle'}
          />

          <NavLink to="/about">
            <ContactPageIcon style={{ marginTop: '6px', cursor: 'pointer' }} />
          </NavLink>
          <p>Feel free to contact us</p>
        </Grid>

        <Grid item xs={3} style={{ textAlign: 'center' }}>
          <h3 sx={{ cursor: 'pointer' }}>Support</h3>
          <Divider
            sx={{ border: '1px solid rgba(255, 255, 255, 0.3)' }}
            variant={'middle'}
          />

          <NavLink to="/about">
            <RecommendIcon style={{ marginTop: '6px', cursor: 'pointer' }} />
          </NavLink>
          <p sx={{ cursor: 'pointer' }}>Show us your appreciation</p>
        </Grid>

        <Grid item xs={3}>
          <h3 style={{ textAlign: 'center' }}>Socials</h3>
          <Divider
            sx={{ border: '1px solid rgba(255, 255, 255, 0.3)' }}
            variant={'middle'}
          />

          <Grid
            container
            spacing={2}
            direction="row"
            sx={{
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <Grid item>
              <NavLink to="/about">
                <InstagramIcon sx={{ cursor: 'pointer' }} />
              </NavLink>
            </Grid>

            <Grid item>
              <NavLink to="/about">
                <FacebookIcon sx={{ cursor: 'pointer' }} />
              </NavLink>
            </Grid>

            <Grid item>
              <NavLink to="/about">
                <LinkedInIcon sx={{ cursor: 'pointer' }} />
              </NavLink>
            </Grid>
          </Grid>
          <p style={{ textAlign: 'center' }}>Follow us on social media</p>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
