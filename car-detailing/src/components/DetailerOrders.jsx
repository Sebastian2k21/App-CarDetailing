import { useEffect, useState } from "react";
import CommonTable from "./common/CommonTable";
import { useApiClient } from "../api/ApiClientContext";


const columns = [
    { field: 'id', headerName: 'Order', flex: 1 },
    { field: 'due_date', headerName: 'Due Date', flex: 1  },
    { field: 'status', headerName: 'Status' , flex: 1 },
    { field: 'car', headerName: 'Car' , flex: 1 },
    { field: 'service_name', headerName: 'Service Name'  , flex: 1 },
    { field: 'client_full_name', headerName: 'Client' , flex: 1  },
    { field: 'client_phone', headerName: 'Client Phone' , flex: 1  },
    { field: 'specialist', headerName: 'Specialist' , flex: 1 },
    { field: 'service_price', headerName: 'Price' , flex: 1  },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
  ];


const DetailerOrders = () => {
  const api = useApiClient()
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        const fetchOrders = async () => {
            const data = await api.getDetailerOrders();
            setOrders(data);
        }
        fetchOrders();
    }, []);

    return (
        <div>
        <h1>Detailer Orders</h1>
        <CommonTable columns={columns} rows={orders} />
        </div>
    );
    }

export default DetailerOrders;