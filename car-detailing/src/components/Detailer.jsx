import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import CommonList from "./common/CommonList";
import ServiceItem from "./ServiceItem";
import LoadingSpinner from "./common/LoadingSpinner";
import CommonForm from "./common/CommonForm";
import ServiceDaysInput from "./ServiceDaysInput";
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';  // Import for button component

const ADD_SERVICE_FORM_FIELDS = [
    {"name": "name", "label": "Name", "type": "text"},
    {"name": "description", "label": "Description", "type": "text"},
    {"name": "price", "label": "Price", "type": "number"},
    {"name": "duration", "label": "Duration", "type": "number"},
    {"name": "image", "label": "Image", "type": "file"},
]

const Detailer = () => {
    const [services, setServices] = useState([]);
    const [serviceFormShow, setServiceFormShow] = useState(false);
    const apiClient = useApiClient();

    const getServices = useCallback(async () => {
        const services = await apiClient.getDetailerServices();
        if(services) {
            setServices(services);
        }
    }, [setServices]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getServices();
    }, [getServices]);

    const onAddService = async (formData) => {
        const success = await apiClient.addService(formData);
        if(success) {
            getServices();
        }
    };

    const validateServiceForm = (formData) => {
        console.log(formData);
        return formData.name && formData.description && formData.price && formData.duration;
    };

    const toggleShowServiceForm = () => {
        setServiceFormShow(!serviceFormShow);
    };

    return (
        <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff', padding: '20px', borderRadius: '10px' }}>
            <h1 style={{ color: '#d4af37' }}>Detailer</h1>
            <h2 style={{ color: '#d4af37' }}>Services</h2>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={toggleShowServiceForm} 
                style={{
                    backgroundColor: '#d4af37', 
                    color: '#1a1a1a', 
                    marginBottom: '20px',
                    '&:hover': {
                        backgroundColor: '#b88c2a',
                    },
                }}
            >
                New Service
            </Button>

            {serviceFormShow &&
                <div style={{ marginBottom: '20px' }}>
                    <CommonForm 
                        key="add_service_form"
                        fields={ADD_SERVICE_FORM_FIELDS}
                        data={{}} 
                        title="Add Service" 
                        onSubmit={onAddService} 
                        validator={validateServiceForm} 
                        otherComponents={[ServiceDaysInput]}
                        formStyle={{
                            backgroundColor: '#333333', 
                            color: '#ffffff', 
                            padding: '20px', 
                            borderRadius: '10px'
                        }} 
                    />
                </div>
            }

            <div>
                <LoadingSpinner statement={services}>
                    <Grid container spacing={2}>
                        {services.map(service => (
                            <ServiceItem 
                                key={service._id} 
                                service={service} 
                                editable={true} 
                                style={{
                                    backgroundColor: '#333333', 
                                    padding: '10px', 
                                    borderRadius: '5px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                                }} 
                            />
                        ))}
                    </Grid>
                </LoadingSpinner>
            </div>
        </div>
    );
};

export default Detailer;
