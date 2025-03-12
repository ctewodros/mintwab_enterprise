import React from 'react';
import { Box, Container, Typography, Paper, Grid, Avatar } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useOrganization } from '../organization/OrganizationContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { organization } = useOrganization();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            {organization?.logo && (
              <Avatar
                src={organization.logo}
                alt={organization.title}
                sx={{ width: 64, height: 64 }}
              />
            )}
            <Box>
              <Typography variant="h4" gutterBottom>
                {organization?.title || 'Welcome'}
              </Typography>
              {organization?.motto && (
                <Typography variant="subtitle1" color="text.secondary">
                  {organization.motto}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
            <Typography>
              Welcome, {user?.first_name} {user?.last_name}
            </Typography>
            <Typography color="text.secondary">
              Username: {user?.username}
            </Typography>
            <Typography color="text.secondary">
              Email: {user?.email}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Organization Details
            </Typography>
            {organization ? (
              <>
                <Typography>
                  Contact Information:
                </Typography>
                {organization.email && (
                  <Typography color="text.secondary">
                    Email: {organization.email}
                  </Typography>
                )}
                {organization.phone && (
                  <Typography color="text.secondary">
                    Phone: {organization.phone}
                  </Typography>
                )}
                {organization.website && (
                  <Typography color="text.secondary">
                    Website: {organization.website}
                  </Typography>
                )}
              </>
            ) : (
              <Typography color="text.secondary">
                No organization information available
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;