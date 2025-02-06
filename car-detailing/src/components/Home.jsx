import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

const Home = () => {
  return (
    <div className="home-page" style={{ backgroundColor: '#121212', color: '#d4af37' }}>
    
    <div style={{width: "100%"}}>
      <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: 10 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#d4af37', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
          }}
        >
          ProDetailing
        </Typography>
        <Typography
          variant="h6"
          paragraph
          sx={{
            color: '#d1d1d1', 
            marginBottom: 4,
            lineHeight: 1.8,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Witamy w naszym serwisie ProDetailing, gdzie znajdą Państwo najlepsze studia detailingowe!
        </Typography>

        <Button
          component={Link}
          to="/services"
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            padding: '12px 24px',
            borderRadius: 3,
            boxShadow: '0px 4px 15px rgba(212, 175, 55, 0.5)', 
            fontSize: '1.1rem',
            backgroundColor: '#d4af37',
            '&:hover': {
              backgroundColor: '#c49c2f', 
              boxShadow: '0px 6px 20px rgba(212, 175, 55, 0.7)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          Wybierz Usługę
        </Button>
      </Container>

      </div>
    </div>
  );
};

export default Home;
