import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import { toast } from 'react-hot-toast';
import LoadingSpinner from "./common/LoadingSpinner";


//fields structure
// [
//     {"name": "first_name", "label": "First name", "type": "text"},
//     {"name": "last_name", "label": "Last name", "type": "text"},
//     {"name": "email", "label": "Email", "type": "email"},
//     {"name": "phone", "label": "Phone", "type": "tel"},
//     {"name": "street", "label": "Street", "type": "text"},
//     {"name": "city", "label": "City", "type": "text"},
//     {"name": "zip_code", "label": "Zip code", "type": "text"},
// ]

const CommonForm = ({fields, data, onSubmit}) => {
    const [formData, setFormData] = useState(null);
    const apiClient = useApiClient()
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Here you would usually send formData to the server
            console.log('Form submitted', formData);
            
            await onSubmit()
        }
    };

    useEffect(() => {
        setFormData(data)
    }, [data])

    
    const validateForm = () => {
        // let valid = true;
        // let errors = {
        //     username: '',
        //     email: '',
        //     password: '',
        // };

        // if (!formData.username) {
        //     errors.username = 'Name is required';
        //     valid = false;
        // }

        // if (!validateEmail(formData.email)) {
        //     errors.email = 'Invalid email address';
        //     valid = false;
        // }

        // if (!validatePassword(formData.password)) {
        //     errors.password = 'Password must be at least 8 characters long and contain at least one letter and one number';
        //     valid = false;
        // }

        // setErrors(errors);
        // return valid;
        return true
    };

    useEffect(() => {
        getProfile()
    }, [getProfile])


    return (
        <LoadingSpinner statement={formData}>
            <div>
                <h3>User data</h3>


            <form onSubmit={handleSubmit}>
                {formData && fields.map(field =>  <div>
                    <label>
                        {field.label}:
                        <input type={field.type} name={field.name} value={formData[field.name]}
                            onChange={handleChange} required />
                    </label>
                </div> )}
                <button type="submit">Change data</button>
            </form>
            </div>      
        </LoadingSpinner>
    );
}

export default CommonForm;