import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import CommonList from "./common/CommonList";
import ServiceItem from "./ServiceItem";
import LoadingSpinner from "./common/LoadingSpinner";


const Detailer = () => {
    const [services, setServices] = useState([])
    const apiClient = useApiClient()

    const getServices = useCallback(async () => {
        const services = await apiClient.getServices()
        if(services) {
            setServices(services)
        }
    }, [setServices])

    useEffect(() => {
        getServices()
    }, [getServices])

    return (
        <div>
            <h1>Detailer</h1>
            <h2>Services</h2>
            <div>
                <h3>Add service</h3>
                Tutaj commonForm......
            </div>
            <div>
                <LoadingSpinner statement={services}>
                    <CommonList items={services.map(service => <ServiceItem key={service._id} service={service}/>)} />
                </LoadingSpinner>
                
            </div>
        </div>
    )
}

export default Detailer;