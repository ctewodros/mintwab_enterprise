import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

interface Organization {
  id?: number;
  title: string;
  motto?: string;
  logo?: string;
  email?: string;
  website?: string;
  phone?: string;
  pobox?: string;
  street?: string;
  city?: string;
  country?: string;
}

const OrganizationInterface = () => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/organizations/');
      if (response.data.length > 0) {
        setOrganization(response.data[0]);
      } else {
        setOrganization({
          title: '',
          motto: '',
          email: '',
          website: '',
          phone: '',
          pobox: '',
          street: '',
          city: '',
          country: ''
        });
      }
    } catch (err) {
      setError('Failed to fetch organization data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const formData = new FormData();
      if (organization) {
        Object.entries(organization).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });
      }
      if (logoFile) {
        formData.append('logo', logoFile);
      }

      const method = organization?.id ? 'put' : 'post';
      const url = organization?.id 
        ? `http://localhost:8000/api/organizations/${organization.id}/`
        : 'http://localhost:8000/api/organizations/';

      const response = await axios[method](url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setOrganization(response.data);
      setSuccess('Organization data saved successfully');
    } catch (err) {
      setError('Failed to save organization data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrganization(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Organization Details
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Organization Name"
                name="title"
                value={organization?.title || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Motto"
                name="motto"
                value={organization?.motto || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="logo-file"
                type="file"
                onChange={handleLogoChange}
              />
              <label htmlFor="logo-file">
                <Button variant="contained" component="span">
                  Upload Logo
                </Button>
              </label>
              {logoFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {logoFile.name}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={organization?.email || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={organization?.website || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={organization?.phone || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="P.O. Box"
                name="pobox"
                value={organization?.pobox || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="street"
                value={organization?.street || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={organization?.city || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={organization?.country || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Save Organization'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default OrganizationInterface;