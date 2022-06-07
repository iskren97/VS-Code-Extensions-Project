import React from 'react';

import './Users.css';

import DisplayUser from './DisplayUser';

import defaultPic from '../../../../assets/avatar.jpg';

const Users = ({ allUsers, setAllUsers, search }) => {
  return (
    <>
      {allUsers.length !== 0 ? (
        allUsers.map((user) => {
          if (search) {
            return user.username.toLowerCase().includes(search) ||
              user.email.toLowerCase().includes(search) ? (
              <DisplayUser
                username={user.username}
                email={user.email}
                phoneNumber={user.phoneNumber}
                uid={user.uid}
                avatar={user.avatarUrl ?? defaultPic}
                role={user.role}
                allUsers={allUsers}
                setUsers={setAllUsers}
              />
            ) : null;
          }

          return (
            <DisplayUser
              username={user.username}
              email={user.email}
              phoneNumber={user.phoneNumber}
              uid={user.uid}
              avatar={user.avatarUrl ?? defaultPic}
              role={user.role}
              allUsers={allUsers}
              setUsers={setAllUsers}
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
