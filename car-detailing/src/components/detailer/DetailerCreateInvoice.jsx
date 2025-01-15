import { useEffect, useState } from "react";
import { useApiClient } from "../../api/ApiClientContext";
import CommonSelect from "../common/CommonSelect";
import LoadingSpinner from "../common/LoadingSpinner";
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CLIENT_COLUMNS = [
    { label: "First Name", name: "first_name" },
    { label: "Last Name", name: "last_name" },
    { label: "Email", name: "email" },
    { label: "Street", name: "street" },
    { label: "City", name: "city" },
    { label: "Zip Code", name: "zip_code" },
    { label: "NIP", name: "nip" },
];

const DetailerCreateInvoice = () => {
    const api = useApiClient();
    const navigate = useNavigate()

    const [clients, setClients] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    const [clientSubmis, setClientSubmits] = useState([]);
    const [selectedSubmit, setSelectedSubmit] = useState(null);

    const [addedServices, setAddedServices] = useState([]);

    const [serviceName, setServiceName] = useState(null);
    const [servicePrice, setServicePrice] = useState(null);

    const [clientData, setClientData] = useState({});

    const handleForm = async (e) => {
        e.preventDefault();

        const data = {
            ...clientData,
            services: addedServices,
        };

        const success = await api.createInvoice(data);
        if (success) {
            toast.success("Invoice created");
            navigate("/detailer/invoices")
        }
    };

    const getClients = async () => {
        const data = await api.getDetailerClients();
        setClients(data);
    };

    const getClientSubmits = async (clientId) => {
        const data = await api.getDetailerClientSubmits(clientId);
        setClientSubmits(data);
    };

    const onAddSubmit = () => {
        if (selectedSubmit) {
            const submit = clientSubmis.find((s) => s.id === selectedSubmit);
            if (submit) {
                setAddedServices([
                    ...addedServices,
                    { id: uuidv4(), name: submit.service_name, price: submit.service_price },
                ]);
            }
        }
    };

    const countTotalCost = () => {
        return addedServices.reduce((sum, s) => sum + parseFloat(s.price), 0);
    };

    const onAddAdditionalService = () => {
        if (serviceName && servicePrice) {
            setAddedServices([
                ...addedServices,
                { id: uuidv4(), name: serviceName, price: servicePrice },
            ]);
        }
    };

    const removeAdditionalService = (id) => {
        setAddedServices([...addedServices.filter((s) => s.id !== id)]);
    };

    const onClientDataChange = (key, value) => {
        setClientData({ ...clientData, [key]: value });
    };

    useEffect(() => {
        getClients();
    }, []);

    useEffect(() => {
        if (selectedClient) {
            setSelectedSubmit(null);
            getClientSubmits(selectedClient);
            const client = clients.find((c) => c.id === selectedClient);
            if (client) {
                const data = {};
                for (const name of CLIENT_COLUMNS.map((c) => c.name)) {
                    data[name] = client[name];
                }
                setClientData(data);
            }
        }
    }, [selectedClient]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card bg-dark text-light">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4" style={{ color: '#d4af37' }}>
                                Create Invoice
                            </h5>
                            <LoadingSpinner statement={clients != null}>
                                {clients && (
                                    <form onSubmit={handleForm}>
                                        <div className="mb-4">
                                            <h6 style={{ color: '#d4af37' }}>Client</h6>
                                            <CommonSelect
                                                name="User"
                                                label="User"
                                                selectedValue={selectedClient}
                                                options={clients.map((c) => ({
                                                    value: c.id,
                                                    label: c.first_name + " " + c.last_name,
                                                }))}
                                                onSelect={setSelectedClient}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <h6 style={{ color: '#d4af37' }}>Services</h6>
                                            <CommonSelect
                                                name="Service"
                                                label="Service"
                                                options={clientSubmis.map((s) => ({
                                                    value: s.id,
                                                    label:
                                                        s.service_name +
                                                        " " +
                                                        s.service_price +
                                                        "zł (" +
                                                        s.due_date +
                                                        ")",
                                                }))}
                                                selectedValue={selectedSubmit}
                                                onSelect={setSelectedSubmit}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-warning mt-2"
                                                onClick={onAddSubmit}
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="mb-4">
                                            <h6 style={{ color: '#d4af37' }}>Additional Services</h6>
                                            <div className="row g-2">
                                                <div className="col-md-6">
                                                    <input
                                                        placeholder="Service Name"
                                                        value={serviceName}
                                                        className="form-control"
                                                        onInput={(e) => setServiceName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        placeholder="Price"
                                                        value={servicePrice}
                                                        className="form-control"
                                                        onInput={(e) => setServicePrice(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-warning mt-2"
                                                onClick={onAddAdditionalService}
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="mb-4">
                                            <h6 style={{ color: '#d4af37' }}>Services List</h6>
                                            <ul className="list-group">
                                                {addedServices.map((s) => (
                                                    <li
                                                        key={s.id}
                                                        className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light"
                                                    >
                                                        {s.name} ({s.price}zł)
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => removeAdditionalService(s.id)}
                                                        >
                                                            &#128465;
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="mt-3 text-warning">Total: {countTotalCost()}zł</p>
                                        </div>
                                        <div className="mb-4">
                                            <h6 style={{ color: '#d4af37' }}>Client Data</h6>
                                            {CLIENT_COLUMNS.map((c) => (
                                                <div key={c.name} className="mb-2">
                                                    <label htmlFor={c.name} style={{ color: '#d4af37' }}>
                                                        {c.label}
                                                    </label>
                                                    <input
                                                        id={c.name}
                                                        name={c.name}
                                                        className="form-control"
                                                        style={{ maxWidth: '300px', margin: '0 auto' }}
                                                        value={clientData[c.name]}
                                                        onInput={(e) =>
                                                            onClientDataChange(c.name, e.target.value)
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-warning w-100"
                                        >
                                            Create Invoice
                                        </button>
                                    </form>
                                )}
                            </LoadingSpinner>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailerCreateInvoice;