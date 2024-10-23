import React, { useCallback, useEffect, useState } from 'react';
import { useApiClient } from '../api/ApiClientContext';
import toast from 'react-hot-toast';
import { TextField, Button } from '@mui/material';
import './style/Account.css';
import LoadingSpinner from './common/LoadingSpinner';

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
  const [profile, setProfile] = useState(null);
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
              <h5 className="card-title text-center mb-4" style={{ color: '#d4af37' }}>Account Settings</h5>
              
              <h6 className="text-center mb-4" style={{ color: '#d4af37' }}>Change Password</h6>
              <LoadingSpinner statement={profile != null}>
                <form onSubmit={(e) => { e.preventDefault(); onSubmitChangePassword(passwordData); }} style={{ width: '100%' }}>
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
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d4af37' }, // złote obramowanie
                        }}
                      />
                    </div>
                  ))}
                  <Button variant="contained" color="primary" type="submit" className="w-100" sx={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
                    Change Password
                  </Button>
                </form>
              </LoadingSpinner>

              <h6 className="text-center mt-5 mb-4" style={{ color: '#d4af37' }}>Update Profile</h6>
              <LoadingSpinner statement={profile != null}>
                {profile != null && (
                  <form onSubmit={(e) => { e.preventDefault(); onSubmitUserDetailsChange(profile); }} style={{ width: '100%' }}>
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
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d4af37' }, // złote obramowanie
                          }}
                        />
                      </div>
                    ))}
                    <Button variant="contained" color="primary" type="submit" className="w-100" sx={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
                      Update Profile
                    </Button>
                  </form>
                )}
              </LoadingSpinner>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
