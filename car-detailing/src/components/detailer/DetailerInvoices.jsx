import { useEffect, useState } from "react";
import { useApiClient } from "../../api/ApiClientContext";
import CommonSelect from "../common/CommonSelect"
import LoadingSpinner from "../common/LoadingSpinner";
import { v4 as uuidv4 } from 'uuid';


const CLIENT_COLUMNS = [
    {label: "First Name", name: "first_name"},
    {label: "Last Name", name: "last_name"},
    {label: "Email", name: "email"},
    {label: "Street", name: "street"}, 
    {label: "City", name: "city"},
    {label: "Zip Code", name: "zip_code"},
    {label: "NIP", name: "nip"},
]


const DetailerInvoices = () => {
    const api = useApiClient();
    const [clients, setClients] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null)

    const [clientSubmis, setClientSubmits] = useState([])
    const [selectedSubmit, setSelectedSubmit] = useState(null)

    const [addedServices, setAddedServices] = useState([])

    const [serviceName, setServiceName] = useState(null)
    const [servicePrice, setServicePrice] = useState(null)

    const [clientData, setClientData] = useState({})

    const handleForm = (e) => {
        e.preventDefault()

        const data = {
            ...clientData,
            services: addedServices
        }
        console.log(data)
    }

    const getClients = async () => {
        const data = await api.getDetailerClients();
        setClients(data);
    };

    const getClientSubmits = async (clientId) => {
        const data = await api.getDetailerClientSubmits(clientId);
        setClientSubmits(data);
    }

    const onAddSubmit = () => {
        if (selectedSubmit) {
            const submit = clientSubmis.find(s => s.id === selectedSubmit)
            if(submit) {
                setAddedServices([...addedServices, {id: uuidv4(), name: submit.service_name, price: submit.service_price}])
            }
        }
    }

    const countTotalCost = () => {
        return addedServices.reduce((sum, s) => sum + parseFloat(s.price), 0)
    }

    const onAddAdditionalService = () => {
        if(serviceName && servicePrice) {
            console.log("OK")
            console.log({id: uuidv4(), name: serviceName, price: servicePrice})
            setAddedServices([...addedServices, {id: uuidv4(), name: serviceName, price: servicePrice}])
        }
    }

    const removeAdditionalService = (id) => {
        setAddedServices([...addedServices.filter(s => s.id !== id)])
    }

    const onClientDataChange = (key, value) => {
        setClientData({...clientData, [key]: value})
    }

    useEffect(() => {
        getClients()
    }, [])

    useEffect(() => {
        if (selectedClient) {
            setSelectedSubmit(null)
            getClientSubmits(selectedClient)
            const client = clients.find(c => c.id === selectedClient)
            if(client) {
                const data = {}
                for(const name of CLIENT_COLUMNS.map(c => c.name)) {
                    data[name] = client[name]
                }
                setClientData(data)
            }
        }
    }, [selectedClient])

    return <div>
        <LoadingSpinner statement={clients != null}>
            {clients && <form onSubmit={handleForm}>
                <div>
                    <h5>Klient</h5>
                    <CommonSelect
                        name="User"
                        label="user"
                        selectedValue={selectedClient}
                        options={clients.map(c => ({ value: c.id, label: c.first_name + " " + c.last_name }))}
                        onSelect={setSelectedClient} />
                </div>
                <div>
                    <h5>Usługi</h5>
                    <CommonSelect
                        name="Service"
                        label="service"
                        options={clientSubmis.map(s => ({ value: s.id, label: s.service_name + " " + s.service_price + "zł (" + s.due_date + ")" }))}
                        selectedValue={selectedSubmit}
                        onSelect={setSelectedSubmit}
                    />
                    <button onClick={onAddSubmit}>+</button>
                </div>
                <div>
                    Usługi dodatkowe
                    <input placeholder="Nazwa usługi" value={serviceName} onInput={e => setServiceName(e.target.value)}></input>
                    <input placeholder="Cena" value={servicePrice} onInput={e => setServicePrice(e.target.value)}></input>
                    <button type="button" onClick={onAddAdditionalService}>+</button>
                </div>
                <div>
                    <ul>
                    {addedServices.map(s =>
                            <li key={s.id}>
                                <div>
                                    {s.name} ({s.price}zł) <button type="button" onClick={() => removeAdditionalService(s.id)}>&#128465;</button>
                                </div>
                            </li>)}
                    </ul>
                    <p>Total: {countTotalCost()}zł</p>

                </div>
                <div>
                    Dane klienta
                    {CLIENT_COLUMNS.map(c => 
                        <p key={c.name}>
                            <label for={c.name}>{c.label}</label>
                            <input id={c.name} name={c.name} value={clientData[c.name]} onInput={e => onClientDataChange(c.name, e.target.value)}></input>
                        </p>
                    )}
                </div>
                <button>Wystaw fakture</button>
            </form>}
        </LoadingSpinner>

    </div>
}

export default DetailerInvoices