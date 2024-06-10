import { useState, useEffect } from "react";
import { useApiClient } from "./api/ApiClientContext";


const Services = () => {
    const apiClient = useApiClient()
    const [services, setServices] = useState([])

    const getServices = async () => {
        const services = await apiClient.getServices()
        setServices(services)
    }

    useEffect(() => {
        getServices()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h1>Services</h1>
            <ul>
                {services.map(service => (
                    <li key={service.id}>{service.name} {service.price}zł {service.description} <img src={service.image} alt="service logo"></img></li>
                ))}
            </ul>
        </div>
    );
}

export default Services;