import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  LinearProgress,
  Stack,
  useTheme
} from '@mui/material';
import {
  Article as ArticleIcon,
  People as PeopleIcon,
  QuestionAnswer as FAQIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { useAuth } from '../auth/AuthContext';
import { useOrganization } from '../organization/OrganizationContext';

// Mock data for dashboard widgets
const recentActivities = [
  { id: 1, type: 'blog', title: 'New blog post published', time: '2 hours ago', icon: <ArticleIcon color="primary" /> },
  { id: 2, type: 'faq', title: 'FAQ section updated', time: '1 day ago', icon: <FAQIcon color="secondary" /> },
  { id: 3, type: 'user', title: 'New user registered', time: '2 days ago', icon: <PeopleIcon color="success" /> },
  { id: 4, type: 'organization', title: 'Organization details updated', time: '3 days ago', icon: <BusinessIcon color="info" /> },
];

const metrics = [
  { id: 1, title: 'Total Users', value: 254, change: '+12%', trend: 'up' },
  { id: 2, title: 'Blog Posts', value: 45, change: '+5%', trend: 'up' },
  { id: 3, title: 'FAQ Items', value: 28, change: '+2%', trend: 'up' },
  { id: 4, title: 'Page Views', value: 12540, change: '-3%', trend: 'down' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { organization } = useOrganization();
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Card */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              p: 3, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              color: 'white'
            }}
          >
            {organization?.logo && (
              <Avatar
                src={organization.logo}
                alt={organization.title}
                sx={{ width: 64, height: 64, border: '2px solid white' }}
              />
            )}
            <Box>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                {organization?.title ? `Welcome to ${organization.title}` : 'Welcome to Your Dashboard'}
              </Typography>
              {organization?.motto && (
                <Typography variant="subtitle1">
                  {organization.motto}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Metrics Cards */}
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.id}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {metric.title}
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {metric.value.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  {metric.trend === 'up' ? (
                    <TrendingUpIcon color="success" fontSize="small" />
                  ) : (
                    <TrendingDownIcon color="error" fontSize="small" />
                  )}
                  <Typography 
                    variant="body2" 
                    sx={{ ml: 0.5, color: metric.trend === 'up' ? 'success.main' : 'error.main' }}
                  >
                    {metric.change}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* User Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: theme.palette.primary.main }}>{user?.first_name?.[0] || 'U'}</Avatar>}
              title="User Information"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <Typography variant="body1" fontWeight="medium">
                Welcome, {user?.first_name} {user?.last_name}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Username: {user?.username}
              </Typography>
              <Typography color="text.secondary">
                Email: {user?.email}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Profile Completion
                </Typography>
                <LinearProgress variant="determinate" value={80} sx={{ height: 8, borderRadius: 4 }} />
                <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}>
                  80% Complete
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Organization Details */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardHeader
              avatar={<BusinessIcon color="primary" />}
              title="Organization Details"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              {organization ? (
                <>
                  <Typography variant="body1" fontWeight="medium">
                    Contact Information:
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
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
                    {(organization.street || organization.city || organization.country) && (
                      <Typography color="text.secondary">
                        Address: {[organization.street, organization.city, organization.country]
                          .filter(Boolean)
                          .join(', ')}
                      </Typography>
                    )}
                  </Stack>
                </>
              ) : (
                <Typography color="text.secondary">
                  No organization information available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardHeader
              title="Recent Activities"
              action={
                <IconButton aria-label="notifications">
                  <NotificationsIcon />
                </IconButton>
              }
            />
            <Divider />
            <List sx={{ p: 0 }}>
              {recentActivities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {activity.icon}
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.title}
                      secondary={activity.time}
                    />
                  </ListItem>
                  {activity.id !== recentActivities.length && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;