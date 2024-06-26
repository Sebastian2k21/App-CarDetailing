export const BASE_URL = 'http://localhost:8000/api';

export const ENDPOINTS = {
    Login: BASE_URL + '/token',
    Register: BASE_URL + '/register',
    ChangePassword: BASE_URL + '/change-password',
    Services: BASE_URL + '/services',
    ServiceDetails: BASE_URL + '/services/{id}',
    AvailableSchedules : BASE_URL + '/services/{id}/available/{dateFrom}/{dateTo}',
}