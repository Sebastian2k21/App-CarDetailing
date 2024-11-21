import { useEffect, useState } from "react";
import CommonTable from "../common/CommonTable";
import { useApiClient } from "../../api/ApiClientContext";
import { MenuItem, Select, Box } from "@mui/material";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";
import ReactTimeAgo from "react-time-ago";
import { Container, Row, Col } from "react-bootstrap"; 

const DetailerOrders = () => {
  const api = useApiClient();
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [employees, setEmployees] = useState(null);
  const [detailerStats, setDetailerStats] = useState(null);

  const INPUT_STYLE = {
    m: 1,
    width: "100%",
    '& .MuiOutlinedInput-root': {
      color: '#ffffff',
    },
    '& .MuiInputLabel-root': {
      color: '#d4af37',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#d4af37',
    },
  };

  const fetchOrders = async () => {
    const data = await api.getDetailerOrders();
    setOrders(data);
  };

  const getSpecialist = (value) => (
    <Select
      sx={INPUT_STYLE}
      value={value.row.employee_id}
      onChange={async (e) => {
        const success = await api.attachEmployee(e.target.value, value.id);
        if (success) {
          toast.success("Employee attached successfully");
          fetchOrders();
        }
      }}
    >
      {employees?.map((employee) => (
        <MenuItem key={employee._id} value={employee._id}>
          {employee.first_name} {employee.last_name}
        </MenuItem>
      ))}
    </Select>
  );

  const getStatuses = (value) => (
    <Select
      sx={INPUT_STYLE}
      value={value.row.status_id}
      onChange={async (e) => {
        const success = await api.setSubmitStatus(e.target.value, value.id);
        if (success) {
          toast.success("Status updated successfully");
          fetchOrders();
          setDetailerStats(await api.getDetailerStats());
        }
      }}
    >
      {statuses?.map((status) => (
        <MenuItem key={status._id} value={status._id}>
          {status.name}
        </MenuItem>
      ))}
    </Select>
  );

  const getDueDate = (value) => (
    <span style={{ color: '#d4af37' }}>
      <ReactTimeAgo date={new Date(value.row.due_date.replace(" ", "T"))} locale="pl-PL" />
      &nbsp;({value.row.due_date})
    </span>
  );

  const columns = [
    { field: "id", headerName: "Order", flex: 1 },
    { field: "due_date", headerName: "Due Date", flex: 1.2, renderCell: getDueDate },
    { field: "status_id", headerName: "Status", flex: 1, renderCell: getStatuses },
    { field: "car", headerName: "Car", flex: 1 },
    { field: "service_name", headerName: "Service Name", flex: 1 },
    { field: "client_full_name", headerName: "Client", flex: 1 },
    { field: "client_phone", headerName: "Client Phone", flex: 1 },
    { field: "specialist", headerName: "Specialist", flex: 1, renderCell: getSpecialist },
    { field: "service_price", headerName: "Price", flex: 1 },
  ];

  useEffect(() => {
    fetchOrders();
    const getEmployees = async () => setEmployees(await api.getEmployees());
    const getStatuses = async () => setStatuses(await api.getAllSubmitStatuses());
    const getDetailerStats = async () => setDetailerStats(await api.getDetailerStats());

    getEmployees();
    getStatuses();
    getDetailerStats();
  }, []);

  return (
    <Container fluid style={{  color: '#d4af37', minHeight: '100vh' }}>
      <Row className="my-4">
        <Col className="text-center">
          <h1>Detailer Orders</h1>
        </Col>
      </Row>

      <LoadingSpinner statement={detailerStats != null}>
        {detailerStats != null && (
          <Box
            sx={{
              position: "relative", 
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Box
              sx={{
                padding: "6px 12px",
                borderRadius: "20px",
                backgroundColor: "#0d6efd",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Done: {detailerStats.done_count}
            </Box>
            <Box
              sx={{
                padding: "6px 12px",
                borderRadius: "20px",
                backgroundColor: "#ffc107",
                color: "black",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Pending: {detailerStats.pending_count}
            </Box>
            <Box
              sx={{
                padding: "6px 12px",
                borderRadius: "20px",
                backgroundColor: "#17a2b8",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              In Progress: {detailerStats.in_progress_count}
            </Box>
          </Box>
        )}
      </LoadingSpinner>

      <CommonTable
        columns={columns}
        rows={orders}
        sx={{
          '& .MuiDataGrid-root': {
            backgroundColor: '#1e1e1e',
            color: '#d4af37',
            borderColor: '#d4af37',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          '& .MuiDataGrid-cell': {
            borderBottomColor: '#d4af37',
            padding: '10px',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#2e2e2e',
            color: '#d4af37',
            borderBottomColor: '#d4af37',
            fontWeight: 'bold',
            fontSize: '1rem',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#2e2e2e',
            color: '#d4af37',
          },
        }}
      />
    </Container>
  );
};

export default DetailerOrders;
