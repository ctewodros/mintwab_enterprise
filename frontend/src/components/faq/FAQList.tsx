import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

type FAQCategory = {
  slug: string;
  name: string;
  description: string;
  faqs: {
    id: number;
    question: string;
    answer: string;
    order: number;
  }[];
};

const FAQList = () => {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/faq/categories/');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to load FAQ data');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {categories.map((category) => (
        <Box key={category.slug} sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            <Link to={`/faq/${category.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {category.name}
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
            {category.description}
          </Typography>
          <List>
            {category.faqs.map((faq, index) => (
              <div key={faq.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={faq.question}
                    secondary={faq.answer}
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                </ListItem>
                {index < category.faqs.length - 1 && <Divider variant="middle" component="li" />}
              </div>
            ))}
          </List>
        </Box>
      ))}
    </Container>
  );
};

export default FAQList;