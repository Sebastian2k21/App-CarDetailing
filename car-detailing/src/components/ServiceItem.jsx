import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Tworzenie stylizowanego komponentu Card
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
  backgroundColor: '#1a1a1a', // Ciemne tło karty
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 40px rgba(0,0,0,0.15)',
  },
  color: '#d4af37', // Złoty tekst
}));

// Stylizacja przycisków
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#d4af37',
  color: '#333',
  '&:hover': {
    backgroundColor: '#c89f2b',
  },
  borderRadius: '20px',
  margin: '0 8px',
}));

// Stylizacja tytułu
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#d4af37', // Złoty tytuł
}));

const ServiceItem = ({ service, editable = false }) => {
  const navigate = useNavigate();

  return (
    <StyledCard sx={{ width: 345, margin: '16px' }}>
      <CardMedia
        sx={{ height: 140, borderRadius: '12px 12px 0 0' }}
        image={service.image ? service.image : '/gear.png'}
        title={service.name ? service.name : 'Service'}
      />
      <CardContent>
        <StyledTypography gutterBottom variant="h5" component="div">
          {service.name}
        </StyledTypography>
        <Typography variant="body2" sx={{ color: '#d1d1d1' }}>
          {service.description}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: '8px', color: '#d4af37' }}>
          Price: {service.price} zł
        </Typography>
        <Typography variant="body2" sx={{ color: '#d1d1d1', marginTop: '4px' }}>
          Offered by: {service.detailer.username}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <StyledButton onClick={() => navigate(`/services/${service._id}`)} size="small">Details</StyledButton>
        {editable && <StyledButton onClick={() => navigate(`/services/${service._id}/update`)} size="small">Update</StyledButton>}
      </CardActions>
    </StyledCard>
  );
};

export default ServiceItem;
