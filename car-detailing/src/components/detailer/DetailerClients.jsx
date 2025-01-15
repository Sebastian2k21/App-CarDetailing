import { useEffect, useState } from "react";
import { useApiClient } from "../../api/ApiClientContext";
import CommonTable from "../common/CommonTable";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import LoadingSpinner from "../common/LoadingSpinner";


const DetailerClients = () => {
    const api = useApiClient();
    const [clients, setClients] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [clientSubmits, setClientSubmits] = useState(null);
    const [selectedClientId, setSelectedClientId] = useState(null);

    const getClients = async () => {
        const data = await api.getDetailerClients();
        setClients(data);
    };

    const getSelectedClientFullName = () => {
        if (selectedClientId) {
            const client = clients.find(c => c.id === selectedClientId);
            return client.first_name + " " + client.last_name;
        }
        return "";
    };

    const getClientSubmits = async (clientId) => {
        const data = await api.getDetailerClientSubmits(clientId);
        setClientSubmits(data);
    };

    const showDetailsButton = (value) => (
        <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#d4af37', color: '#1a1a1a', fontWeight: 'bold' }}
            onClick={() => openModal(value.row.id)}
        >
            Details
        </Button>
    );

    const clientColumns = [
        { field: "id", headerName: "Client Id", flex: 1 },
        { field: "first_name", headerName: "First Name", flex: 1 },
        { field: "last_name", headerName: "Last Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phone", headerName: "Phone", flex: 1 },
        { field: "action", headerName: "", flex: 1, renderCell: showDetailsButton }
    ];

    const submitColumns = [
        { field: "id", headerName: "Order", flex: 1 },
        { field: "car", headerName: "Car", flex: 1 },
        { field: "service_name", headerName: "Service Name", flex: 1 },
        { field: "service_price", headerName: "Price", flex: 1 },
        { field: "due_date", headerName: "Due Date", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "employee", headerName: "Employee", flex: 1 },
    ];

    const openModal = (clientId) => {
        setSelectedClientId(null);
        setSelectedClientId(clientId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        getClients();
    }, []);

    useEffect(() => {
        if (selectedClientId) {
            getClientSubmits(selectedClientId);
        } else {
            setClientSubmits(null);
        }
    }, [selectedClientId]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card bg-dark text-light">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4" style={{ color: '#d4af37' }}>Clients</h5>
                            <div className="table-responsive">
                                <CommonTable
                                    columns={clientColumns}
                                    rows={clients}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={modalIsOpen}
                fullWidth
                maxWidth="xl"
                onClose={closeModal}
                aria-labelledby="booking-dialog-title"
            >
                <DialogTitle id="booking-dialog-title" sx={{ color: '#d4af37' }}>
                    {getSelectedClientFullName()}'s Orders
                </DialogTitle>
                <DialogContent>
                    <LoadingSpinner statement={selectedClientId != null}>
                        {selectedClientId && (
                            <div className="table-responsive">
                                <CommonTable
                                    columns={submitColumns}
                                    rows={clientSubmits}
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
                            </div>
                        )}
                    </LoadingSpinner>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={closeModal}
                        variant="contained"
                        color="secondary"
                        sx={{ backgroundColor: '#d4af37', color: '#1a1a1a', fontWeight: 'bold' }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DetailerClients;