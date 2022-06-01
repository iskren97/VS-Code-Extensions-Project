import React, { useEffect } from 'react';
import AppContext from '../../../providers/AppContext';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Divider, Grid } from '@mui/material';

import Button from '@mui/material/Button';

import './AdminPanel.css'

import {
  getAllExtensions,
  getExtensionById,
  getExtensionDownloads,
  deleteExtension,
  setExtensionStatus
} from '../../../services/extensions.service';

function AdminPanel() {
  const [allExtensions, setAllExtensions] = useState([]);




  useEffect(() => {
    getAllExtensions().then((ext) => setAllExtensions(ext));
  }, []);

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
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
            margin: '1em',
          }}
        >
          <Button variant="contained" color="primary">
            Extensions{' '}
          </Button>

          <Button variant="contained" color="primary">
            Users{' '}
          </Button>

          <Button variant="contained" color="primary">
            Pending Requests{' '}
          </Button>
        </div>

        <Divider sx={{ marginLeft: '2em', marginRight: '2em' }} />

        <div style={{display: 'flex', flexDirection: 'row', gap: '1em', justifyContent: 'center', marginTop: '0.5em', marginBottom: '0.5em'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25em'}}><span className="legendPending"></span>Pending</div> 
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25em'}}><span className="legendApproved"></span>Approved</div> 
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25em'}}><span className="legendRejected"></span>Rejected</div> 


        </div> 
        {allExtensions.map((ext) => {

          let rowColor = ''

          switch(ext.status){
            case 'pending':
              rowColor = 'rgb(229, 255, 0)'
              break;
            case 'approved':
              rowColor = 'rgb(0, 255, 42)'
              break;
            case 'rejected':
              rowColor = 'rgb(255, 102, 0)'
              break;
              default:
              break;
          }

          return (
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
              <Grid item>
                <img
                  src={ext.logo}
                  alt="extension"
                  width="35rem"
                  height="35rem"
                />
              </Grid>

              <Grid item>{ext.title}</Grid>

              <Grid item>{ext.author}</Grid>

              <Grid item>{setDate(ext.createdOn)}</Grid>

              <Grid
                item
                sx={{ display: 'flex', flexDirection: 'row', gap: '0.25em' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    window.location.href = `/extensions/${ext.id}`;
                  }}
                >
                  View
                </Button>
                {ext.status === 'pending' ? (
                  <>
                  <Button
                  variant="contained"
                  color="success"
                  onClick={() => {

                    setExtensionStatus(ext.id, 'approved')


                  setAllExtensions(allExtensions.map((extension) => {
                    if(extension.id === ext.id) {
                     extension.status = 'approved' 
                    }
                    return extension
                  }))
                  }
                  }
                >
                  APPROVE
                </Button>


                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    setExtensionStatus(ext.id, 'rejected')
                  setAllExtensions(allExtensions.map((extension) => {
                    if(extension.id === ext.id) {
                      extension.status = 'rejected'
                    }
                    return extension
                  }))               
                  }
                  }
                >
                  REJECT
                </Button>
                </>
                 ) : null
                  
                  }

                  {ext.status === 'rejected' ? (
                  <>
                  <Button
                  variant="contained"
                  color="success"
                  onClick={() => {

                    setExtensionStatus(ext.id, 'approved')


                  setAllExtensions(allExtensions.map((extension) => {
                    if(extension.id === ext.id) {
                     extension.status = 'approved' 
                    }
                    return extension
                  }))
                  }
                  }
                >
                  APPROVE
                </Button>
                </>
                 ) : null
                  }

                  {ext.status === 'approved' ? (
                  <>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    setExtensionStatus(ext.id, 'rejected')
                  setAllExtensions(allExtensions.map((extension) => {
                    if(extension.id === ext.id) {
                      extension.status = 'rejected'
                    }
                    return extension
                  }))               
                  }
                  }
                >
                  REJECT
                </Button>
                </>
                 ) : null
                  
                  }
               

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    deleteExtension(ext.id);
                    setAllExtensions(allExtensions => allExtensions.filter(extension => extension.id !== ext.id))
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
                <span className="legendPending" style={{backgroundColor: rowColor }}></span>
                </div>
          );
        })}
      </Grid>
    </>
  );
}

export default AdminPanel;
