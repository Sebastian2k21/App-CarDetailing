import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import CommonForm from "./common/CommonForm";
import ServiceDaysInput from "./ServiceDaysInput";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./common/LoadingSpinner";
import Button from '@mui/material/Button';  // Import for button component

const ADD_SERVICE_FORM_FIELDS = [
    {"name": "name", "label": "Name", "type": "text"},
    {"name": "description", "label": "Description", "type": "text"},
    {"name": "price", "label": "Price", "type": "number"},
    {"name": "duration", "label": "Duration", "type": "number"},
    {"name": "image", "label": "Image", "type": "file"},
]

const ServiceUpdate = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const apiClient = useApiClient();

    const getService = useCallback(async () => {
        const data = await apiClient.getService(id);
        if (data) {
            data["image"] = null;  // Reset image field if not updated
            setService(data);
        }
    }, [id]);

    const getServiceSchedules = useCallback(async () => {
        const data = await apiClient.getServiceSchedules(id);
        if (data) {
            // Handle service schedules if needed
        }
    }, [id]);

    useEffect(() => {
        getService();
    }, [getService]);

    useEffect(() => {
        if (service) {
            getServiceSchedules(service._id);
        }
    }, [service, getServiceSchedules]);

    const onAddService = async (formData) => {
        const success = await apiClient.addService(formData);
        if (success) {
            getService();
        }
    };

    const validateServiceForm = (formData) => {
        return formData.name && formData.description && formData.price && formData.duration;
    };

    return (
        <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff', padding: '20px', borderRadius: '10px' }}>
            <h2 style={{ color: '#d4af37' }}>Update Service</h2>
            <div>
                <LoadingSpinner statement={service != null}>
                    <CommonForm 
                        key="update_service_form"
                        fields={ADD_SERVICE_FORM_FIELDS}
                        data={service} 
                     
                        onSubmit={onAddService} 
                        validator={validateServiceForm}
                        formStyle={{
                            backgroundColor: '#333333', 
                            color: '#ffffff', 
                            padding: '20px', 
                            borderRadius: '10px'
                        }}
                        otherComponents={[ServiceDaysInput]}
                    />
                </LoadingSpinner>
            </div>
        </div>
    );
};

export default ServiceUpdate;
