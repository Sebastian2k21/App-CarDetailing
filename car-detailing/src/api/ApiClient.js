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
        return await this.postWithResult(ENDPOINTS.Register, formData, 'Error registering user')
    }

    async loginUser(formData) {
        return await this.postWithResult(ENDPOINTS.Login, formData, 'Error logging in user')
    }

    async changePassword(formData) { 
        return await this.post(ENDPOINTS.ChangePassword, formData, 'Error changing password')
    }

    async availableSchedules(serviceId, dateFrom, dateTo) {
        return await this.getList(ENDPOINTS.AvailableSchedules.replace('{id}', serviceId).replace('{dateFrom}', dateFrom).replace('{dateTo}', dateTo), 'Error getting available schedules')
    }

    async submitSchedule(formData) {
        return await this.post(ENDPOINTS.SubmitSchedule, formData, 'Error submitting schedule')
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
        return await this.delete(ENDPOINTS.ProfileSubmitsDelete.replace('{submitId}', submitId), 'Error deleting submit')
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

    async getCars() {
        return await this.getList(ENDPOINTS.Cars, 'Error fetching cars')
    }

    async addCar(formData) {
        return await this.post(ENDPOINTS.AddCar, formData, 'Error creating car')
    }

    //----------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------

    setToken(access) {
        this.client.defaults.headers['Authorization'] = `Bearer ${access}`
    }

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

    async postWithResult(url, formData, errorMsg="") {
        try {
            const response = await this.client.post(url, formData);
            if (isSuccessResponse(response)) {
                return {success: true, data: response.data, message: null}
            }
        }
        catch (error) {
            console.error(errorMsg, error);
            return {success: false, data: null, message: error.response.data.message}
        }
    }

    async delete(url, errorMsg="") {
        try {
            const response = await this.client.delete(url);
            if (isSuccessResponse(response)) {
                return true
            }
        }
        catch (error) {
            console.error(errorMsg, error);
            return false;
        }
    }
}

export default ApiClient;