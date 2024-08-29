import { useNavigate } from "react-router-dom";

const ServiceItem = ({ service, editable=false }) => {
    const navigate = useNavigate()

    return (
        <div class="service-border">
            {service.name} {service.price}zł {service.description} 
            <img width="50px" src={service.image} alt="service logo"></img>
            ({service.detailer.username})
            <button onClick={e => navigate(`/services/${service._id}`)}>Details</button>
            {editable && <button onClick={e => navigate(`/services/${service._id}/update`)}>Update</button>}
        </div>
    )
}

export default ServiceItem;