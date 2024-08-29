import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import CommonForm from "./common/CommonForm";
import ServiceDaysInput from "./ServiceDaysInput";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./common/LoadingSpinner";


const ADD_SERVICE_FORM_FIELDS = [
    {"name": "name", "label": "Name", "type": "text"},
    {"name": "description", "label": "Description", "type": "text"},
    {"name": "price", "label": "Price", "type": "number"},
    {"name": "duration", "label": "Duration", "type": "number"},
    {"name": "image", "label": "Image", "type": "file"},
]


const ServiceUpdate = () => {
    const {id} = useParams()
    const [service, setService] = useState(null)
    const apiClient = useApiClient()

    const getService = useCallback(async () => {
        const data = await apiClient.getService(id)
        if(data) {
            data["image"] = null
            setService(data)
        }
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    const getServiceSchedules = useCallback(async () => {
        const data = await apiClient.getServiceSchedules(id)
        if(data) {
            //?????
        }
    }, [id])

    useEffect(() => {
        getService()
    }, [getService])

    useEffect(() => {
        if(service) {
            getServiceSchedules(service._id)
        }
    }, [service, getServiceSchedules])

    const onAddService = async (formData) => {
        const success = await apiClient.addService(formData)
        if(success) {
            getService()
        }
    }

    const validateServiceForm = (formData) => {
        console.log(formData)
        return formData.name && formData.description && formData.price && formData.duration;
    }

    return (
        <div>
            <h2>Update service</h2>
            <div>
                <LoadingSpinner statement={service != null}>
                    <CommonForm key="update_service_form"
                                fields={ADD_SERVICE_FORM_FIELDS}
                                data={service} 
                                title="Add service" 
                                onSubmit={onAddService} 
                                validator={validateServiceForm}
                                otherComponents={[ServiceDaysInput]}/>
                </LoadingSpinner>
            </div>
        </div>
    )
}

export default ServiceUpdate;