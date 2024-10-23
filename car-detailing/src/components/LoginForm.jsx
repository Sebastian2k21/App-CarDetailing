import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenContext from '../context/TokenContext';
import { useApiClient } from '../api/ApiClientContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { toast } from 'react-hot-toast';
import { TextField, Button } from '@mui/material';

const LoginForm = () => {
    const { setAccess, setRefresh } = useContext(TokenContext);
    const apiClient = useApiClient();

    const [formData, setFormData] = useState({
        username: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        const { success, data, message } = await apiClient.loginUser(formData);
        if (success) {
            toast.success('Logged in successfully');
            setAccess(data.access);
            setRefresh(data.refresh);
            apiClient.setToken(data.access);
            navigate("/");
        } else {
            toast.error( 'Wrong username or password');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card bg-dark text-light">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4" style={{ color: '#d4af37' }}>Logowanie</h5>
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
                                        color="primary"
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                color: '#ffffff', 
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#ffffff', 
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#d4af37',  // Złote obramowanie
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
                                                borderColor: '#d4af37',  // Złote obramowanie
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
                                    Zaloguj się
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
