import React, { useCallback, useEffect, useState } from 'react';
import { useApiClient } from '../api/ApiClientContext';
import toast from 'react-hot-toast';
import { TextField, Button } from '@mui/material';
import './style/Account.css'; //TODO: zmienic na nowy plik
import LoadingSpinner from './common/LoadingSpinner';

const CAR_FORM_FIELDS = [
  { name: 'manufacturer', label: 'Manufacturer', type: 'text' },
  { name: 'model', label: 'Model', type: 'text' },
  { name: 'year_of_production', label: 'Year of production', type: 'number' },
];


const MyCars = () => {
    const [showForm, setShowForm] = useState(false);
  const [cars, setCars] = useState(null);
  const [carData, setCarData] = useState({ manufacturer: '', model: '', year_of_production: '' });
  const apiClient = useApiClient();

  const onSubmitCreateCar = async (formData) => {
    if (validateCarForm(formData)) {
      try {
        const success = await apiClient.addCar(formData);
        if (success) {
          toast.success('Car added successfully');
          getCars();
        } else {
          toast.error('Error adding car');
        }
      } catch (error) {
        console.error('Error adding car: ', error);
        toast.error('Error adding car');
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const validateCarForm = (formData) => {
    return CAR_FORM_FIELDS.every(field => formData[field.name]);
  };

  const getCars = useCallback(async () => {
    try {
      const cars = await apiClient.getCars();
      setCars(cars);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  }, [apiClient]);

  const removeCar = async (carId) => {
    try {
      const {success, data} = await apiClient.removeCar(carId);
      if (success) {
        toast.success('Car removed successfully');
        getCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error removing car:', error);
      toast.error('Error removing car');
    }
  }

  useEffect(() => {
    getCars();
  }, [getCars]);

  return (
    <div className="container mt-5">


      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">My Cars</h5>
              <button className="btn btn-primary w-100" onClick={() => setShowForm(!showForm)}>Add car</button>
              {showForm && <span>
                <h6 className="text-center mt-5 mb-4">Add Car</h6>
              <form onSubmit={(e) => { e.preventDefault(); onSubmitCreateCar(carData); }}>
                {CAR_FORM_FIELDS.map((field) => (
                  <div className="mb-3" key={field.name}>
                    <TextField
                      label={field.label}
                      type={field.type}
                      name={field.name}
                      value={carData[field.name] || ''}
                      onChange={(e) => setCarData({ ...carData, [e.target.name]: e.target.value })}
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
                  Add
                </Button>
              </form>
              </span>}
            
            </div>
          </div>
        </div>
      </div>
    
    <LoadingSpinner statement={cars != null}>
        {cars != null && cars.map((car) => <div>{car.manufacturer} {car.model} {car.year_of_production}            
          <Button variant="contained" color="error" className="w-100" onClick={() => removeCar(car._id)}>
                  Remove
                </Button></div>)}
    </LoadingSpinner>
    </div>
  );
};

export default MyCars;
