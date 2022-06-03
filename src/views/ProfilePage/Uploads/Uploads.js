import React, { useEffect, useState } from 'react';


import { Grid, Tooltip, Divider } from '@mui/material';
import Items from '../../../components/Main/Item/Item';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';


import {
  getAllExtensions,
  getExtensionById,
  getExtensionDownloads,
  deleteExtension,
  setExtensionStatus
} from '../../../services/extensions.service';

const Uploads = ({ userUploads, isOwner }) => {

  const [uploaded, setUploaded] = useState(userUploads);
  const [allExtensions, setAllExtensions] = useState([]);


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
      // return uploaded.map((upload) => {
      // <Grid key={upload.id} item>
      //   <Items
      //     key={upload.id}
      //     name={upload.title}
      //     logo={upload.logo}
      //     author={upload.author}
      //     category={upload.category}
      //     rating={3.8}
      //     downloadLink={upload.downloadLink}
      //     extId={upload.id}
      //   />

      //   {isOwner ? (
      //     <Tooltip
      //       title="Delete"
      //       placement="right"
      //       onClick={() => {
      //         deleteExtension(upload.id);
      //         setUploaded(uploaded => uploaded.filter(extension => extension.id !== upload.id))

      //       }}
      //     >
      //       <DeleteIcon sx={{ cursor: 'pointer' }} />
      //     </Tooltip>
      //   ) : null}
      // </Grid>

      <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
       
        <Divider sx={{ marginLeft: '2em', marginRight: '2em' }} />

        <div style={{display: 'flex', flexDirection: 'row', gap: '1em', justifyContent: 'center', marginTop: '0.5em', marginBottom: '0.5em'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25em'}}><span className="legendPending"></span>Pending</div> 
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25em'}}><span className="legendApproved"></span>Approved</div> 
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25em'}}><span className="legendRejected"></span>Rejected</div> 


        </div> 
        {uploaded.map((ext) => {

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
            <div style ={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em', flex: '1', justifyContent: 'space-between', marginRight: '1em'}}>
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

              <Grid item sx={{width:'11em'}}>{setDate(ext.createdOn)}</Grid>
              </div>
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
                  Edit
                </Button>
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
};

export default Uploads;
