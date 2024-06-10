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

    async registerUser(formData) {
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

    async changePassword(formData) { 
        try {
            const access = localStorage.getItem('access'); //TODO: to powinno byc ustawiane globalnie
            const response = await axios.post(ENDPOINTS.ChangePassword, formData, {headers: {Authorization: `Bearer ${access}`}});
            if (response.status === 200 || response.status === 201) {
                return true
            }
        }
        catch (error) {
            console.error('Error changing password', error);
            return false;
        }
    }
}

export default ApiClient;