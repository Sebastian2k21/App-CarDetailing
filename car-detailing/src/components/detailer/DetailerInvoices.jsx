import { useEffect, useState } from "react";
import { useApiClient } from "../../api/ApiClientContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';


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


    const getInvoices = async () => {
        setInvoices(await apiClient.getDetailerInvoices())
    }

    const handleOpenDialog = (invoiceId) => {
        console.log("ID: "  + invoiceId)
        setInvoiceId(invoiceId);
        setDialogOpen(true);
      };
    
      const handleCloseDialog = () => {
        setDialogOpen(false);
      };
    
      const handleConfirmDelete = () => {
        const result = apiClient.removeDetailerInvoice(invoiceId);
        if(result) {
            setInvoices(invoices.filter(i => i._id !== invoiceId))
            setDialogOpen(false);
        }
      };

    const onDownload = async (invoiceId) => {
        const response = await apiClient.getDetailerInvoiceFile(invoiceId)
        if(response) {
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
        <h1>Invoices</h1>
        <LoadingSpinner statement={invoices != null}>
            {invoices != null && invoices.map(ii => <p key={ii._id}>{ii._id} {ii.date_created} <button onClick={() => onDownload(ii._id)}>Download</button>    <Box>
      <Button variant="contained" color="error" onClick={() => handleOpenDialog(ii._id)}>
        Usuń fakturę
      </Button>

      <ConfirmDeleteDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        invoiceNumber={ii.invoiceId }
      />
    </Box></p>)}
        </LoadingSpinner>


    </div>)
}

export default DetailerInvoices;