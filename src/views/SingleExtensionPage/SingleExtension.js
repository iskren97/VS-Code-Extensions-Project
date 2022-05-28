import React from 'react'
import './SingleExtension.css'
import './Markdown.css'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { Divider, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DownloadIcon from '@mui/icons-material/Download';
import Stack from '@mui/material/Stack'
import GitHubIcon from '@mui/icons-material/GitHub';
import { getExtensionById } from '../../services/extensions.service.js'



import markdown from '../../assets/prettierReadMe.md'

function SingleExtension() {

  const [ratingValue, setRatingValue] = useState(null);
  const [readMe, setReadMe] = useState('')
  const [extensionInfo, setExtensionInfo] = useState('')  

  const { id } = useParams();



  const getReadMe = async () => {
    let headersList = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer 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"
     }
     
     fetch("https://api.github.com/repos/prettier/prettier-vscode/readme", { 
       method: "GET",
       headers: headersList
     }).then(function(response) {
       return response.json();
     }).then(function(data) {

       setReadMe(decodeURIComponent(escape(window.atob(data.content))));

       console.log(data)
     })


  }





  

  useEffect(() => {
    getExtensionById(id).then((data)=> setExtensionInfo(data))
    getReadMe();
   

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
     <h1 style={{marginLeft:"2em", marginBottom: "0"}}>{extensionInfo.title}</h1> 
     <p style={{marginLeft:"4em", marginBottom:"1em", marginTop: "0.25em", fontWeight:"bold"}}>by {extensionInfo.author} / v9.5.0 </p>


     <Divider sx={{marginLeft: '2em', marginRight: '2em'}} />

      <Grid container direction="row" sx={{flexWrap: "wrap", margin: "3em", width: "auto", gap: "1em"}} >
      <Grid container direction="column" sx={{gap: "1em", width: "auto", maxWidth: '18em'}} >
        <Grid item>
          <img src={extensionInfo.logo} alt="Extension logo" style={{maxWidth: '100%', maxHeight: '100%'}} />
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
        {extensionInfo?.tags?.map((tag) =>{
          return <Chip label={tag}  />
        })}


        </Grid>
      </Grid>
     <Divider orientation="vertical" flexItem/>

        <Grid container direction="column" sx={{gap: "1em", width: "65vw", alignItems: "flex-start"}} >
        <Grid container direction="row" sx={{alignItems: 'center', gap: '1em'}}>
        <Button onClick={(e) =>{
          e.preventDefault();
          // window.location.href = extensionInfo.repoUrl
          window.open(extensionInfo.repoUrl, '_blank');
        } } variant="outlined" startIcon={<GitHubIcon />}>
          Repository
        </Button>
        <Button onClick={(e)=>{
          window.location.href = extensionInfo.downloadLink
        }} variant="outlined" startIcon={<DownloadIcon />}>
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
        <Markdown children={readMe || ''} />
        </article>

        </Grid>
      </Grid>
    </Grid>
    </>
  )
}

export default SingleExtension