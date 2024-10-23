import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

const Home = () => {
  return (
    <div className="home-page" style={{ backgroundColor: '#121212', color: '#d4af37' }}>
      {/* Nagłówek strony */}
      <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: 10 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#d4af37', // Złoty nagłówek
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Cień dla lepszego efektu
            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
          }}
        >
          ProDetailing
        </Typography>
        <Typography
          variant="h6"
          paragraph
          sx={{
            color: '#d1d1d1', // Jasny szary tekst
            marginBottom: 4,
            lineHeight: 1.8,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Witamy w naszym serwisie ProDetailing, gdzie znajdą Państwo najlepsze studia detailingowe! Zaufaj nam, a Twój samochód zyska nowy blask.
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
            boxShadow: '0px 4px 15px rgba(212, 175, 55, 0.5)', // Złoty cień
            fontSize: '1.1rem',
            backgroundColor: '#d4af37', // Złoty przycisk
            '&:hover': {
              backgroundColor: '#c49c2f', // Ciemniejszy złoty przy hover
              boxShadow: '0px 6px 20px rgba(212, 175, 55, 0.7)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          Wybierz Usługę
        </Button>
      </Container>

      {/* Sekcja stopki */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#1f1f1f', // Ciemniejsze tło stopki
          color: '#d4af37', // Złoty tekst
          py: 5,
          textAlign: 'center',
          marginTop: 10,
          boxShadow: '0px -10px 20px rgba(212, 175, 55, 0.3)', // Złoty cień
          position: 'relative',
          width: '100%', // Ustawienie na pełną szerokość
          bottom: 0, // Przypięcie do dolnej części strony
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ mb: 2 }}>
            &copy; {new Date().getFullYear()} ProDetailing. Wszystkie prawa zastrzeżone.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Link
              to="/privacy-policy"
              style={{
                textDecoration: 'none',
                color: '#d4af37', // Złoty akcent
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease-in-out',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#fff')} // Zmiana koloru przy hover
              onMouseLeave={(e) => (e.target.style.color = '#d4af37')}
            >
              Polityka prywatności
            </Link>
            |
            <Link
              to="/terms-of-service"
              style={{
                textDecoration: 'none',
                color: '#d4af37', // Złoty akcent
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease-in-out',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#fff')} // Zmiana koloru przy hover
              onMouseLeave={(e) => (e.target.style.color = '#d4af37')}
            >
              Warunki użytkowania
            </Link>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
