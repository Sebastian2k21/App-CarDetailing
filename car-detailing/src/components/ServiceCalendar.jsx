import { useCallback, useEffect, useRef, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import {DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, MenuItem, InputLabel, Select } from '@mui/material';
import toast from 'react-hot-toast';
import "../App.css"
import "./style/Calendar.css"


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
    var diff = today.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
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
  

  const ServiceCalendar = ({ serviceId, onRequest, isUpdate = false }) => {
    const calendarRef = useRef();
    const apiClient = useApiClient();
    const [currentDate, setCurrentDate] = useState(getCurrentDateMonday());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [cars, setCars] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [calendarConfig, setCalendarConfig] = useState({
      startDate: getCurrentDate(),
      weekStarts: 1,
      viewType: "Week",
      eventMoveHandling: "Disabled",
      eventResizeHandling: "Disabled",
      timeRangeSelectedHandling: "Disabled",
      eventDeleteHandling: "Disabled",
      eventHoverHandling: "Disabled",
      eventRightClickHandling: "Disabled",
      eventDoubleClickHandling: "Disabled",
    });
  
    const getAvailableSchedules = useCallback(async () => {
      const endDate = getOffsetDate(currentDate, 7);
      const schedules = await apiClient.availableSchedules(serviceId, currentDate, endDate);
      setCalendarConfig((prev) => ({ ...prev, startDate: currentDate }));
      calendarRef.current.control.update({ currentDate, events: schedules });
    }, [apiClient, serviceId, currentDate]);

    const getCars = useCallback(async () => {
      try {
        const cars = await apiClient.getCars();
        setCars(cars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    }, [apiClient]);
  
    useEffect(() => {
      getAvailableSchedules();
    }, [getAvailableSchedules, currentDate]);
  
    const handleWeekChange = (direction) => {
      const offset = direction === "next" ? 7 : -7;
      setCurrentDate(getOffsetDate(currentDate, offset));
    };
  
    const onEventClick = (e) => {
      setSelectedEvent(e.e.data);
    };
  
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const onConfirmDate = async () => {
      const result = await onRequest(selectedEvent.start.value, selectedCar._id);
      if (result) {
        toast.success("Success");
        if (!isUpdate) {
          closeModal();
          await getAvailableSchedules();
        }
      } else {
        toast.error("Failed to confirm date");
      }
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      setSelectedEvent({});
    };
  
    useEffect(() => {
      if (selectedEvent.start) {
        openModal();
      }
    }, [selectedEvent]);

    useEffect(() => {
      getCars();
    }, [getCars]);
  
    return (
      <Box sx={{ p: 2 }}>
        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button variant="outlined" onClick={() => handleWeekChange("previous")}>
            Previous
          </Button>
          <Button variant="outlined" onClick={() => handleWeekChange("next")}>
            Next
          </Button>
        </Box>
  
        {/* Calendar */}
        <DayPilotCalendar ref={calendarRef} {...calendarConfig} onEventClick={onEventClick} />
  
        {/* Booking Modal */}
        <Dialog
          open={modalIsOpen}
          onClose={closeModal}
          aria-labelledby="booking-dialog-title"
        >
          <DialogTitle id="booking-dialog-title">Book Service</DialogTitle>
          <DialogContent>
          <InputLabel id="car-select-label">Car</InputLabel>
          <Select
          sx={{ width: '100%' }}
            labelId="car-select-label"
            id="car-select"
            value={selectedCar && selectedCar._id}
            label="Car"
            onChange={(e) => setSelectedCar(cars.find((car) => car._id === e.target.value))}
          >
          
            {cars && cars.map((car) =>   <MenuItem value={car._id}>{car.manufacturer} {car.model}</MenuItem>)}
          </Select>
            <Typography variant="h6">
              {selectedEvent?.text || "No event selected"}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onConfirmDate} disabled={selectedCar == null} color="primary" variant="contained">
              Confirm Date
            </Button>
            <Button onClick={closeModal} color="secondary" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  
  export default ServiceCalendar;