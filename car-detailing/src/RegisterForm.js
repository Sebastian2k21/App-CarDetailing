import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINTS } from './api/Endpoints';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(String(password));
    };

    const validateForm = () => {
        let valid = true;
        let errors = {
            username: '',
            email: '',
            password: '',
        };

        if (!formData.username) {
            errors.username = 'Name is required';
            valid = false;
        }

        if (!validateEmail(formData.email)) {
            errors.email = 'Invalid email address';
            valid = false;
        }

        if (!validatePassword(formData.password)) {
            errors.password = 'Password must be at least 8 characters long and contain at least one letter and one number';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const registerUserAPI = async (formData) => {
        try {
            const response = await axios.post(ENDPOINTS.Register, formData);
            if (response.status === 200 || response.status === 201) {
                return true
            }
        }
        catch (error) {
            console.error('Error registering user', error);
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Here you would usually send formData to the server
            console.log('Form submitted', formData);
            
            const success = await registerUserAPI(formData)
            if(success) {
                // Przekierowanie na ekran logowania
                navigate('/login');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Imię:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
            </div>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <div>
                <label>
                    Hasło:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <button type="submit">Zarejestruj się</button>
        </form>
    );
};

export default RegisterForm;
