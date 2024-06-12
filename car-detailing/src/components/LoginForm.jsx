import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenContext from '../context/TokenContext';
import { useApiClient } from '../api/ApiClientContext';


const LoginForm = () => {
    const {setAccess, setRefresh} = useContext(TokenContext); 
    const apiClient = useApiClient()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        const data = await apiClient.loginUser(formData)
        if(data) {
            // Przekierowanie na ekran logowania
            setAccess(data.access)
            setRefresh(data.refresh)
            apiClient.setToken(data.access)
            navigate("/")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Username:
                    <input type="username" name="username" value={formData.username}
                        onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Hasło:
                    <input type="password" name="password" value={formData.password}
                        onChange={handleChange} required />
                </label>
            </div>
            <button type="submit">Zaloguj się</button>
        </form>
    );
};

export default LoginForm;
