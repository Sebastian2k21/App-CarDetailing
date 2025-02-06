import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="home-page" style={{ backgroundColor: '#121212', color: '#d4af37', minHeight: '100vh' }}>
      <div style={{ width: "100%" }}>
        <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
              Witamy w naszym serwisie ProDetailing, gdzie znajdą Państwo usługi pielegnacyjne dla swoich pojazdów!
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
          </motion.div>
        </Container>

        <Container maxWidth="lg" sx={{ marginTop: 8, paddingBottom: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#1e1e1e', color: '#d1d1d1', boxShadow: '0px 4px 15px rgba(0,0,0,0.5)' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ color: '#d4af37', fontWeight: 'bold', marginBottom: 2 }}>
                    Mycie Premium
                  </Typography>
                  <Typography>
                    Kompleksowe czyszczenie Twojego pojazdu z najwyższą dbałością o szczegóły.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#1e1e1e', color: '#d1d1d1', boxShadow: '0px 4px 15px rgba(0,0,0,0.5)' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ color: '#d4af37', fontWeight: 'bold', marginBottom: 2 }}>
                    Ochrona Lakieru
                  </Typography>
                  <Typography>
                    Profesjonalne aplikacje powłok ceramicznych dla długotrwałej ochrony lakieru.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#1e1e1e', color: '#d1d1d1', boxShadow: '0px 4px 15px rgba(0,0,0,0.5)' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ color: '#d4af37', fontWeight: 'bold', marginBottom: 2 }}>
                    Detailing Wnętrza
                  </Typography>
                  <Typography>
                    Kompleksowa pielęgnacja wnętrza samochodu dla najwyższego komfortu podróżowania.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
