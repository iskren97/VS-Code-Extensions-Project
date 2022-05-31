import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import AppContext from '../../../providers/AppContext';



const Info = ({userProfile}) => {

  const { userData } = useContext(AppContext);

  const { username } = useParams();

  return (
    <div className="user-info">
                    <h3>
                      Username: <span>{userProfile.username}</span>{' '}
                    </h3>
                    <h3>
                      Email: <span>{userProfile.email}</span>{' '}
                    </h3>
                    <h3>
                      Phone Number: <span>{userProfile.phoneNumber}</span>{' '}
                    </h3>
                    <h3>
                      Role: <span>{userProfile.role}</span>{' '}
                    </h3>
                    <h3>
                      Total uploads: <span> {userProfile?.extensions?.length}</span>
                    </h3>
                  </div>
  );
};

export default Info;
