import React from 'react';
import { NavLink } from 'react-router-dom';

import img1 from './imgs/iskren.JPG';
import img2 from './imgs/georgi.JPG';

import { Divider, Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Profile from './Profile/Profile';

import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <NavLink to="/home" style={{ all: 'unset', cursor: 'pointer' }}>
        <Tooltip placement="right-end" title="Back to Home">
          <ArrowBackIcon
            fontSize={'medium'}
            style={{ position: 'absolute', top: '5px', left: '5px' }}
          />
        </Tooltip>
      </NavLink>

      <Grid container direction="row">
        <Grid item xs>
          <Profile
            name="Iskren Gyorev"
            img={img1}
            age="24"
            location="https://www.google.com/maps/place/%D0%92%D0%B8%D0%B4%D0%B8%D0%BD/@43.9796191,22.8423547,13z/data=!3m1!4b1!4m5!3m4!1s0x475379eca2009025:0x1f853ae2f877d8b7!8m2!3d43.996159!4d22.8679302"
            town="Vidin"
            ins="https://www.instagram.com/iskren_e/"
            fb="https://www.facebook.com/icko.gyorev/"
            linked="https://www.linkedin.com/in/iskren-gyorev-4365b1239/"
            git="https://github.com/iskren97"
          />
        </Grid>

        <Grid item xs sx={{ textAlign: 'center', alignSelf: 'center' }}>
          <Divider sx={{ border: '1px solid rgba(255, 255, 255, 0.3)' }} />

          <h1>IDE Addonis Project</h1>
          <p style={{ fontSize: '18px' }}>
            Our Project is part of Telerik Academy's JavaScript Alpha program, a national IT group
            and leading IT teaching center. <br />
            <br />
            Visit their corporate site. <br /> © Telerik Academy, 30 Krastyo Rakovski Str. <br />{' '}
            1729 Sofia, Bulgaria.
            <br />
            <br />
            All rights reserved.
          </p>
          <br />

          <Divider sx={{ border: '1px solid rgba(255, 255, 255, 0.3)' }} />
        </Grid>

        <Grid item xs>
          <Profile
            name="Georgi Georgiev"
            img={img2}
            age="25"
            location="https://www.google.com/maps/place/%D0%A1%D0%BE%D1%84%D0%B8%D1%8F/@42.695537,23.2539071,12z/data=!3m1!4b1!4m5!3m4!1s0x40aa8682cb317bf5:0x400a01269bf5e60!8m2!3d42.6977082!4d23.3218675"
            town="Sofia"
            ins="https://www.instagram.com/georgigeorgiev96/"
            fb="https://www.facebook.com/georgi.georgiev.dancer/"
            linked="https://www.linkedin.com/in/georgi-georgiev-071605203/"
            git="https://github.com/Phreakshow"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
