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
        return await this.get(ENDPOINTS.Services, 'Error getting services', [])
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
        return await this.get(ENDPOINTS.AvailableSchedules.replace('{id}', serviceId).replace('{dateFrom}', dateFrom).replace('{dateTo}', dateTo), 'Error getting available schedules', [])
    }

    async submitSchedule(formData) {
        return await this.post(ENDPOINTS.SubmitSchedule, formData, 'Error submitting schedule')
    }

    async getUserSubmits() {
        return await this.get(ENDPOINTS.ProfileSubmits, 'Error fetching user submits', [])
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

    async changeSubmitDate(submitId, newDate, carId) {
        return await this.post(ENDPOINTS.ProfileSubmitsChangeDate.replace('{submitId}', submitId), {date: newDate, car_id: carId}, 'Error changing submit date')
    }

    async getUserRole() {
        return await this.get(ENDPOINTS.UserRole, 'Error fetching user role')
    }

    async getDetailerServices() {
        return await this.get(ENDPOINTS.DetailerServices, 'Error fetching detailer services', [])
    }

    async addService(formData) {
        return await this.post(ENDPOINTS.AddService, formData, 'Error add service')
    }

    async getServiceSchedules(serviceId) {
        return await this.get(ENDPOINTS.ServiceSchedules.replace("{id}", serviceId), 'Error fetching detailer services', [])
    }

    async getCars() {
        return await this.get(ENDPOINTS.Cars, 'Error fetching cars', [])
    }

    async addCar(formData) {
        return await this.post(ENDPOINTS.AddCar, formData, 'Error creating car')
    }

    async removeCar(carId) {
        return await this.delete(ENDPOINTS.RemoveCar.replace('{carId}', carId), 'Error removing car')
    }

    async getDetailerOrders() {
        return await this.get(ENDPOINTS.DetailerOrders, 'Error fetching detailer orders', [])
    }

    async addEmployee(formData) {
        return await this.post(ENDPOINTS.AddEmployee, formData, 'Error creating employee')
    }

    async getEmployees() {
        return await this.get(ENDPOINTS.Employees, "Error fetching employees")
    }

    async removeEmployee(employeeId) {
        return await this.delete(ENDPOINTS.RemoveEmployee.replace('{employeeId}', employeeId), 'Error removing employee')
    }

    async attachEmployee(employeeId, orderId) {
        return await this.post(ENDPOINTS.AttachEmployee.replace('{orderId}', orderId), {employee_id: employeeId}, 'Error attaching employee')
    }

    async getAllSubmitStatuses() {
        return await this.get(ENDPOINTS.SubmitStatus, 'Error fetching submit statuses', [])
    }

    async setSubmitStatus(statusId, orderId) { 
        return await this.post(ENDPOINTS.SetSubmitStatus.replace('{orderId}', orderId), {status_id: statusId}, 'Error setting submit status')
    }

    async getDetailerStats() {
        return await this.get(ENDPOINTS.DetailerStats, 'Error fetching detailer stats')
    }

    async getDetailerAnalytics(dateFrom, dateTo) {
        return await this.get(ENDPOINTS.DetailerAnalytics.replace("{dateFrom}", dateFrom).replace("{dateTo}", dateTo), 'Error fetching detailer analytics')
    }

    async getDetailerClients() {
        return await this.get(ENDPOINTS.DetailerClients)
    }

    async getDetailerClientSubmits(clientId) {
        return await this.get(ENDPOINTS.DetailerClientSubmits.replace("{clientId}", clientId))
    }
    //----------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------

    setToken(access) {
        this.client.defaults.headers['Authorization'] = `Bearer ${access}`
    }

    async post(url, formData, errorMsg="") { 
        var result = await this.postWithResult(url, formData, errorMsg)
        return result.success
    }

    async sendWithAttempts(requestFunction) {
        for (let i = 0; i < 3; i++) {
            try {
                const response = await requestFunction();
                if (isSuccessResponse(response)) {
                    return response
                }
                
            }
            catch (error) {
                console.error("error: " + error);
                if(error.response.status === 401) {
                    const refresh = localStorage.getItem('refresh');
                    if (refresh) {
                        const response = await this.client.post(ENDPOINTS.Refresh, {refresh: refresh});
                        if (isSuccessResponse(response)) {
                            localStorage.setItem('access', response.data.access);
                            this.setToken(response.data.access);
                        }
                    }
                } else {
                    return error.response
                }
            }
        }

        return null
    }

    
    async get(url, errorMsg="", valueOnError=null) {
        try {
            const response = await this.sendWithAttempts(async () => await this.client.get(url));
            if (isSuccessResponse(response)) {
                return response.data
            }
        }
        catch (error) {
            console.error(errorMsg, error);
            return valueOnError
        }
    }

    async postWithResult(url, formData, errorMsg="") {
        try {
            const response = await this.sendWithAttempts(async () => await this.client.post(url, formData));
            if (isSuccessResponse(response)) {
                console.log("wchodzi")
                return {success: true, data: response.data, message: null}
            }

            return {success: false, data: response.data, message: null}
        }
        catch (error) {
            console.error(errorMsg, error);
            return {success: false, data: null, message: error.response.data.message}
        }
    }

    async delete(url, errorMsg="") {
        try {
            const response = await this.sendWithAttempts(async () => await this.client.delete(url));
            if (isSuccessResponse(response)) {
                return {success: true, data: response.data}
            }
        }
        catch (error) {
            console.error(errorMsg, error);
            return {success: false, data: error.response.data};
        }
    }
}

export default ApiClient;