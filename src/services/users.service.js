import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  update,
} from 'firebase/database';
import { db } from '../config/firebase-config';

export const createUserHandle = (email, username, uid, phoneNumber) => {
  return set(ref(db, `users/${username}`), {
    email,
    username,
    uid,
    createdOn: new Date(),
    phoneNumber,
    role: 'user',
  });
};

export const getAllUsers = () => {
  return get(ref(db, 'users'));
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const getUserByHandle = (username) => {
  return get(ref(db, `users/${username}`));
};

export const updateUserProfilePicture = (username, url) => {
  return update(ref(db), {
    [`users/${username}/avatarUrl`]: url,
  });
};

export const updateUserRole = (username, role) => {
  return update(ref(db), {
    [`users/${username}/role`]: role,
  });
};
