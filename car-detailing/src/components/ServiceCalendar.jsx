import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";


const ServiceCalendar = ({ serviceId }) => {
    const apiClient = useApiClient()
    const [schedules, setSchedules] = useState({})

    const getAvailableSchedules = useCallback(async () => {
        const schedules = await apiClient.availableSchedules(serviceId, '2024-06-01', '2024-06-27')
        setSchedules(schedules)
    }, [apiClient, serviceId])

    useEffect(() => {
        getAvailableSchedules()
    }, [getAvailableSchedules])

    return <div>
        {Object.keys(schedules).map(day => (
            <div key={day}>
                <h3>{day}</h3>
                <ul>
                    {schedules[day].map(hour => (
                        <li key={hour}>{hour}</li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
}

export default ServiceCalendar;