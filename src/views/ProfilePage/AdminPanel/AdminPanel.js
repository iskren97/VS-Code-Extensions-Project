import React, { useEffect } from 'react';
import AppContext from '../../../providers/AppContext';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';


import { Divider, Grid } from '@mui/material';

import Button from '@mui/material/Button';

import {
  getAllExtensions,
  getExtensionById,
  getExtensionDownloads,
} from '../../../services/extensions.service';

function AdminPanel() {
const [allExtensions, setAllExtensions] = useState([])
  useEffect(() => {

    getAllExtensions().then((ext) =>
      setAllExtensions(ext)
    );
  }, []);

  console.log(allExtensions)



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
<div style={{display: 'flex', flexDirection: 'row', gap:'1em', margin:'1em'}}>
<Button
            variant="contained"
            color="primary"
            
          >Extensions </Button>


<Button
            variant="contained"
            color="primary"
            
          >Users </Button>

<Button
            variant="contained"
            color="primary"
            
          >Pending Requests </Button>

</div>
<Divider sx={{ marginLeft: '2em', marginRight: '2em' }} />

  {allExtensions.map((ext) =>{
    return ((

    <Grid
        container 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{margin: '0.25em', padding: '0.5em', backgroundColor: 'lightGray', borderRadius: '0.5em'}}
        >

        <Grid item>
          <img src={ext.logo} alt="extension" width="35rem" height="35rem" />
        </Grid>
        <Grid item>
          {ext.title}
        </Grid>

        <Grid item>
        {ext.author}
        </Grid>

        <Grid item>
        {setDate(ext.createdOn)}
        </Grid>

        <Grid item sx={{display: 'flex', flexDirection: 'row', gap: '0.25em'}}>
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
            color="success"
            onClick={() => {
              window.location.href = `/extensions/${ext.id}`;
            }}
          >
            Approve
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              window.location.href = `/extensions/${ext.id}`;
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    ))
  })}
    
</Grid>
</>
  )
}

export default AdminPanel