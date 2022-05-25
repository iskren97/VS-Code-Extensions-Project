import React from 'react';
import './Header.css';
import {useState, useContext} from 'react'
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AppContext from '../../providers/AppContext';
import { useNavigate } from 'react-router';


import LoginIcon from '@mui/icons-material/Login';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';

import { logoutUser } from '../../services/auth.service';
import { getUserData } from '../../services/users.service';

import avatar from '../../assets/avatar.jpg';
import vscodelogo from '../../assets/vscodelogo.png';

const Header = () => {
  const { user, userData, setContext } = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const logout = () => {
    logoutUser().then(() => {
      setContext({ user: null, userData: null });

      navigate('/');
    });
  };

  return (
    <>
      <Grid className="header-container" container>
        <Grid item>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              contentAlign: 'center',
              marginTop: '1em',
              marginBottom: '1em',

            }}
          >
            <div>
              <img
                src={vscodelogo}
                style={{
                  marginLeft: '1em',
                  marginRight: '1em',
                  width: '3.5rem',
                  objectFit: 'contain',
                }}
                alt="img"
              ></img>
            </div>

            <div>
              <h2
                style={{
                  fontSize: '1rem',
                  fontWeight: 'normal',
                }}
              >
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    color: 'rgba(0,122,205,255)',
                  }}
                >
                  V
                </span>
                isual{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    color: 'rgba(0,122,205,255)',
                  }}
                >
                  S
                </span>
                tudio{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    color: 'rgba(0,122,205,255)',
                  }}
                >
                  Code
                </span>{' '}
                <br />
                <span
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bolder',
                    textTransform: 'uppercase',
                  }}
                >
                  extensions
                </span>{' '}
                <span> </span>
                <span
                  style={{
                    fontSize: '1.25rem',
                  }}
                >
                  Marketplace
                </span>
              </h2>
            </div>
          </div>
        </Grid>

        <div className="header-buttons-container">
        { user ? (
          <>
          <div style={{display: 'flex', alignItems: 'center'}}>
          <NavLink to="/upload">
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ textDecoration: 'none' }}
            >
              Upload
            </Button>
          </NavLink>
          </div>

          <h3>{userData?.username}</h3>
          <Tooltip title="Profile">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                {userData.avatarUrl ? (
                  <Avatar onClick={handleClick} sx={{ width: 'auto', height: 'auto' }}>
                    <img src={userData.avatarUrl} className="profilePic" alt="profile" />
                  </Avatar>
                ) : (
                  <Avatar onClick={handleClick} sx={{ width: 'auto', height: 'auto' }}>
                    <img src={avatar} className="profilePic" alt="profile" />
                  </Avatar>
                )}
              </Box>
            </Tooltip>

            
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1
                  },

                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <MenuItem
                onClick={() => navigate(`/profile/${userData.username}`)}
                sx={{ bgcolor: 'white' }}>
                <ListItemIcon>
                  <VpnKeyIcon fontSize="medium" />
                </ListItemIcon>
                My Profile
              </MenuItem>

              <Divider />
              
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="medium" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>



          </>
        ) : (
          <>
          <NavLink to="/register">
            <Button
              variant="contained"
              startIcon={<VpnKeyIcon />}
              sx={{ textDecoration: 'none' }}
            >
              {' '}
              Sign Up{' '}
            </Button>
          </NavLink>

          <NavLink to="/login">
            <Button variant="contained" startIcon={<LoginIcon />}>
              {' '}
              Sign In{' '}
            </Button>
          </NavLink>
          </>
        )
          }
        </div>
       
      </Grid>
    </>
  );
};

export default Header;
