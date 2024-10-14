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
const StyledCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

// Stylizacja przycisków
const StyledButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#125bb5',
  },
  borderRadius: '20px',
});

// Stylizacja tytułu
const StyledTypography = styled(Typography)({
  fontWeight: 'bold',
  color: '#333',
});

const ServiceItem = ({ service, editable = false }) => {
  const navigate = useNavigate();

  return (
    <StyledCard sx={{ width: 345, margin: '16px' }}>
      <CardMedia
        sx={{ height: 140, borderRadius: '12px 12px 0 0' }}
        image={service.image}
        title={service.name}
      />
      <CardContent>
        <StyledTypography gutterBottom variant="h5" component="div">
          {service.name}
        </StyledTypography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {service.description}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: '8px' }}>
          Price: {service.price} zł
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '4px' }}>
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
