import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import './style/Account.css';  // Import the CSS file
import CommonForm from "./common/CommonForm";
import toast from "react-hot-toast";



const USER_FORM_FIELDS = [
    {"name": "first_name", "label": "First name", "type": "text"},
    {"name": "last_name", "label": "Last name", "type": "text"},
    {"name": "email", "label": "Email", "type": "email"},
    {"name": "phone", "label": "Phone", "type": "tel"},
    {"name": "street", "label": "Street", "type": "text"},
    {"name": "city", "label": "City", "type": "text"},
    {"name": "zip_code", "label": "Zip code", "type": "text"},
]

const CHANGE_PASSWORD_FORM_FIELDS = [
    {"name": "password", "label": "New password", "type": "password"},
    {"name": "passwordConfirm", "label": "Repeat new password", "type": "password"},
]


const Account = () => {
    const [passwordData] = useState({ password: '', passwordConfirm: '' });
    const [profile, setProfile] = useState(null);
    const apiClient = useApiClient();

    const onSubmitChangePassword = async (formData) => {
        if (validatePasswordForm(formData)) {
            console.log('Form submitted', formData);
            
            const success = await apiClient.changePassword(formData);
            if (success) {
                alert("Hasło zmienione");
            }
        }
    };

    const onSubmitUserDetailsChange = async (formData) => {
        const success = await apiClient.changeAccountDetails(formData)
       if(success) {
           toast.success("Data changed")
       }
    }

    const validatePasswordForm = (formData) => {
        return formData.password && formData.password === formData.passwordConfirm;
    };

    const validateAccountDetailsForm = (formData) => {
        return formData.first_name && formData.last_name && formData.email && formData.phone && formData.street && formData.city && formData.zip_code;
    }

    const getProfile = useCallback(async () => {
        setProfile(await apiClient.getProfileDetails())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getProfile()
    }, [getProfile])
    


    return (
        <div className="account-container">
            <div className="columns-wrapper">
                <div className="column column-left">
                    <CommonForm fields={CHANGE_PASSWORD_FORM_FIELDS} 
                                data={passwordData} 
                                title="Change password" 
                                onSubmit={onSubmitChangePassword} 
                                validator={validatePasswordForm} />
                </div>
                <div className="column column-right">
                    <CommonForm fields={USER_FORM_FIELDS} 
                                title="User data" 
                                onSubmit={onSubmitUserDetailsChange} 
                                data={profile} 
                                validator={validateAccountDetailsForm}/>
                </div>
            </div>
        </div>
    );
}

export default Account;
