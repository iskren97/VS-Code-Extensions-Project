import React, { useContext } from 'react';
import './Register.css';

import 'react-phone-number-input/style.css';
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';

import { isValidPhoneNumber } from 'react-phone-number-input';

import { Container, Divider } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';
import AppContext from '../../providers/AppContext';

import { registerUser } from '../../services/auth.service';
import {
  createUserHandle,
  getUserByHandle,
  getUserData,
} from '../../services/users.service';

const Register = () => {
  const { setContext } = useContext(AppContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    (async () => {
      try {
        const getUser = await getUserByHandle(data.username);

        if (getUser.exists()) {
          // return swal(
          //   `User with username ${data.username} already exists!`,
          //   'Please use another username',
          //   'error'
          // );
        }

        const credential = await registerUser(data.email, data.password);

        createUserHandle(
          data.username,
          data.email,
          formatPhoneNumberIntl(data.phoneNumber),
          credential.user.uid
        );

        const userData = await getUserData(credential.user.uid);
        if (userData.exists()) {
          setContext({
            user: data.email,
            userData: userData.val()[Object.keys(userData.val())[0]],
          });
        }

        // closeOnSubmit();
        // swal('Success', 'Your account was created!', 'success');
      } catch (err) {
        if (err.message.includes('auth/email-already-in-use')) {
          // swal('Email already used!', 'Please use another email', 'error');
        }
      }
    })();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: 'auto',
        marginTop: '50px',
        paddingBottom: '70px',
        paddingTop: '70px',
        boxShadow:
          '0 12px 18px 2px rgb(34 0 51 / 4%), 0 6px 22px 4px rgb(7 48 114 / 12%), 0 6px 10px -4px rgb(14 13 26 / 12%)',
        background: 'white',
        borderRadius: '7px',
      }}
    >
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

      <Divider sx={{ bgcolor: 'rgba(0,122,205,255)' }} />

      <br />

      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <input
          placeholder="Username"
          {...register('username', {
            required: true,
            minLength: 2,
            maxLength: 20,
          })}
        />
        {errors?.username?.type === 'required' && (
          <p>⚠ This field is required</p>
        )}

        {errors?.username?.type === 'minLength' && (
          <p>Username cannot be less than 2 characters</p>
        )}
        {errors?.username?.type === 'maxLength' && (
          <p>Username cannot exceed 20 characters</p>
        )}

        <input
          placeholder="Email"
          {...register('email', {
            minLength: 2,
            maxLength: 35,
            required: true,
          })}
        />
        {errors?.email?.type === 'required' && <p>⚠ This field is required</p>}

        {errors?.email?.type === 'minLength' && (
          <p>Email cannot be less than 2 characters</p>
        )}
        {errors?.email?.type === 'maxLength' && (
          <p>Email cannot exceed 20 characters</p>
        )}

        <Controller
          name="phone"
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
              id="phone"
            />
          )}
        />

        {errors['phone'] && <p className="error-message">Invalid Phone</p>}

        <input
          placeholder="Password"
          type="password"
          {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 18,
          })}
        />
        {errors?.password?.type === 'required' && (
          <p>⚠ This field is required</p>
        )}

        {errors?.password?.type === 'minLength' && (
          <p>Password cannot be less than 6 characters </p>
        )}

        {errors?.password?.type === 'maxLength' && (
          <p>Password cannot exceed 20 characters </p>
        )}

        <input type="submit" />
      </form>
    </Container>
  );
};

export default Register;
