import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import AppContext from '../../../providers/AppContext';



const Info = () => {

  const { userData } = useContext(AppContext);

  const { username } = useParams();

  return (
    <div className="user-info">
                    <h3>
                      Username: <span>{userData?.username}</span>{' '}
                    </h3>
                    <h3>
                      Email: <span>{userData?.email}</span>{' '}
                    </h3>
                    <h3>
                      Phone Number: <span>{userData?.phoneNumber}</span>{' '}
                    </h3>
                    <h3>
                      Role: <span>{userData?.role}</span>{' '}
                    </h3>
                    <h3>
                      Total uploads: <span> {userData?.extensions.length}</span>
                    </h3>
                  </div>
  );
};

export default Info;
