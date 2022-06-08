import React from 'react';
import {useEffect, useState} from 'react';

import { getAllNotifications, setNotificationStatus } from '../../../services/notifications.service';

import { Grid } from '@mui/material';

import Button from '@mui/material/Button';


function Notifications({userProfile}) {

 const [notifications, setNotifications] = useState([])
  useEffect(()=>{
    getAllNotifications().then(result => setNotifications(result))
  },[])



  const setDate = (date) => {
    const newDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    };
    return newDate.toLocaleString('en-US', options);
  };



  return (
    <>
   <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        wrap="nowrap"
        sx={{width: '100%'}}
      >
        <div
          style={{      display: 'flex',
      flexDirection: 'row',
      width: 'auto',
      gap: '1em',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      marginTop: '0.5em',
      marginBottom: '0.5em',}}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.25em',
            }}
          >
            <span style={{backgroundColor: 'rgb(0, 149, 255)', borderRadius: '50%', display: 'inline-block',   height: '25px',
  width: '25px'}}></span>New
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.25em',
            }}
          >
            <span style={{backgroundColor: 'rgb(255, 102, 0)', borderRadius: '50%', display: 'inline-block',   height: '25px',
  width: '25px'}}></span>Seen
          </div>
</div>

      {notifications.filter(notification => notification?.author === userProfile.username || notification?.recipient === userProfile.username || (userProfile.role === 'admin' && (notification?.recipient === 'Admins' || notification?.author === 'Admins')))
              .map((notif) => {
                let rowColor = '';
                if(userProfile.username === notif.author || userProfile.role === 'admin' && (notif?.recipient === 'Admins' || notif?.author === 'Admins') ){
                  switch (notif.statusAuthor) {
                  case 'unseen':
                    rowColor = 'rgb(0, 149, 255)';
                    break;
                  case 'seen':
                    rowColor = 'rgb(255, 102, 0)';
                    break;
                  default:
                    break;
                }
                }else{
                  switch (notif.statusRecipient) {
                  case 'unseen':
                    rowColor = 'rgb(0, 149, 255)';
                    break;
                  case 'seen':
                    rowColor = 'rgb(255, 102, 0)';
                    break;
                  default:
                    break;
                }
                }
                

                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        margin: '0.25em',
                        padding: '0.5em',
                        backgroundColor: 'lightGray',
                        borderRadius: '0.5em',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '1em',
                          flex: '1',
                          justifyContent: 'space-between',
                          marginRight: '1em',
                        }}
                      >
                    


                        <Grid item>From: {notif.author} To: {notif.recipient}  <Grid item sx={{ width: '11em' }}>
                          {setDate(notif.createdOn)}
                        </Grid></Grid>

                       
                        <Grid item>{notif.message}</Grid>
                      </div>


                      <Grid
                        item
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '0.25em',
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            window.location.href = `/extensions/${notif.extensionId}`;
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={()=> {

                            if(notif.author === userProfile.username || (userProfile.role == 'admin' && notif.author === 'Admins')){
                          notif.statusAuthor === 'unseen' ? setNotificationStatus(notif.id, 'seen', 'author') : setNotificationStatus(notif.id, 'unseen', 'author')
                            }else{
                          notif.statusRecipient === 'unseen' ? setNotificationStatus(notif.id, 'seen', 'recipient') : setNotificationStatus(notif.id, 'unseen', 'recipient')

                            }
                          
                          setNotifications(notifications.map(curr => {
                            if(curr.id === notif.id){
                              if(notif.author === userProfile.username || (userProfile.role == 'admin' && notif.author === 'Admins')){
                              curr.statusAuthor = notif.statusAuthor === 'unseen' ? 'seen' : 'unseen'

                              }else{
                              curr.statusRecipient = notif.statusRecipient === 'unseen' ? 'seen' : 'unseen'

                              }
                            }
                            return curr;
                          }))
                           }}
                        >
                          Mark as {(userProfile?.username === notif.author ? notif.statusAuthor : notif.statusRecipient)  === 'seen' ? 'New' : 'Seen'}
                        </Button>
                      
                      </Grid>
                    </Grid>

                    <span
                      className="legendPending"
                      style={{ backgroundColor: rowColor }}
                    ></span>
                  </div>
                );
              })}



</Grid>
    </>
  )
}

export default Notifications