import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ background: "#123c36", color: "white", py: 4, mt: "auto" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 3, md: 5 }, display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>ملعبك</Typography>
        <Typography variant="body2" sx={{ opacity: 0.75 }}>
          &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
