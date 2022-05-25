import React from 'react'
import './SingleExtension.css'
import './Markdown.css'

import { useState, useEffect } from 'react'
import Markdown from 'markdown-to-jsx';
import { Divider, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DownloadIcon from '@mui/icons-material/Download';
import Stack from '@mui/material/Stack'
import GitHubIcon from '@mui/icons-material/GitHub';


import markdown from '../../assets/prettierReadMe.md'
function SingleExtension() {

  const [ratingValue, setRatingValue] = useState(null);
  const [readMe, setReadMe] = useState('')

  useEffect(() => {



    fetch(markdown)
      .then(response => response.text())
      .then(text => {
        setReadMe(text);
      
      })
  }, [])





  return (
    <>
    <Grid container
    direction="column"
      sx={{
        height: 'auto',
        flexWrap: 'nowrap',
        marginTop: '50px',
        paddingBottom: '50px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
        background: 'white',
        borderRadius: '20px',
        marginBottom: '50px',
        marginLeft: '1em',
        marginRight: '1em',
        width: 'auto'
      }}
    >
     <h1 style={{marginLeft:"2em", marginBottom: "0"}}>Prettier</h1> 
     <p style={{marginLeft:"4em", marginBottom:"1em", marginTop: "0.25em", fontWeight:"bold"}}>by Prettier / v9.5.0 </p>


     <Divider sx={{marginLeft: '2em', marginRight: '2em'}} />

      <Grid container direction="row" sx={{flexWrap: "wrap", margin: "3em", width: "auto", gap: "1em"}} >
      <Grid container direction="column" sx={{gap: "1em", width: "auto", maxWidth: '18em'}} >
        <Grid item>
          <img src={'https://prettier.io/icon.png'} alt="Extension logo" style={{maxWidth: '100%', maxHeight: '100%'}} />
        </Grid>

        <Grid item>
        <Rating
            name="simple-controlled"
            value={ratingValue}
            size="large"
            onChange={(_, newValue) => {
              setRatingValue(newValue);
            }}
          />
        </Grid>


            <h4 style={{marginTop: '0.25em', marginBottom:'0.25em'}}>Tags</h4>
        <Grid container direction="row" sx={{gap: '0.25em'}}>
        <Chip label="css" /> 
        <Chip label="styled-jsx" /> 
        <Chip label="javascript" /> 
        <Chip label="ts" /> 
        <Chip label="typescript" />
        <Chip label="formatter" /> 
        <Chip label="scss" /> 
        <Chip label="styled-components" /> 
        <Chip label="html" /> 
        <Chip label="php" /> 

        </Grid>
      </Grid>
     <Divider orientation="vertical" flexItem/>

        <Grid container direction="column" sx={{gap: "1em", width: "65vw", alignItems: "flex-start"}} >
        <Grid container direction="row" sx={{alignItems: 'center', gap: '1em'}}>
        <Button variant="outlined" startIcon={<GitHubIcon />}>
          Repository
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Download
        </Button>
          <p> 1 521 downloads</p>

          
        </Grid>


 


        <Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={2}
>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

  <p style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.25em'}}>Open Issues </p>
  <p style={{fontSize: '1.3rem', fontWeight: 'bold'}}>13</p> 
  
  </div>

  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  
  <p style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.25em'}}>Pull Requests </p>
  <p style={{fontSize: '1.3rem', fontWeight: 'bold'}}>78</p> 
  
  </div>

  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  
  <p style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.25em'}}>Last Commit</p>
  <p style={{fontSize: '1.3rem', fontWeight: 'bold'}}> 3 days ago</p> 
  
  </div>

</Stack>

      <article className="markdown-body" style={{maxWidth: '100%', overflow: 'auto'}}>
        <Markdown children={readMe} />
        </article>


        </Grid>
      </Grid>
    </Grid>
    </>
  )
}

export default SingleExtension