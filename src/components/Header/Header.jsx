import React from 'react';
import './Header.css';
import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import AppContext from '../../providers/AppContext';
import { logoutUser } from '../../services/auth.service';

import { Grid } from '@mui/material';
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


import avatar from '../../assets/avatar.jpg';
import vscodelogo from '../../assets/vscodelogo.png';
import { headerContainer, headerButton} from '../../styles/styles.js'

const Header = () => {
  const { user, userData, setContext } = useContext(AppContext);
  const [loadingIndicator, setLoadingIndicator] = useState(true);


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

  useEffect(() => {
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        setLoadingIndicator(false);
      }, 500);
    
  }, []);

  return (
    <>
      <Grid className="header-container" container>
        <Grid item>
          <NavLink style={{ all: 'unset', cursor: 'pointer' }} to="/home">
            <div
              style={headerContainer}
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
          </NavLink>
        </Grid>

        <div className="header-buttons-container">
        {loadingIndicator ? (
          <div className="lds-dual-ring"></div>
        ) : user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {userData.role !== 'blocked' ? (
                  <NavLink to="/upload">
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={headerButton}
                    >
                      Upload
                    </Button>
                  </NavLink>
                ) : (
                  <Tooltip
                    title="You don't have permission to do this!"
                    followCursor
                  >
                  <span>
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={headerButton} disabled
                    >
                      Upload
                    </Button>
                    </span>
                  </Tooltip>
                )}
              </div>

              <h3>{userData?.username}</h3>

              <Tooltip title="Profile">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {userData.avatarUrl ? (
                    <Avatar
                      onClick={handleClick}
                      sx={{ width: 'auto', height: 'auto' }}
                    >
                      <img
                        src={userData.avatarUrl}
                        className="profilePic"
                        alt="profile"
                      />
                    </Avatar>
                  ) : (
                    <Avatar
                      onClick={handleClick}
                      sx={{ width: 'auto', height: 'auto' }}
                    >
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
                    background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px',
              color: 'white',


                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
              {/* Dont delete next line - overwrites focus on button */}
                <input type="text" style={{display: 'none'}}></input>
                <MenuItem
                  onClick={() => navigate(`/profile/${userData.username}`)}

                >
                  <ListItemIcon>
                    <VpnKeyIcon fontSize="medium" sx={{color: 'white'}}/>
                  </ListItemIcon>
                  My Profile
                </MenuItem>

                <Divider sx={{background: 'rgba(255, 255, 255, 0.3)'}}/>

                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="medium" sx={{color: 'white'}} />
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
                  sx={headerButton}
                >
                  {' '}
                  Sign Up{' '}
                </Button>
              </NavLink>

              <NavLink to="/login">
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  sx={headerButton}

                >
                  {' '}
                  Sign In{' '}
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </Grid>
    </>
  );
};

export default Header;
