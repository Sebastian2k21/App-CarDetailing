import { useState, useEffect } from "react";
import { useApiClient } from "../api/ApiClientContext";
import CommonList from "./common/CommonList";
import CommonSelect from "./common/CommonSelect";
import ServiceItem from "./ServiceItem";


const Services = () => {
    const orderOptions = [
        { value: '', label: ''},
        { value: 'price_asc', label: 'Price ascending' },
        { value: 'price_desc', label: 'Price descending' },
        { value: 'name_asc', label: 'Name ascending' },
        { value: 'name_desc', label: 'Name descending' },
    ]

    const apiClient = useApiClient()
    const [services, setServices] = useState([])
    const [filteredServices, setFilteredServices] = useState([])
    const [order, setOrder] = useState(orderOptions[0].value)
    const [priceFrom, setPriceFrom] = useState('')
    const [priceTo, setPriceTo] = useState('')

    const getServices = async () => {
        const services = await apiClient.getServices()
        setServices(services)
    }

    const getOrderedServices = () => {
        let orderedServices = [...services]

        const form = priceFrom !== '' ? priceFrom : null
        if(form) {
            orderedServices = orderedServices.filter(service => service.price >= form)
        }

        const to = priceTo !== '' ? priceTo : null
        if(to) {
            orderedServices = orderedServices.filter(service => service.price <= to)
        }
        
        if (order === 'price_asc') {
            orderedServices = orderedServices.sort((a, b) => a.price - b.price)
        } else if (order === 'price_desc') {
            orderedServices = orderedServices.sort((a, b) => b.price - a.price)
        } else if (order === 'name_desc') {
            orderedServices = orderedServices.sort((a, b) => b.name.localeCompare(a.name))
        } else if (order === 'name_asc') {
            orderedServices = orderedServices.sort((a, b) => a.name.localeCompare(b.name))
        }

        return orderedServices
    }

    useEffect(() => {
        getServices()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setFilteredServices(getOrderedServices())
    }, [services, order, priceFrom, priceTo]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h1>Services</h1>
            <div>
                <span>Order</span>
                <CommonSelect name="order" options={orderOptions} onSelect={setOrder} />
            </div>
            <div>
                <span>Price from</span>
                <input type="number" value={priceFrom} onInput={e => setPriceFrom(e.target.value)} />
                <span>Price to</span>
                <input type="number" value={priceTo} onInput={e => setPriceTo(e.target.value)} />
            </div>
            
            <ul>
                <CommonList items={filteredServices.map(service => <ServiceItem key={service._id} service={service}/>)} />
            </ul>
        </div>
    );
}

export default Services;