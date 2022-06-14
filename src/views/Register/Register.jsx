import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';
import AppContext from '../../providers/AppContext';

import './Register.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { isValidPhoneNumber } from 'react-phone-number-input';

import { Container, Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { registerUser } from '../../services/auth.service';
import {
  createUserHandle,
  getAllUsers,
  getUserByHandle,
  getUserData,
} from '../../services/users.service';

import AlertUser from './AlertUser';
import { loginDividerStyle } from '../../styles/styles';

const Register = () => {
  const { setContext } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    (async () => {
      try {
        const getUser = await getUserByHandle(data.username);

        if (getUser.exists()) {
          throw new Error('username already in use');
        }

        const users = await getAllUsers();
        Object.values(users.val()).map((o) =>
          o.phoneNumber === data.phoneNumber
            ? (function () {
                throw new Error('phone number already in use');
              })()
            : null
        );

        const credential = await registerUser(data.email, data.password);

        createUserHandle(
          data.email,
          data.username,
          credential.user.uid,
          data.phoneNumber
        );

        const userData = await getUserData(credential.user.uid);
        if (userData.exists()) {
          setContext({
            user: data.email,
            userData: userData.val()[Object.keys(userData.val())[0]],
          });
        }

        setError(true);
        setErrorMsg(`Account successfully created!`);
        setMsgType('success');

        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (err) {
        if (err.message.includes('username already in use')) {
          setError(true);
          setErrorMsg(`User with username ${data.username} already exists!`);
          setMsgType('error');
        } else if (err.message.includes('auth/email-already-in-use')) {
          setError(true);
          setErrorMsg(`Email already used!`);
          setMsgType('error');
        } else if (err.message.includes('phone number already in use')) {
          setError(true);
          setErrorMsg(
            `User with phone number ${data.phoneNumber} already exists!`
          );
          setMsgType('error');
        }
      }
    })();
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
          <h2>Register</h2>
        </div>

        <p style={{ textAlign: 'center' }}>Please fill up the fields below</p>

        <br />

        <Divider sx={loginDividerStyle} />

        <br />

        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="register-form"
        >
          <input
            placeholder="Username"
            autoComplete="off"
            required
            {...register('username', {
              minLength: 2,
              maxLength: 20,
            })}
          />

          {errors?.username?.type === 'minLength' && (
            <p>Username cannot be less than 2 characters</p>
          )}
          {errors?.username?.type === 'maxLength' && (
            <p>Username cannot exceed 20 characters</p>
          )}

          <input
            placeholder="Email"
            autoComplete="off"
            required
            {...register('email', {
              minLength: 2,
              maxLength: 35,
            })}
          />

          {errors?.email?.type === 'minLength' && (
            <p>Email cannot be less than 2 characters</p>
          )}
          {errors?.email?.type === 'maxLength' && (
            <p>Email cannot exceed 20 characters</p>
          )}

          <input
            placeholder="Password"
            type="password"
            required
            {...register('password', {
              minLength: 6,
              maxLength: 18,
            })}
          />

          {errors?.password?.type === 'minLength' && (
            <p>Password cannot be less than 6 characters </p>
          )}

          {errors?.password?.type === 'maxLength' && (
            <p>Password cannot exceed 20 characters </p>
          )}

          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: true,
              validate: (value) => isValidPhoneNumber(value),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                placeholder="Enter phone number"
                international
                value={value}
                onChange={onChange}
                id="phoneNumber"
              />
            )}
          />

          {errors['phoneNumber'] && (
            <p className="error-message">Invalid Phone</p>
          )}

          <input type="submit" />
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>
            Already have an account?{' '}
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

export default Register;
