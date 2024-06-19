import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import toast from 'react-hot-toast';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });

    const navigate = useNavigate();
    const apiClient = useApiClient()

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

        if(!formData.role) {
            errors.role = 'Role is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Here you would usually send formData to the server
            console.log('Form submitted', formData);
            
            const {success, message} = await apiClient.registerUser(formData)
            if(success) {
                // Przekierowanie na ekran logowania
                toast.success('User registered successfully');
                navigate('/login');
            } else {
                toast.error(message);
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
            <div>
                <label>I am: 
                    <input type="radio" name="role" value="client" id="client_role"  onChange={handleChange} />
                    <label for="client_role">client</label>
                    <input type="radio" name="role" value="detailer" id="detailer_role"  onChange={handleChange} />
                    <label for="detailer_role">detailer</label>
                </label>
                {errors.role && <p style={{ color: 'red' }}>{errors.role}</p>}
            </div>
            <button type="submit">Zarejestruj się</button>
        </form>
    );
};

export default RegisterForm;
