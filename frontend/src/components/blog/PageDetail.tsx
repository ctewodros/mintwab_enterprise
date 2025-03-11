import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

type Page = {
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
};

const PageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(`/api/pages/${slug}/`);
        setPage(response.data);
        document.title = response.data.meta_title || response.data.title;
      } catch (err) {
        setError('Page not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {page?.title}
      </Typography>
      <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: page?.content || '' }} />
    </Container>
  );
};

export default PageDetail;