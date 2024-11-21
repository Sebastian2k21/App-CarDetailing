import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiClient } from "../api/ApiClientContext";
import ServiceCalendar from "./ServiceCalendar";


const ServiceDetails = () => {
    const {id} = useParams()
    const apiClient = useApiClient()
    const [service, setService] = useState(null)

    const getService = async () => {
        const service = await apiClient.getService(id)
        setService(service)
    }

    const submitService = async (date, carId) => {
        return await apiClient.submitSchedule({service_id: service._id, date: date, car_id: carId})
    }

    useEffect(() => {
        getService()
    }, []) 

    if(!service) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mt-5">
      <div className="row justify-content-center">
      <Box className="col-md-8" sx={{ p: 4, margin: 'auto', boxShadow: 3, borderRadius: 2 }}>
  <Grid container spacing={2} alignItems="center" justifyContent="space-around">
  
    <Grid 
      item xs={12} sm={4} 
      container
      alignItems="center"  
      justifyContent="center"
    >
              <Typography variant="h4" component="h1" gutterBottom>
        {service.name}
      </Typography>
      <Avatar
        src={service.image}
        alt="service logo"
        variant="rounded"
        sx={{ width: '100%', height: 'auto' }}
      />
    </Grid>

    
    <Grid 
      item xs={12} sm={4} 
      container
      direction="column"
      alignItems="center"  
      justifyContent="center" 
    >

      <Typography variant="body1" gutterBottom>
        {service.description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {service.price} zł
      </Typography>
      <Typography variant="body2">
        Detailing by: {service.detailer.username}
      </Typography>
    </Grid>

 
    <Grid item xs={12}>
      <ServiceCalendar serviceId={service._id} onRequest={submitService} />
    </Grid>
  </Grid>
</Box>

    </div>
    </div>
    );
}

export default ServiceDetails;