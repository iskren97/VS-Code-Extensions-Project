import React from 'react';

import './Profile.css';

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';

import SchoolIcon from '@mui/icons-material/School';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Profile = ({ name, img, age, location, town, ins, fb, linked, git }) => {
  return (
    <Container
      className="profile-container"
      maxWidth="xs"
      sx={{
        width: 300,
        height: 'auto',
        paddingBottom: '16px',
        paddingTop: '16px',

        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.2)',
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item sx={{ textAlign: 'center' }}>
          <img
            src={img}
            style={{ width: '160px', height: '160px', objectFit: 'cover' }}
            alt="profile-pic"
          />
        </Grid>

        <Grid item sx={{ textAlign: 'center' }}>
          <h3>{name}</h3>
          <p style={{ fontStyle: 'italic' }}>
            <a
              href="https://www.telerikacademy.com/"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                all: 'unset',
              }}
            >
              <SchoolIcon
                sx={{ color: '#47DB00', fontSize: 'medium', cursor: 'pointer' }}
              />{' '}
            </a>
            Telerik Academy student
          </p>
          <Divider
            sx={{
              border: '1px solid rgba(255, 255, 255, 0.3)',
              marginTop: '20px',
            }}
          />
        </Grid>

        <Grid item sx={{ textAlign: 'center' }}>
          <p>{age} years old</p>
        </Grid>
        <Grid item sx={{ textAlign: 'center' }}>
          <a
            href={location}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: 'none',
              all: 'unset',
              cursor: 'pointer',
            }}
          >
            <LocationOnIcon /> {town}, Bulgaria
          </a>
        </Grid>

        <Grid item textAlign="center">
          <a href={ins} target="_blank" rel="noreferrer">
            <InstagramIcon />
          </a>
          <a href={fb} target="_blank" rel="noreferrer">
            <FacebookIcon />
          </a>
          <a href={linked} target="_blank" rel="noreferrer">
            <LinkedInIcon />
          </a>
          <a href={git} target="_blank" rel="noreferrer">
            <GitHubIcon />
          </a>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
