import React, { useEffect, useState } from 'react';

import { ExpandLess } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import './ScrollTop.css';

const ScrollTop = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleClick = () => {
    window['scrollTo']({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });

  return (
    <i className="scroll-holder">
      {show && (
        <IconButton
          className="icon-btn"
          sx={{ backgroundColor: 'rgb(234 234 234)', fontSize: '1.7rem' }}
          onClick={handleClick}
          aria-label="to top"
          component="span"
        >
          <ExpandLess fontSize="large" />
        </IconButton>
      )}
    </i>
  );
};
export default ScrollTop;
