import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const AlertUser = ({ error, msg, type , setError}) => {
  const [open, setOpen] = useState(error);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setError(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{ height: '20%' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          sx={{ width: '100%', fontSize: '18px' }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertUser;
