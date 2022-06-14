import React from 'react';
import { useContext } from 'react';
import AppContext from '../../../providers/AppContext';

const Info = ({ userProfile }) => {
  const { userData } = useContext(AppContext);

  return (
    <div className="user-info" style={{ color: 'white' }}>
      <h3>
        Username: <span>{userProfile?.username}</span>{' '}
      </h3>

      <h3>
        Email: <span>{userProfile?.email}</span>{' '}
      </h3>

      {userData?.username === userProfile?.username ||
      userData?.role === 'admin' ? (
        <h3>
          Phone Number: <span>{userProfile?.phoneNumber}</span>{' '}
        </h3>
      ) : null}

      <h3>
        Role: <span>{userProfile?.role}</span>{' '}
      </h3>

      <h3>
        Total uploads: <span> {userProfile?.extensions?.length || 0}</span>
      </h3>
    </div>
  );
};

export default Info;
