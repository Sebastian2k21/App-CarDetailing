import { isSuccessResponse } from "./ApiUtils";
import { ENDPOINTS } from "./Endpoints";
import axios from 'axios';

class ApiClient {
    constructor() {
        const access = localStorage.getItem('access');
        this.client = axios.create({
            baseURL: ENDPOINTS.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`,
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
            if (isSuccessResponse(response)) {
                return {success: true, message: null};
            }
        }
        catch (error) {
            console.error('Error registering user', error);
            return {success: false, message: error.response.data.message}
        }
    }

    async loginUser(formData) {
        try {
            const response = await this.client.post(ENDPOINTS.Login, formData);
            if (isSuccessResponse(response)) {
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
            if (isSuccessResponse(response)) {
                return true
            }
        }
        catch (error) {
            console.error('Error changing password', error);
            return false;
        }
    }

    async availableSchedules(serviceId, dateFrom, dateTo) {
        try {
            const response = await this.client.get(ENDPOINTS.AvailableSchedules.replace('{id}', serviceId).replace('{dateFrom}', dateFrom).replace('{dateTo}', dateTo));
            return response.data
        }
        catch (error) {
            console.error('Error getting available schedules', error);
            return {}
        }
    }

    async submitSchedule(formData) {
        try {
            const response = await this.client.post(ENDPOINTS.SubmitSchedule, formData);
            if (isSuccessResponse(response)) {
                return {success: true, message: null};
            }
        }
        catch (error) {
            console.error('Error submitting schedule', error);
            return {success: false, message: error.response.data.message}
        }
    }

    async getUserSubmits() {
        try {
            const response = await this.client.get(ENDPOINTS.ProfileSubmits);
            if (isSuccessResponse(response)) {
                return response.data
            }
        }
        catch (error) {
            console.error('Error fetching user submits', error);
            return []
        }
    }

    async getProfileDetails() {
        try {
            const response = await this.client.get(ENDPOINTS.ProfileDetails);
            if (isSuccessResponse(response)) {
                return response.data
            }
            return null
        }
        catch (error) {
            console.error('Error fetching profile details', error);
            return null
        }
    }

    async changeAccountDetails(formData) {
        try {
            const response = await this.client.post(ENDPOINTS.ProfileDetails, formData);
            if (isSuccessResponse(response)) {
                return true
            }
        }
        catch (error) {
            console.error('Error changing account details', error);
            return false;
        }
    }

    async deleteSubmit(submitId) {
        try {
            const response = await this.client.delete(ENDPOINTS.ProfileSubmitsDelete.replace('{submitId}', submitId));
            if (isSuccessResponse(response)) {
                return true
            }
        }
        catch (error) {
            console.error('Error deleting submit', error);
            return false;
        }
    }

    async changeSubmitDate(submitId, newDate) {
        try {
            const response = await this.client.post(ENDPOINTS.ProfileSubmitsChangeDate.replace('{submitId}', submitId), {date: newDate});
            if (isSuccessResponse(response)) {
                return true
            }
        }
        catch (error) {
            console.error('Error changing submit date', error);
            return false;
        }
    }

    async getUserRole() {
        try {
            const response = await this.client.get(ENDPOINTS.UserRole);
            if (isSuccessResponse(response)) {
                return response.data
            }
        }
        catch (error) {
            console.error('Error fetching user role', error);
            return null
        }
    }

    async getDetailerServices() {
        try {
            const response = await this.client.get(ENDPOINTS.DetailerServices);
            if (isSuccessResponse(response)) {
                return response.data
            }
        }
        catch (error) {
            console.error('Error fetching detailer services', error);
            return []
        }
    }

    async addService(formData) {
        try {
            const response = await this.client.post(ENDPOINTS.AddService, formData);
            if (isSuccessResponse(response)) {
                return true
            }
        }
        catch (error) {
            console.error('Error add service', error);
            return false
        }
    }

    setToken(access) {
        this.client.defaults.headers['Authorization'] = `Bearer ${access}`
    }
}

export default ApiClient;