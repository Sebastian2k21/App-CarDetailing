import { useCallback, useEffect, useRef, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import {DayPilotCalendar} from "@daypilot/daypilot-lite-react";


const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today =yyyy + '-' + mm + '-' + dd;
    return today
}

const getOffsetDate = (offset) => {
    var today = new Date();
    var dd = String(today.getDate() + offset).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today =yyyy + '-' + mm + '-' + dd;
    return today
}


const ServiceCalendar = ({ serviceId }) => {
    const calendarRef = useRef()
    const apiClient = useApiClient()
    const [schedules, setSchedules] = useState({})
    const [calendarConfig, setCalendarConfig] = useState({
        startDate: getCurrentDate(),  
        weekStarts: 1, viewType: "Week", 
        eventMoveHandling: "Disabled", 
        eventResizeHandling: "Disabled", 
        timeRangeSelectedHandling: "Disabled", eventClickHandling: "Disabled", eventDeleteHandling: "Disabled", 
        eventHoverHandling: "Disabled", eventRightClickHandling: "Disabled", eventDoubleClickHandling: "Disabled"})


    const getAvailableSchedules = useCallback(async () => {
        const startDate = getCurrentDate();
        const endDate = getOffsetDate(7)
        const schedules = await apiClient.availableSchedules(serviceId, startDate, endDate)
        setSchedules(schedules)

        calendarRef.current.control.update({startDate, events: schedules});
    }, [apiClient, serviceId])

    useEffect(() => {
        getAvailableSchedules()
    }, [getAvailableSchedules])

    useEffect(() => {

      }, []);

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

        <DayPilotCalendar ref={calendarRef} {...calendarConfig} />
    </div>
}

export default ServiceCalendar;