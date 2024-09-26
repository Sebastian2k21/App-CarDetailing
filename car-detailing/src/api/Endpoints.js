export const BASE_URL = 'http://localhost:8000/api';
export const MEDIA_URL = 'http://localhost:8000'


export const ENDPOINTS = {
    Login: BASE_URL + '/token',
    Register: BASE_URL + '/register',
    ChangePassword: BASE_URL + '/change-password',
    Services: BASE_URL + '/services',
    ServiceDetails: BASE_URL + '/services/{id}/details',
    ServiceSchedules: BASE_URL + '/services/{id}/days',
    AvailableSchedules : BASE_URL + '/services/{id}/available/{dateFrom}/{dateTo}',
    SubmitSchedule: BASE_URL + '/services/schedule',
    ProfileSubmits: BASE_URL + '/profile/submits',
    ProfileSubmitsDelete: BASE_URL + '/profile/submits/{submitId}/delete',
    ProfileSubmitsChangeDate: BASE_URL + '/profile/submits/{submitId}/change',
    ProfileDetails: BASE_URL + '/profile/details',
    UserRole: BASE_URL + '/profile/role',
    DetailerServices: BASE_URL + '/detailer/services',
    AddService: BASE_URL + '/detailer/services/add',
    Cars: BASE_URL + '/cars',
    AddCar: BASE_URL + '/cars/add',
}
