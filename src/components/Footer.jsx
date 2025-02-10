import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} JobPost. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
          <Link to="/privacy" style={{ margin: isMobile ? '0.5rem 0' : '0 1rem', color: 'inherit', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={{ margin: isMobile ? '0.5rem 0' : '0 1rem', color: 'inherit', textDecoration: 'none' }}>
            Terms of Service
          </Link>
          <Link to="/about" style={{ margin: isMobile ? '0.5rem 0' : '0 1rem', color: 'inherit', textDecoration: 'none' }}>
            About Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
