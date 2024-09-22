import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false); // State for loader
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login/logout
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading once route change is complete
      setIsLoggedIn(true); // Simulate login state change
      navigate('/login'); // Navigate to login page after loading
    }, 1500); // Simulate a delay for the loader
  };

  const handleLogoutClick = () => {
    // Simulate logout process
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(false); // Simulate logout state change
      navigate('/'); // Navigate to home or another route after logout
    }, 1000);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MyWebsite
          </Typography>
          <Typography textAlign="center">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
          </Typography>

          <div style={{ flexGrow: 1 }} />

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
              <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {isLoggedIn ? (
              // Show logout option if the user is logged in
              <MenuItem onClick={handleLogoutClick}>
                <Typography textAlign="center" sx={{ display: 'flex', alignItems: 'center' }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      Logging out...
                    </Box>
                  ) : (
                    'Logout'
                  )}
                </Typography>
              </MenuItem>
            ) : (
              // Show login option if the user is not logged in
              <MenuItem onClick={handleLoginClick}>
                <Typography textAlign="center" sx={{ display: 'flex', alignItems: 'center' }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      Logging in...
                    </Box>
                  ) : (
                    'Login'
                  )}
                </Typography>
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
