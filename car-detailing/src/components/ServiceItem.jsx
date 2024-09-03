import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const ServiceItem = ({ service, editable=false }) => {
    const navigate = useNavigate()

    return (
        // <div class="service-border">
        //     {service.name} {service.price}zł {service.description} 
        //     <img width="50px" src={service.image} alt="service logo"></img>
        //     ({service.detailer.username})
        //     <button onClick={e => navigate(`/services/${service._id}`)}>Details</button>
        //     {editable && <button onClick={e => navigate(`/services/${service._id}/update`)}>Update</button>}
        // </div>
     
            <Card sx={{ width: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={service.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {service.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {service.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={e => navigate(`/services/${service._id}`)} size="small">Details</Button>
                {editable && <Button onClick={e => navigate(`/services/${service._id}/update`)} size="small">Update</Button>}
              </CardActions>
            </Card>
          );
    
}

export default ServiceItem;