import { useEffect, useState } from "react";
import { useApiClient } from "../../api/ApiClientContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import CommonTable from "../common/CommonTable";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

const ConfirmDeleteDialog = ({ open, onClose, onConfirm, invoiceNumber }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Potwierdzenie usunięcia</DialogTitle>
      <DialogContent>
        <Typography>
          Czy na pewno chcesz usunąć fakturę {invoiceNumber ? `nr ${invoiceNumber}` : ''}?
          Operacja jest nieodwracalna.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Anuluj
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Usuń
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const DetailerInvoices = () => {
  const apiClient = useApiClient()
  const [invoices, setInvoices] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);

  const showButtons = (value) => (
    <>
      <Box>
        <Button variant="contained" color="success" onClick={() => onDownload(value.row.id)}>
          <DownloadIcon />
        </Button>
        <Button variant="contained" color="error" onClick={() => handleOpenDialog(value.row.id)}>
          <DeleteIcon />
        </Button>

        <ConfirmDeleteDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
          invoiceNumber={value.row.number}
        />
      </Box>
    </>
  );

  const invoiceColumns = [
    { field: "number", headerName: "Invoice Number", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "amount_brutto", headerName: "Amount Brutto", flex: 1, renderCell: (value) => `${value.row.amount_brutto} zł` },
    { field: "date_created", headerName: "Date", flex: 1, renderCell: (value) => new Date(value.row.date_created).toLocaleDateString() },
    { field: "action", headerName: "", flex: 1, renderCell: showButtons }
  ];


  const getInvoices = async () => {
    let invoices = await apiClient.getDetailerInvoices();
    invoices.forEach(i => {
      i.id = i._id;
    })
    setInvoices(invoices)
  }

  const handleOpenDialog = (invoiceId) => {
    console.log("ID: " + invoiceId)
    setInvoiceId(invoiceId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    const result = apiClient.removeDetailerInvoice(invoiceId);
    if (result) {
      setInvoices(invoices.filter(i => i._id !== invoiceId))
      setDialogOpen(false);
    }
  };

  const onDownload = async (invoiceId) => {
    const response = await apiClient.getDetailerInvoiceFile(invoiceId)
    if (response) {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', `${response.fileName}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  }

  useEffect(() => {
    getInvoices()
  }, [])

  return (<div>
    <LoadingSpinner statement={invoices != null}>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card bg-dark text-light">
              <div className="card-body">
                <h5 className="card-title text-center mb-4" style={{ color: '#d4af37' }}>Invoices</h5>
                <div className="table-responsive">
                  <CommonTable
                    checkboxSelection={false}
                    columns={invoiceColumns}
                    rows={invoices}
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
      </div>
    </LoadingSpinner>


  </div>)
}

export default DetailerInvoices;