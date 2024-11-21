import { useState, useEffect } from "react";
import { useApiClient } from "../api/ApiClientContext";
import CommonSelect from "./common/CommonSelect";
import ServiceItem from "./ServiceItem";
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';

const INPUT_STYLE = {
    m: 1, width: '25ch',
    '& .MuiOutlinedInput-root': {
        color: '#ffffff', 
    },
    '& .MuiInputLabel-root': {
        color: '#ffffff', 
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#d4af37', 
    },
    '& .MuiTypography-root': {
        color: '#ffffff', 
    }
}

const Services = () => {
    const orderOptions = [
        { value: '', label: '' },
        { value: 'price_asc', label: 'Price ascending' },
        { value: 'price_desc', label: 'Price descending' },
        { value: 'name_asc', label: 'Name ascending' },
        { value: 'name_desc', label: 'Name descending' },
    ]

    const apiClient = useApiClient();
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [order, setOrder] = useState(orderOptions[0].value);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    const getServices = async () => {
        const services = await apiClient.getServices();
        setServices(services);
    }

    const getOrderedServices = () => {
        let orderedServices = [...services];

        const form = priceFrom !== '' ? priceFrom : null;
        if (form) {
            orderedServices = orderedServices.filter(service => service.price >= form);
        }

        const to = priceTo !== '' ? priceTo : null;
        if (to) {
            orderedServices = orderedServices.filter(service => service.price <= to);
        }

        if (order === 'price_asc') {
            orderedServices = orderedServices.sort((a, b) => a.price - b.price);
        } else if (order === 'price_desc') {
            orderedServices = orderedServices.sort((a, b) => b.price - a.price);
        } else if (order === 'name_desc') {
            orderedServices = orderedServices.sort((a, b) => b.name.localeCompare(a.name));
        } else if (order === 'name_asc') {
            orderedServices = orderedServices.sort((a, b) => a.name.localeCompare(b.name));
        }

        return orderedServices;
    }

    useEffect(() => {
        getServices();
    }, []); 

    useEffect(() => {
        setFilteredServices(getOrderedServices());
    }, [services, order, priceFrom, priceTo]); 

    return (
        <div style={{ backgroundColor: '#121212', color: '#d4af37', minHeight: '100vh', padding: '20px' }}>
            <h1 style={{ color: '#d4af37', textAlign: 'center' }}>Services</h1>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <CommonSelect
                    name="order"
                    label="Order"
                    options={orderOptions}
                    onSelect={setOrder}
                    sx={{ width: '250px', color: '#d4af37', marginBottom: '20px' }}
                />

                <TextField
                    label="Price from"
                    id="priceFrom"
                    type="number"
                    value={priceFrom}
                    onChange={e => setPriceFrom(e.target.value)}
                    color="primary"
                    sx={INPUT_STYLE}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">zł</InputAdornment>,
                        },
                    }}
                />
                <TextField
                    label="Price to"
                    id="priceTo"
                    type="number"
                    value={priceTo}
                    onChange={e => setPriceTo(e.target.value)}
                    sx={INPUT_STYLE}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">zł</InputAdornment>,
                        },
                    }}
                />
            </div>

            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                {filteredServices.map(service => (
                    <ServiceItem key={service._id} service={service} />
                ))}
            </Grid>
        </div>
    );
}

export default Services;
