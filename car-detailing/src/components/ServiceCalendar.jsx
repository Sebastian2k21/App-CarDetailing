import { useCallback, useEffect, useRef, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import {DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import Modal from 'react-modal';


const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today =yyyy + '-' + mm + '-' + dd;
    return today
}

const getCurrentDateMonday = () => { 
    var today = new Date();
    var day = today.getDay();
    var diff = today.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    today = new Date(today.setDate(diff));
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today =yyyy + '-' + mm + '-' + dd;
    return today
}

const getOffsetDate = (date, offset) => {
    var today = new Date(date);
    today.setDate(today.getDate() + offset);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today =yyyy + '-' + mm + '-' + dd;
    return today
}


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


const ServiceCalendar = ({ serviceId }) => {
    const calendarRef = useRef()
    const apiClient = useApiClient()
    const [schedules, setSchedules] = useState({})
    const [currentDate, setCurrentDate] = useState(getCurrentDateMonday())
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({})
    const [calendarConfig, setCalendarConfig] = useState({
        startDate: getCurrentDate(),  
        weekStarts: 1, viewType: "Week", 
        eventMoveHandling: "Disabled", 
        eventResizeHandling: "Disabled", 
        timeRangeSelectedHandling: "Disabled", eventDeleteHandling: "Disabled", 
        eventHoverHandling: "Disabled", eventRightClickHandling: "Disabled", eventDoubleClickHandling: "Disabled"})

    const getAvailableSchedules = useCallback(async () => {
        const endDate = getOffsetDate(currentDate, 7)
        const schedules = await apiClient.availableSchedules(serviceId, currentDate, endDate)
        setSchedules(schedules)

        setCalendarConfig({...calendarConfig, startDate: currentDate})
        calendarRef.current.control.update({currentDate, events: schedules});
    }, [apiClient, serviceId, currentDate])

    useEffect(() => {
        console.log(currentDate)
        getAvailableSchedules()
    }, [getAvailableSchedules, currentDate])

    const handleWeekChange = async (direction) => {
        const offset = direction === "next" ? 7 : -7
        setCurrentDate(getOffsetDate(currentDate, offset))
    }

    const onEventClick = (e) => {
        const date = e.e.data.start.value
        console.log(date)
        setSelectedEvent(e.e.data)
    }

    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {

    }
  
    function closeModal() {
      setIsOpen(false);
      setSelectedEvent({})
    }

    useEffect(() => {
        console.log(selectedEvent)
        if(!selectedEvent.start) 
        {
            return
        }
        openModal()
    }, [selectedEvent])

    return <div>
        <button onClick={() => handleWeekChange("previous")}>Previous</button>
        <button onClick={() => handleWeekChange("next")}>Next</button>
        <DayPilotCalendar ref={calendarRef} {...calendarConfig} onEventClick={onEventClick} />
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div>
                <h2>{selectedEvent.text}</h2>
                <button>Confirm date</button>
                <button onClick={closeModal}>close</button>
            </div>
        </Modal>
    </div>
}

export default ServiceCalendar;