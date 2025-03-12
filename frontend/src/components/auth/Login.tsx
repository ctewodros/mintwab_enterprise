import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Alert, Avatar, Link } from '@mui/material';
import apiClient from '../../apiClient';
import { useOrganization } from '../organization/OrganizationContext';

interface LoginData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { organization } = useOrganization();
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.post('/api/auth/token/', formData);
      localStorage.setItem('access_token', data.access);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      await organization?.fetchOrganization();
      navigate('/');
    } catch (err: any) {
      if (err.response?.data?.non_field_errors) {
        setError(err.response.data.non_field_errors.join(' '));
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {organization?.logo && (
          <Avatar
            src={organization.logo}
            alt={organization.title}
            sx={{ width: 96, height: 96, mb: 2 }}
          />
        )}
        <Typography component="h1" variant="h5" gutterBottom>
          {organization?.title || 'Welcome'}
        </Typography>
        {organization?.motto && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {organization.motto}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
              sx={{ textDecoration: 'none' }}
            >
              Forgot password?
            </Link>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              sx={{ textDecoration: 'none' }}
            >
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;