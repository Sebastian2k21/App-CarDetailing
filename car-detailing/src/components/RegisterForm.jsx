import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import toast from 'react-hot-toast';
import { TextField, Radio, FormControlLabel, RadioGroup, Button } from '@mui/material';

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
    const apiClient = useApiClient();

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
            role: ''
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

        if (!formData.role) {
            errors.role = 'Role is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted', formData);
            
            const { success, message } = await apiClient.registerUser(formData);
            if (success) {
                toast.success('User registered successfully!');
                navigate('/login');
            } else {
                toast.error(message);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card bg-dark text-light">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4" style={{ color: '#d4af37' }}>Rejestracja</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <TextField 
                                        label="Username" 
                                        variant="outlined" 
                                        type="text" 
                                        id="username" 
                                        name="username" 
                                        value={formData.username} 
                                        onChange={handleChange} 
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                color: '#ffffff', 
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#d4af37', // Złote obramowanie
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#888',  
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#d4af37',   // Złote obramowanie przy focusie
                                            },
                                        }}
                                        required  
                                    />
                                    {errors.username && <div className="text-danger mt-2">{errors.username}</div>}
                                </div>

                                <div className="mb-3">
                                    <TextField 
                                        label="Email" 
                                        variant="outlined" 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#d4af37', // Złote obramowanie
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#888',  
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#d4af37',   // Złote obramowanie przy focusie
                                            },
                                        }}
                                        required  
                                    />
                                    {errors.email && <div className="text-danger mt-2">{errors.email}</div>}
                                </div>

                                <div className="mb-3">
                                    <TextField 
                                        label="Password" 
                                        variant="outlined" 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#d4af37', // Złote obramowanie
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#888',  
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#d4af37',   // Złote obramowanie przy focusie
                                            },
                                        }}
                                        required  
                                    />
                                    {errors.password && <div className="text-danger mt-2">{errors.password}</div>}
                                </div>

                                <div className="mb-3 text-center">
                                    <label className="form-label text-light">I am:</label>
                                    <RadioGroup 
                                        name="role" 
                                        value={formData.role} 
                                        onChange={handleChange} 
                                        row
                                        sx={{ justifyContent: 'center' }} 
                                    >
                                        <FormControlLabel 
                                            value="client" 
                                            control={<Radio sx={{color: '#d4af37'}} />} 
                                            label="Client" 
                                            sx={{color: '#ffffff'}}
                                        />
                                        <FormControlLabel 
                                            value="detailer" 
                                            control={<Radio sx={{color: '#d4af37'}} />} 
                                            label="Detailer" 
                                            sx={{color: '#ffffff'}}
                                        />
                                    </RadioGroup>
                                    {errors.role && <div className="text-danger mt-2">{errors.role}</div>}
                                </div>

                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    type="submit" 
                                    className="w-100"
                                    sx={{
                                        backgroundColor: '#d4af37', 
                                        color: '#1a1a1a', 
                                        '&:hover': {
                                            backgroundColor: '#b88c2a', 
                                        },
                                    }}
                                >
                                    Zarejestruj się
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
