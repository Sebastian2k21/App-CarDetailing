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

  const onSubmitCreateCar = async (e) => {
    e.preventDefault();

    if (validateCarForm(carData)) {
      try {
        const success = await apiClient.addCar(carData);
        if (success) {
          toast.success('Car added successfully');
          getCars();
          setCarData({ manufacturer: '', model: '', year_of_production: '' }); // Reset formularza po dodaniu samochodu
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
      const { success, data } = await apiClient.removeCar(carId);
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
  };

  useEffect(() => {
    getCars();
  }, [getCars]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h5 className="card-title text-center mb-4" style={{ color: '#d4af37' }}>My Cars</h5>
              <button className="btn btn-primary w-100" onClick={() => setShowForm(!showForm)} style={{ backgroundColor: '#d4af37', color: '#1a1a1a', border: 'none', borderRadius: '20px' }}>
                Add car
              </button>
              {showForm && (
                <span>
                  <h6 className="text-center mt-5 mb-4" style={{ color: '#d4af37' }}>Add Car</h6>
                  <form onSubmit={onSubmitCreateCar}>
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
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d4af37' },
                          }}
                        />
                      </div>
                    ))}
                    <Button variant="contained" color="primary" type="submit" className="w-100" sx={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
                      Add
                    </Button>
                  </form>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoadingSpinner statement={cars != null}>
        {cars != null && (
          <table className="table table-dark table-striped mt-4" style={{ backgroundColor: '#1a1a1a', color: '#d1d1d1' }}>
            <thead>
              <tr style={{ color: '#d4af37' }}>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Year of Production</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>{car.manufacturer}</td>
                  <td>{car.model}</td>
                  <td>{car.year_of_production}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeCar(car._id)}
                      sx={{
                        backgroundColor: '#d4af37',
                        color: '#1a1a1a',
                        '&:hover': { backgroundColor: '#c89f2b' },
                        borderRadius: '20px',
                      }}
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

export default MyCars;
