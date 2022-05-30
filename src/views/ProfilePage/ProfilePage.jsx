import React from 'react'
import AppContext from '../../providers/AppContext';
import {useState, useContext} from 'react'
import { useParams } from 'react-router-dom';

import './ProfilePage.css'

import Header from '../../components/Header/Header'
import { Divider, Grid } from '@mui/material';
import Button from '@mui/material/Button';

import Items from '../../components/Main/Item/Item'
import defaultAvatar from '../../assets/avatar.jpg';

function ProfilePage() {

  const { user, userData, setContext } = useContext(AppContext);

  const [activeView, setActiveView] = useState('Info')

  console.log(activeView)

  const { username } = useParams();



  return (
    <>
    <Header />
    <div style={{ marginTop: '10em' }}>
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
     <h1 style={{marginLeft:"2em"}}>{userData?.username}</h1> 



     <Divider sx={{marginLeft: '2em', marginRight: '2em'}} />

      <Grid container direction="row" sx={{flexWrap: "wrap", margin: "3em", width: "auto", gap: "1em"}} >
      <Grid container direction="column" sx={{gap: "1em", width: "auto", maxWidth: '18em'}} >
        <Grid item>
          <img src={userData?.avatar ? userData.avatar : defaultAvatar} alt="Profile Picture" style={{maxWidth: '100%', maxHeight: '100%'}} />
        </Grid>

        <Grid item sx={{display: 'flex', flexDirection: 'column',gap: '1em'}}>
        <Button onClick={()=> setActiveView('Info')} variant="contained">
          Info
        </Button>

        <Button onClick={()=> setActiveView('Inbox')} variant="contained">
          Inbox
        </Button>

        <Button onClick={()=> setActiveView('Uploads')} variant="contained">
          Uploads
        </Button>

        <Button onClick={()=> setActiveView('Likes')} variant="contained">
          Likes
        </Button>

        <Button onClick={()=> setActiveView('Downloads')} variant="contained">
          Downloads
        </Button>
        </Grid>
      </Grid>
     <Divider orientation="vertical" flexItem/>

        <Grid container direction="column" sx={{gap: "1em", width: "65vw", alignItems: "flex-start"}} >
       
       <h1>{activeView}</h1>


        <Grid container direction="row" spacing={2} className="item-grid">
            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} author={'Prettier Inc'} category={'Code formatter'} rating={3.8} downloadLink={'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'}/>
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} author={'Prettier Inc'} category={'Code formatter'} rating={3.8} downloadLink={'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'}/>
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} author={'Prettier Inc'} category={'Code formatter'} rating={3.8} downloadLink={'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'}/>
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} author={'Prettier Inc'} category={'Code formatter'} rating={3.8} downloadLink={'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'}/>
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} author={'Prettier Inc'} category={'Code formatter'} rating={3.8} downloadLink={'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'}/>
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} author={'Prettier Inc'} category={'Code formatter'} rating={3.8} downloadLink={'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'}/>
            </Grid>

            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} author={'Prettier Inc'} category={'Code formatter'} rating={3.8} downloadLink={'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'}/>
            </Grid>
            
            <Grid item>
              <Items name={'Prettier'} logo={'https://prettier.io/icon.png'} author={'Prettier Inc'} category={'Code formatter'} rating={3.8} downloadLink={'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode'}/>
            </Grid>


          </Grid>

        </Grid>
      </Grid>
    </Grid>
    
    </div>
    </>
  )
}

export default ProfilePage