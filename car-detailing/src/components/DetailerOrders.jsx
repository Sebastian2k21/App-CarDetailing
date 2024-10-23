import { useEffect, useState } from "react";
import CommonTable from "./common/CommonTable";
import { useApiClient } from "../api/ApiClientContext";
import { InputLabel, MenuItem, Select } from "@mui/material";
import toast from "react-hot-toast";


const DetailerOrders = () => {
  const getSpecialist = (value) => {
    console.log(value)
    return <Select
      sx={{ width: '100%' }}
        labelId="car-select-label"
        id="car-select"
        value={value.row.employee_id}
        label="Car"
        onChange={async (e) => {
          console.log(e.target.value)
           const success = await api.attachEmployee(e.target.value, value.id)
           if(success) {
              toast.success('Employee attached successfully');
              const fetchOrders = async () => {
                const data = await api.getDetailerOrders();
                setOrders(data);
            }
            fetchOrders();
           }
        }}
      >
      
        {employees && employees.map((employee) =>   <MenuItem value={employee._id}>{employee.first_name} {employee.last_name}</MenuItem>)}
      </Select>
}

  const columns = [
    { field: 'id', headerName: 'Order', flex: 1 },
    { field: 'due_date', headerName: 'Due Date', flex: 1  },
    { field: 'status', headerName: 'Status' , flex: 1 },
    { field: 'car', headerName: 'Car' , flex: 1 },
    { field: 'service_name', headerName: 'Service Name'  , flex: 1 },
    { field: 'client_full_name', headerName: 'Client' , flex: 1  },
    { field: 'client_phone', headerName: 'Client Phone' , flex: 1  },
    { field: 'specialist', headerName: 'Specialist' , flex: 1, renderCell: getSpecialist },
    { field: 'service_price', headerName: 'Price' , flex: 1  },
  ];
  const api = useApiClient()
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState(null);


    
    useEffect(() => {
        const fetchOrders = async () => {
            const data = await api.getDetailerOrders();
            setOrders(data);
        }

        const getEmployees = async () => {
          try {
            const emplpyees = await api.getEmployees();
            setEmployees(emplpyees);
          } catch (error) {
            console.error('Error fetching employees:', error);
          }
        };

        fetchOrders();
        getEmployees()
    }, []);

    return (
        <div>
        <h1>Detailer Orders</h1>
        <CommonTable columns={columns} rows={orders} />
        </div>
    );
    }

export default DetailerOrders;