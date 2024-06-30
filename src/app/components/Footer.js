import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0, backgroundImage: 'url(/header-footer-image.png)', backgroundSize: 'cover' }}>
      <Toolbar />
    </AppBar>
  );
};

export default Footer;
