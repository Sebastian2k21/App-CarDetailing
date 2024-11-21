import React, { useCallback, useEffect, useState } from 'react';
import { useApiClient } from '../../api/ApiClientContext';
import toast from 'react-hot-toast';
import { TextField, Button } from '@mui/material';
import '../style/Account.css'; //TODO: zmienic na nowy plik
import LoadingSpinner from '../common/LoadingSpinner';

const EMPLOYEE_FORM_FIELDS = [
  { name: 'first_name', label: 'First Name', type: 'text' },
  { name: 'last_name', label: 'Last Name', type: 'text' },
  { name: 'description', label: 'Description', type: 'text' },
  { name: 'experience', label: 'Experience', type: 'number' }
];

const DetailerTeam = () => {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState(null);
  const [employeeData, setEmployeeData] = useState({ first_name: '', last_name: '', description: '', experience: '' });
  const apiClient = useApiClient();

  const onSubmitCreateCar = async (e) => {
    e.preventDefault();

    if (validateEmployeeForm(employeeData)) {
      try {
        const success = await apiClient.addEmployee(employeeData);
        if (success) {
          toast.success('Employee added successfully');
          getEmployees();
          setEmployeeData({ first_name: '', last_name: '', description: '', experience: '' }); // Reset formularza po dodaniu samochodu
        } else {
          toast.error('Error adding employee');
        }
      } catch (error) {
        console.error('Error adding employee: ', error);
        toast.error('Error adding employee');
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const validateEmployeeForm = (formData) => {
    return EMPLOYEE_FORM_FIELDS.every(field => formData[field.name]);
  };

  const getEmployees = useCallback(async () => {
    try {
      const emplpyees = await apiClient.getEmployees();
      setEmployees(emplpyees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }, [apiClient]);

  const removeEmployee = async (employeesId) => {
    try {
      const { success, data } = await apiClient.removeEmployee(employeesId);
      if (success) {
        toast.success('Employee removed successfully');
        getEmployees();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error removing employee:', error);
      toast.error('Error removing employee');
    }
  };

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff', padding: '20px', borderRadius: '10px' }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h5 className="card-title text-center mb-4" style={{ color: '#d4af37' }}>Team</h5>
              <button
                className="btn btn-primary w-100"
                onClick={() => setShowForm(!showForm)}
                style={{ backgroundColor: '#d4af37', borderColor: '#d4af37', color: '#1a1a1a' }}
              >
                Add Employee
              </button>
              {showForm && (
                <div>
                  <h6 className="text-center mt-5 mb-4" style={{ color: '#d4af37' }}>Add Employee</h6>
                  <form onSubmit={onSubmitCreateCar}>
                    {EMPLOYEE_FORM_FIELDS.map((field) => (
                      <div className="mb-3" key={field.name}>
                        <TextField
                          label={field.label}
                          type={field.type}
                          name={field.name}
                          value={employeeData[field.name] || ''}
                          onChange={(e) => setEmployeeData({ ...employeeData, [e.target.name]: e.target.value })}
                          sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': { color: '#ffffff' },
                            '& .MuiInputLabel-root': { color: '#ffffff' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                          }}
                        />
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="w-100"
                      style={{ backgroundColor: '#d4af37', color: '#1a1a1a', marginTop: '10px' }}
                    >
                      Add
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoadingSpinner statement={employees != null}>
        {employees != null && (
          <table className="table table-dark table-striped mt-4" style={{ color: '#ffffff' }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Description</th>
                <th>Experience</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.description}</td>
                  <td>{employee.experience}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeEmployee(employee._id)}
                      style={{ backgroundColor: '#b23a3a', color: '#ffffff' }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </LoadingSpinner>
    </div>
  );
};

export default DetailerTeam;
