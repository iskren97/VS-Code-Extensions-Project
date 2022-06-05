import React from 'react';

import './Users.css';

import DisplayUser from './DisplayUser';

import defaultPic from '../../../../assets/avatar.jpg';

const Users = ({ allUsers, search }) => {
  return (
    <>
      <br />

      {allUsers.length !== 0 ? (
        allUsers.map((user) => {
          if (search) {
            return user.username.toLowerCase().includes(search) ||
              user.email.toLowerCase().includes(search) ? (
              <DisplayUser
                key={user.uid}
                username={user.username}
                email={user.email}
                phoneNumber={user.phoneNumber}
                uid={user.uid}
                avatar={user.avatarUrl ?? defaultPic}
                role={user.role}
              />
            ) : null;
          }

          return (
            <DisplayUser
              key={user.uid}
              username={user.username}
              email={user.email}
              phoneNumber={user.phoneNumber}
              uid={user.uid}
              avatar={user.avatarUrl ?? defaultPic}
              role={user.role}
            />
          );
        })
      ) : (
        <h3>There are no users yet.</h3>
      )}
    </>
  );
};

export default Users;
