import { useState } from "react";
import { useApiClient } from "./api/ApiClientContext";


const Account = () => {
    const [formData, setFormData] = useState({password: '', passwordConfirm: ''});
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
            
            const success = await apiClient.changePassword(formData)
            if(success) {
                // Przekierowanie na ekran logowania
                alert("Hasło zmienione")
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

    return (
        <div>
            <h1>Account</h1>


        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Nowe hasło:
                    <input type="password" name="password" value={formData.username}
                        onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Powtórz nowe hasło:
                    <input type="passwordConfirm" name="passwordConfirm" value={formData.passwordConfirm}
                        onChange={handleChange} required />
                </label>
            </div>
            <button type="submit">Zmień hasło</button>
        </form>
        </div>
    );
}

export default Account;