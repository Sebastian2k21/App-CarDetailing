import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import { toast } from 'react-hot-toast';


const UserDetailsForm = () => {
    const FORM_FIELDS = [
        {"name": "first_name", "label": "First name", "type": "text"},
        {"name": "last_name", "label": "Last name", "type": "text"},
        {"name": "email", "label": "Email", "type": "email"},
        {"name": "phone", "label": "Phone", "type": "tel"},
        {"name": "street", "label": "Street", "type": "text"},
        {"name": "city", "label": "City", "type": "text"},
        {"name": "zip_code", "label": "Zip code", "type": "text"},
    ]

    const [formData, setFormData] = useState({password: '', passwordConfirm: ''});
    const apiClient = useApiClient()
    
    const getProfile = useCallback(async () => {
        setFormData(await apiClient.getProfileDetails())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
            
            const success = await apiClient.changeAccountDetails(formData)
            if(success) {
                toast.success("Data changed")
            }
        }
    };

    
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
        <div>
            <h3>User data</h3>


        <form onSubmit={handleSubmit}>
            {FORM_FIELDS.map(field =>  <div>
                <label>
                    {field.label}:
                    <input type={field.type} name={field.name} value={formData[field.name]}
                        onChange={handleChange} required />
                </label>
            </div> )}
            <button type="submit">Change data</button>
        </form>
        </div>
    );
}

export default UserDetailsForm;