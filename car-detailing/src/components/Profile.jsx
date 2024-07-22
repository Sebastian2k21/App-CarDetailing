import { useCallback, useEffect, useState } from "react"
import { useApiClient } from "../api/ApiClientContext"
import { MEDIA_URL } from "../api/Endpoints"

const Profile = () => {
    const apiClinet = useApiClient()
    const [submits, setSubmits] = useState([])
    
    const getSubmits = useCallback(async () => {
        setSubmits(await apiClinet.getUserSubmits())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getSubmits()
    }, [getSubmits])

    return <div>

        <div>
            <h2>Submits</h2>
            {submits.map(sub => <div>
                <p>{sub.service_name}</p>
                <p>{sub.service_price}</p>
                <p><img src={MEDIA_URL + sub.service_image} alt="service"></img></p>
                <p>{sub.date}</p>
            </div>)}
        </div>
    </div>
}

export default Profile
