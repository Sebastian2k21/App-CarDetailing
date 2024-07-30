import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenContext from '../context/TokenContext';
import { useApiClient } from '../api/ApiClientContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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
            
        const data = await apiClient.loginUser(formData);
        if (data) {
            // Przekierowanie na ekran logowania
            setAccess(data.access);
            setRefresh(data.refresh);
            apiClient.setToken(data.access);
            navigate("/");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-dark text-light">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Zaloguj się</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        id="username" 
                                        name="username" 
                                        className="form-control" 
                                        value={formData.username} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Hasło</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        className="form-control" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Zaloguj się</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
