import  { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container ,CircularProgress } from '@mui/material';
import { useRecoilState } from 'recoil';
import { emailAtom } from '../atom';
import axios from "axios";

function Login() {
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async(event) => {
    event.preventDefault();
    setLoading(true);
   
    try {
      const response = await axios.post(
        'http://localhost:3000/user/login',
        { email, password },
        { withCredentials: true } // Include credentials if necessary
      );
      
      if (response.status === 200 || response.status === 201) {
        setError("");
        navigate("/verify");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error.response.data); // Log the error message
    }
    finally{
      setLoading(false);
    }
  };

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
          Welcome!
        </Typography>
        <Typography variant="body1" color="white" gutterBottom>
          Sign in to continue.
        </Typography>

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <CircularProgress sx={{ color: "white" }} />
            </Box>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          )}
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Log in
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

export default Login;
