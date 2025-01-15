import { useEffect, useState } from "react";
import { useApiClient } from "../../api/ApiClientContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { ENDPOINTS } from "../../api/Endpoints";



const DetailerInvoices = () => {
    const apiClient = useApiClient()
    const [invoices, setInvoices] = useState(null)


    const getInvoices = async () => {
        setInvoices(await apiClient.getDetailerInvoices())
    }

    const onDownload = async (invoiceId) => {
        const data = await apiClient.getDetailerInvoiceFile(invoiceId)
        if(data) {
            const blob = new Blob([data], { type: 'application/pdf' });
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `invoice_${invoiceId}.pdf`);
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
            {invoices != null && invoices.map(ii => <p>{ii._id} {ii.date_created} <button onClick={() => onDownload(ii._id)}>Download</button></p>)}
        </LoadingSpinner>
    </div>)
}

export default DetailerInvoices;