import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import {DayPilotCalendar} from "@daypilot/daypilot-lite-react";


const ServiceCalendar = ({ serviceId }) => {
    const apiClient = useApiClient()
    const [schedules, setSchedules] = useState({})
    const [calendar, setCalendar] = useState();


    const getAvailableSchedules = useCallback(async () => {
        const schedules = await apiClient.availableSchedules(serviceId, '2024-07-01', '2024-07-07')
        setSchedules(schedules)
        console.log(calendar)
    }, [apiClient, serviceId])

    useEffect(() => {
        getAvailableSchedules()
    }, [getAvailableSchedules])

    return <div>
        {/* {Object.keys(schedules).map(day => (
            <div key={day}>
                <h3>{day}</h3>
                <ul>
                    {schedules[day].map(hour => (
                        <li key={hour}>{hour}</li>
                    ))}
                </ul>
            </div>
        ))} */}

        <DayPilotCalendar  viewType="Week" controlRef={setCalendar}/>
    </div>
}

export default ServiceCalendar;