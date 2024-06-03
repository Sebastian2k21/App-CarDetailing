import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from './api/Endpoints';
import TokenContext from './context/TokenContext';


const LoginForm = () => {
    const {setAccess, setRefresh} = useContext(TokenContext); 

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

    const loginUserApi = async (formData) => {
        try {
            const response = await axios.post(ENDPOINTS.Login, formData);
            if (response.status === 200 || response.status === 201) {
                setAccess(response.data.access)
                setRefresh(response.data.refresh)
                return true
            }
        }
        catch (error) {
            console.error('Error logging user', error);
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //if (validateForm()) {
            // Here you would usually send formData to the server
            console.log('Form submitted', formData);
            
            const success = await loginUserApi(formData)
            if(success) {
                // Przekierowanie na ekran logowania
                navigate("/")
            }
        //}
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
