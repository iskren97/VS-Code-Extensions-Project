export const containerStyle = {
  height: 'auto',
  marginTop: '50px',
  paddingBottom: '50px',
  background: 'rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
};
export const dividerStyle = {
  marginBottom: '30px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
};

export const headerContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  contentAlign: 'center',
  marginTop: '1em',
  marginBottom: '1em',
}

export const headerButton = {
  textDecoration: 'none',
  background: 'transparent',
  color: 'white !important',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
  marginRight: '0.5em',
}

export const singleExtensionButton = { textDecoration: 'none',
background: 'transparent',

border: '1px solid rgba(255, 255, 255, 0.3)',
borderRadius: '16px',
color: 'black'

}


export const commitRow = {
  '@media (max-width: 480px)' : {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1em',
    margin: '0px',

  }
}

export const mainWidth = {
  '@media (max-width: 2048px)' :{
    gap: '1em',
    width: '63%',
    alignItems: 'flex-start' 
  },


  '@media (max-width: 1024px)' :{
    width: '50%',
  },

  '@media (max-width:768px)' : {
    width: '100%',
  },

}

export const infoColumn = {
  '@media (max-width: 2048px)' :{
    gap: '1em', 
    width: 'auto', 
    maxWidth: '18em'
  },


  '@media (max-width:768px)' : {
    width: '100%',
    maxWidth: 'none',
  },

}

export const tabStyle = {
  '@media (max-width: 1024px)': {
    gap: '1em',
    width: '40vw',
    alignItems: 'flex-start',
  },
  '@media (max-width: 768px)': {
    gap: '1em',
    width: '40vw',
    alignItems: 'flex-start',
  },
  '@media (max-width: 425px)': {
    gap: '1em',
    width: 'auto',
    alignItems: 'flex-start',
  },

  '@media (min-width: 1280px)': {
    gap: '1em',
    width: '50vw',
    alignItems: 'flex-start',
  },
};


export const profileButton = {
  textDecoration: 'none',
  background: 'transparent',
  color: 'white',
  fontWeight: 'bold',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
}


export const profileUploadsButton = {
  textDecoration: 'none',
  background: 'transparent',
  color: 'white !important',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '12px',
}


export const notificationLegendContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.25em',
  color: 'white',
}