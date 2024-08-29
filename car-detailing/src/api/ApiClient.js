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
        return await this.getList(ENDPOINTS.Services, 'Error getting services')
    }

    async getService(id) { 
        return await this.get(ENDPOINTS.ServiceDetails.replace('{id}', id), 'Error getting service')
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
        return await this.post(ENDPOINTS.ChangePassword, formData, 'Error changing password')
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
        return await this.getList(ENDPOINTS.ProfileSubmits, 'Error fetching user submits')
    }

    async getProfileDetails() {
        return await this.get(ENDPOINTS.ProfileDetails, 'Error fetching profile details')
    }

    async changeAccountDetails(formData) {
        return await this.post(ENDPOINTS.ProfileDetails, formData, 'Error changing account details')
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
        return await this.post(ENDPOINTS.ProfileSubmitsChangeDate.replace('{submitId}', submitId), {date: newDate}, 'Error changing submit date')
    }

    async getUserRole() {
        return await this.get(ENDPOINTS.UserRole, 'Error fetching user role')
    }

    async getDetailerServices() {
        return await this.getList(ENDPOINTS.DetailerServices, 'Error fetching detailer services')
    }

    async addService(formData) {
        return await this.post(ENDPOINTS.AddService, formData, 'Error add service')
    }

    async getServiceSchedules(serviceId) {
        return await this.getList(ENDPOINTS.ServiceSchedules.replace("{id}", serviceId), 'Error fetching detailer services')
    }

    //----------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------

    async getList(url, errorMsg="") {
        try {
            const response = await this.client.get(url);
            return response.data
        }
        catch (error) {
            console.error(errorMsg, error);
            return []
        }
    }

    setToken(access) {
        this.client.defaults.headers['Authorization'] = `Bearer ${access}`
    }

    async post(url, formData, errorMsg="") { 
        try {
            const response = await this.client.post(url, formData);
            if (isSuccessResponse(response)) {
                return true
            }
        }
        catch (error) {
            console.error(errorMsg, error);
            return false;
        }
    }

    
    async get(url, errorMsg="") {
        try {
            const response = await this.client.get(url);
            if (isSuccessResponse(response)) {
                return response.data
            }
        }
        catch (error) {
            console.error(errorMsg, error);
            return null
        }
    }
}

export default ApiClient;