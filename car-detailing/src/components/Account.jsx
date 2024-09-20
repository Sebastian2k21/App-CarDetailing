import React, { useCallback, useEffect, useState } from 'react';
import { useApiClient } from '../api/ApiClientContext';
import toast from 'react-hot-toast';
import { TextField, Button } from '@mui/material';
import './style/Account.css';

const USER_FORM_FIELDS = [
  { name: 'first_name', label: 'First name', type: 'text' },
  { name: 'last_name', label: 'Last name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'street', label: 'Street', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'zip_code', label: 'Zip code', type: 'text' },
];

const CHANGE_PASSWORD_FORM_FIELDS = [
  { name: 'password', label: 'New password', type: 'password' },
  { name: 'passwordConfirm', label: 'Repeat new password', type: 'password' },
];

const Account = () => {
  const [passwordData, setPasswordData] = useState({ password: '', passwordConfirm: '' });
  const [profile, setProfile] = useState({});
  const apiClient = useApiClient();

  const onSubmitChangePassword = async (formData) => {
    if (validatePasswordForm(formData)) {
      try {
        const success = await apiClient.changePassword(formData);
        if (success) {
          toast.success('Password changed successfully');
        } else {
          toast.error('Error changing password');
        }
      } catch (error) {
        console.error('Error changing password:', error);
        toast.error('Error changing password');
      }
    } else {
      toast.error('Passwords do not match or are empty');
    }
  };

  const onSubmitUserDetailsChange = async (formData) => {
    if (validateAccountDetailsForm(formData)) {
      try {
        const success = await apiClient.changeAccountDetails(formData);
        if (success) {
          toast.success('Profile updated successfully');
        } else {
          toast.error('Error updating profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Error updating profile');
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const validatePasswordForm = (formData) => {
    return formData.password && formData.password === formData.passwordConfirm;
  };

  const validateAccountDetailsForm = (formData) => {
    return USER_FORM_FIELDS.every(field => formData[field.name]);
  };

  const getProfile = useCallback(async () => {
    try {
      const userProfile = await apiClient.getProfileDetails();
      setProfile(userProfile);
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  }, [apiClient]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Account Settings</h5>

              <h6 className="text-center mb-4">Change Password</h6>
              <form onSubmit={(e) => { e.preventDefault(); onSubmitChangePassword(passwordData); }}>
                {CHANGE_PASSWORD_FORM_FIELDS.map((field) => (
                  <div className="mb-3" key={field.name}>
                    <TextField
                      label={field.label}
                      type={field.type}
                      name={field.name}
                      value={passwordData[field.name]}
                      onChange={(e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value })}
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': { color: '#ffffff' },
                        '& .MuiInputLabel-root': { color: '#ffffff' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                      }}
                    />
                  </div>
                ))}
                <Button variant="contained" color="primary" type="submit" className="w-100">
                  Change Password
                </Button>
              </form>

              <h6 className="text-center mt-5 mb-4">Update Profile</h6>
              <form onSubmit={(e) => { e.preventDefault(); onSubmitUserDetailsChange(profile); }}>
                {USER_FORM_FIELDS.map((field) => (
                  <div className="mb-3" key={field.name}>
                    <TextField
                      label={field.label}
                      type={field.type}
                      name={field.name}
                      value={profile[field.name] || ''}
                      onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': { color: '#ffffff' },
                        '& .MuiInputLabel-root': { color: '#ffffff' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                      }}
                    />
                  </div>
                ))}
                <Button variant="contained" color="primary" type="submit" className="w-100">
                  Update Profile
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
