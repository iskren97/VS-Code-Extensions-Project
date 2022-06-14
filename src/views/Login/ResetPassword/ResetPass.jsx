import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Container, Divider, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { resetPassword } from '../../../services/auth.service';
import AlertUser from '../../Register/AlertUser';
import { loginDividerStyle } from '../../../styles/styles';

const ResetPass = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    resetPassword(data.email)
      .then(() => {
        return (
          setError(true),
          setErrorMsg(`Password reset email sent!`),
          setMsgType('success'),
          setTimeout(() => {
            navigate('/');
          }, 3000)
        );
      })
      .catch((err) => {
        return (
          setError(true), setErrorMsg(`${err.message}`), setMsgType('error')
        );
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
          <h2>Reset password</h2>
        </div>

        <p style={{ textAlign: 'center' }}>Please enter your email address</p>

        <br />

        <Divider sx={loginDividerStyle} />

        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <input
            autoComplete="off"
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

          <input type="submit" />
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>
            Go back to Log In?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              Log In
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

export default ResetPass;
