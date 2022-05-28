import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import AppContext from '../../providers/AppContext';

import { Container, Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { loginUser } from '../../services/auth.service';
import { getUserData } from '../../services/users.service';
import AlertUser from '../Register/AlertUser';

const Login = () => {
  const { setContext } = useContext(AppContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  const handleInvalidData = () => {
    setError(true);
    setErrorMsg('Incorrect email or password');
    setMsgType('error');
  };

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then((u) => {
        return getUserData(u.user.uid).then((snapshot) => {
          if (snapshot.exists()) {
            setContext({
              user: u.user.email,
              userData: snapshot.val()[Object.keys(snapshot.val())[0]],
            });
          }
          setError(true);
          setErrorMsg(`You are now logged in!`);
          setMsgType('success');
          setTimeout(() => {
            navigate('/');
          }, 1500);
        });
      })
      .catch(() => {
        handleInvalidData();
      });
  };

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      if (error === true) {
        setError(false);
      } else {
        onSubmit(event);
      }
    }
  };

  return (
    <>
      <Container className="register-container" maxWidth="sm">
        <NavLink to="/home" style={{ all: 'unset', cursor: 'pointer' }}>
          <Tooltip placement="right-end" title="Back to Home">
            <ArrowBackIcon
              fontSize={'medium'}
              style={{ position: 'absolute', top: '5px', left: '5px' }}
            />
          </Tooltip>
        </NavLink>
        <div
          style={{
            textAlign: 'center',
            position: 'relative',
            top: '-25px',
            fontSize: '22px',
          }}
        >
          <h2>Log In</h2>
        </div>

        <p style={{ textAlign: 'center' }}>
          Sign in with your email and password
        </p>

        <br />

        <Divider sx={{ bgcolor: 'rgba(0,122,205,255)' }} />

        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <input
            type="email"
            placeholder="Email"
            required
            {...register('email', {
              minLength: 2,
              maxLength: 35,
            })}
            onKeyDown={handleKeyEnter}
          />
          {errors?.email?.type === 'minLength' && (
            <p>Email cannot be less than 2 characters</p>
          )}
          {errors?.email?.type === 'maxLength' && (
            <p>Email cannot exceed 20 characters</p>
          )}

          <input
            type="password"
            placeholder="Password"
            required
            {...register('password', {
              minLength: 6,
              maxLength: 18,
            })}
            onKeyDown={handleKeyEnter}
          />

          {errors?.password?.type === 'minLength' && (
            <p>Password cannot be less than 6 characters </p>
          )}

          {errors?.password?.type === 'maxLength' && (
            <p>Password cannot exceed 20 characters </p>
          )}

          <input type="submit" />
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </Container>
      {error ? (
        <AlertUser
          msg={errorMsg}
          type={msgType}
          err={error}
          setErr={setError}
        />
      ) : null}
    </>
  );
};

export default Login;
