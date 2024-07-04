import { useParams } from "react-router-dom";
import { useApiClient } from "../api/ApiClientContext";
import { useEffect, useState } from "react";
import ServiceCalendar from "./ServiceCalendar";


const ServiceDetails = () => {
    const {id} = useParams()
    const apiClient = useApiClient()
    const [service, setService] = useState(null)

    const getService = async () => {
        const service = await apiClient.getService(id)
        setService(service)
    }
    useEffect(() => {

        getService()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(!service) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{service.name}</h1>
            <p>{service.description}</p>
            <p>{service.price}zł</p>
            <p>{service.detailer.username}</p>
            <img src={service.image} width="30%" alt="service logo"></img>
            <ServiceCalendar serviceId={service._id} />
        </div>
    );
}

export default ServiceDetails;