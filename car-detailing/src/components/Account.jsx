import { useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import UserDetailsForm from "./UserDetailsForm";
import './style/Account.css';  // Import the CSS file

const Account = () => {
    const [formData, setFormData] = useState({ password: '', passwordConfirm: '' });
    const apiClient = useApiClient();

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
            console.log('Form submitted', formData);
            
            const success = await apiClient.changePassword(formData);
            if (success) {
                alert("Hasło zmienione");
            }
        }
    };

    const validateForm = () => {
        return formData.password && formData.password === formData.passwordConfirm;
    };


    return (
        <div className="account-container">
            <div className="columns-wrapper">
                <div className="column column-left">
                    <h1>Account</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                Nowe hasło:
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Powtórz nowe hasło:
                                <input 
                                    type="password" 
                                    name="passwordConfirm" 
                                    value={formData.passwordConfirm} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </label>
                        </div>
                        <button type="submit">Zmień hasło</button>
                    </form>
                </div>
                <div className="column column-right">
                    <UserDetailsForm />
                </div>
            </div>
        </div>
    );
}

export default Account;
