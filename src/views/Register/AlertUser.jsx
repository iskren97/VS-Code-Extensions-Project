import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const AlertUser = ({ msg, type, err, setErr }) => {
  const [open, setOpen] = useState(err);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErr(false);
  };

  return (
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
  );
};

export default AlertUser;
