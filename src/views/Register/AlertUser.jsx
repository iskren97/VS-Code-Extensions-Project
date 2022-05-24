import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const AlertUser = ({ msg }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
          severity="error"
          sx={{ width: '100%', fontSize: '18px' }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertUser;
