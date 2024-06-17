import { useNavigate } from "react-router-dom";

const ServiceItem = ({ service }) => {
    const navigate = useNavigate()

    return (
        <div class="service-border">
            {service.name} {service.price}zł {service.description} 
            <img width="50px" src={service.image} alt="service logo"></img>
            <button onClick={e => navigate(`/services/${service._id}`)}>Details</button>
        </div>
    )
}

export default ServiceItem;