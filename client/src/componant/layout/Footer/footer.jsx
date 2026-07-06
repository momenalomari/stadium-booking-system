import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#006722',
        color: 'white',
        py: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Stadium Booking System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
