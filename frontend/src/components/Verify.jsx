import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { emailAtom } from '../atom'; // Adjust the import based on your file structure
import axios from 'axios';

function Verify() {
  const [otp, setOtp] = useState(''); // Initialize OTP state
  const [error, setError] = useState('');
  const email = useRecoilValue(emailAtom); // Get the email from Recoil
  const navigate = useNavigate();

  const handleVerify = async (event) => {
   event.preventDefault();
   const newotp = Number(otp);
   try {
     const response = await axios.post(
       'http://localhost:3000/user/verify',
       { email, otp:newotp },
       { withCredentials: true } // Include credentials if necessary
     );
     
     console.log(response.data); // Check response
     navigate('/'); // Navigate on success
   } catch (error) {
     console.error('Error:', error.response.data); // Log the error message
   }
 }

  return (
    <Container maxWidth="xs" sx={{ marginTop: '100px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Typography variant="h4" component="h1" color="white" gutterBottom>
          OTP Verification
        </Typography>
        <Typography variant="body1" color="white" gutterBottom>
          Enter OTP for {email}
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleVerify} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="OTP"
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{
              input: { color: 'white' },
              '& label': { color: 'white' },
              '& label.Mui-focused': { color: '#1976d2' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: '#1976d2' },
                '&.Mui-focused fieldset': { borderColor: '#1976d2' },
              },
            }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Verify
          </Button>
        </Box>

        <Typography color="white">
          Do not have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Verify;
