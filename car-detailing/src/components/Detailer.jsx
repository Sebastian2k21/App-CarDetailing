import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import CommonList from "./common/CommonList";
import ServiceItem from "./ServiceItem";
import LoadingSpinner from "./common/LoadingSpinner";
import CommonForm from "./common/CommonForm";
import ServiceDaysInput from "./ServiceDaysInput";


const ADD_SERVICE_FORM_FIELDS = [
    {"name": "name", "label": "Name", "type": "text"},
    {"name": "description", "label": "Description", "type": "text"},
    {"name": "price", "label": "Price", "type": "number"},
    {"name": "duration", "label": "Duration", "type": "number"},
    {"name": "image", "label": "Image", "type": "file"},
]


const Detailer = () => {
    const [services, setServices] = useState([])
    const [serviceFormShow, setServiceFormShow] = useState(false)
     const apiClient = useApiClient()

    const getServices = useCallback(async () => {
        const services = await apiClient.getDetailerServices()
        if(services) {
            setServices(services)
        }
    }, [setServices]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getServices()
    }, [getServices])

    const onAddService = async (formData) => {
        //TODO: usunac z image_file slowo "file"
        const success = await apiClient.addService(formData)
        if(success) {
            getServices()
        }
    }

    const validateServiceForm = (formData) => {
        console.log(formData)
        return formData.name && formData.description && formData.price && formData.duration;
    }

    const toggleShowServiceForm = () => {
        setServiceFormShow(!serviceFormShow)
    }

    return (
        <div>
            <h1>Detailer</h1>
            <h2>Services</h2>
            <button onClick={toggleShowServiceForm}>New Service</button>
            {serviceFormShow &&
            <div>
                <CommonForm key="add_service_form"
                            fields={ADD_SERVICE_FORM_FIELDS}
                            data={{}} 
                            title="Add service" 
                            onSubmit={onAddService} 
                            validator={validateServiceForm}
                            otherComponents={[ServiceDaysInput]}/>
            </div>}
            <div>
                <LoadingSpinner statement={services}>
                    <CommonList items={services.map(service => <ServiceItem key={service._id} service={service} editable={true}/>)} />
                </LoadingSpinner>
                
            </div>
        </div>
    )
}

export default Detailer;