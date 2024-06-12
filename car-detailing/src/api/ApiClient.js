import { ENDPOINTS } from "./Endpoints";
import axios from 'axios';

class ApiClient {
    constructor() {
        const access = localStorage.getItem('access');
        this.client = axios.create({
            baseURL: ENDPOINTS.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`, //TODO: dorobic zeby podczas logowania tez ustawial ten token
            },
        });
    }

    async getServices() {
        try {
            const response = await this.client.get(ENDPOINTS.Services);
            return response.data
        }
        catch (error) {
            console.error('Error getting services', error);
            return []
        }
    }

    async getService(id) { 
        try {
            const response = await this.client.get(ENDPOINTS.ServiceDetails.replace('{id}', id));
            return response.data
        }
        catch (error) {
            console.error('Error getting service', error);
            return null
        }
    }

    async registerUser(formData) {
        try {
            const response = await this.client.post(ENDPOINTS.Register, formData);
            if (response.status === 200 || response.status === 201) {
                return true
            }
        }
        catch (error) {
            console.error('Error registering user', error);
            return false;
        }
    }

    async loginUser(formData) {
        try {
            const response = await this.client.post(ENDPOINTS.Login, formData);
            if (response.status === 200 || response.status === 201) {
                return response.data
            }
        }
        catch (error) {
            console.error('Error logging user', error);
            return null;
        }
    }

    async changePassword(formData) { 
        try {
            const response = await this.client.post(ENDPOINTS.ChangePassword, formData);
            if (response.status === 200 || response.status === 201) {
                return true
            }
        }
        catch (error) {
            console.error('Error changing password', error);
            return false;
        }
    }

    setToken(access) {
        this.client.defaults.headers['Authorization'] = `Bearer ${access}`
    }
}

export default ApiClient;