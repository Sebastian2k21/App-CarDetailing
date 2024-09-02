import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenContext from '../context/TokenContext';
import { useApiClient } from '../api/ApiClientContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import {toast} from 'react-hot-toast'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


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
            
        const {success, data, message} = await apiClient.loginUser(formData);
        if (success) {
            // Przekierowanie na ekran logowania
            setAccess(data.access);
            setRefresh(data.refresh);
            apiClient.setToken(data.access);
            navigate("/");
        } else {
            toast.error(message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-dark text-light">
                        <div className="card-body">
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
                                                color: '#ffffff', // Kolor czcionki
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#ffffff', // Kolor etykiety (label)
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#ffffff', // Kolor obramowania
                                            }
                                        }}
                                        required  />

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
                                                color: '#ffffff', // Kolor czcionki
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#ffffff', // Kolor etykiety (label)
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#ffffff', // Kolor obramowania
                                            }
                                        }}
                                        required  />
                                </div>
                                <Button variant="contained" color="primary" type="submit" className="w-100">Zaloguj się</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
