import { useCallback, useEffect, useState } from "react"
import { useApiClient } from "../api/ApiClientContext"
import { MEDIA_URL } from "../api/Endpoints"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Modal from 'react-modal';
import ServiceCalendar from "./ServiceCalendar"
import LoadingSpinner from "./common/LoadingSpinner"


const smallModalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const mediumModalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
    },
  };


const Profile = () => {
    const apiClinet = useApiClient()
    const [profile, setProfile] = useState(null)
    const [submits, setSubmits] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [calendarModalIsOpen, setCalendarModalIsOpen] = useState(false)
    const [selectedSubmitId, setSelectedSubmitId] = useState(null)
    const [selectedServiceId, setSelectedServiceId] = useState(null)
    const navigate = useNavigate()
    
    const getSubmits = useCallback(async () => {
        setSubmits(await apiClinet.getUserSubmits())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const getProfile = useCallback(async () => {
        setProfile(await apiClinet.getProfileDetails())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const openDeleteConfirmation = async (submitId) => {
        setSelectedSubmitId(submitId)
        setModalIsOpen(true)
    }

    const deleteSubmit = useCallback(async () => {
        const result = await apiClinet.deleteSubmit(selectedSubmitId)
        if (result) {
            closeModal()
            toast.success("Submit deleted")
            getSubmits()
        }
    }, [selectedSubmitId]) // eslint-disable-line react-hooks/exhaustive-deps

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const closeCalendarModal = () => {
        setCalendarModalIsOpen(false)
    }

    const openCalendarModal = (serviceId, submit_id) => {
        setSelectedServiceId(serviceId)
        setSelectedSubmitId(submit_id)
        setCalendarModalIsOpen(true)
    }

    const onChangeSubmit = async (newDate) => {
        const result = await apiClinet.changeSubmitDate(selectedSubmitId, newDate)
        if(result) {
            closeCalendarModal()
            getSubmits()
        }
        return result
    }

    useEffect(() => {
        getSubmits()
        getProfile()
    }, [getSubmits, getProfile])


    return(<LoadingSpinner statement={profile}>
    
    <div>

        <div>
            <h1>Profile</h1>
            <h2>Details</h2>
            {Object.keys(profile || {}).filter(k => k !== "id").map(key => <p>
                {key}: {profile[key]}
            </p>)}

            <h2>Submits</h2>
            {submits.map(sub => <div>
                <p>{sub.service_name}</p>
                <p>{sub.service_price}</p>
                <p><img src={MEDIA_URL + sub.service_image} alt="service" width={"150px"}></img></p>
                <p>{sub.date}</p>
                <p>
                    <button onClick={e => navigate(`/services/${sub.service_id}`)}>Details</button>
                    <button onClick={e => openDeleteConfirmation(sub.submit_id)}>Cancel</button>
                    <button onClick={e => openCalendarModal(sub.service_id, sub.submit_id)}>Change date</button>
                </p>
            </div>)}
        </div>

        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            style={smallModalStyle}
        >
            <div>
                <h1>Delete confirmation</h1>
                <h2>Are you sure?</h2>
                <button onClick={deleteSubmit}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </Modal>

        
        {selectedServiceId && 
        <Modal
            ariaHideApp={false}
            isOpen={calendarModalIsOpen}
            style={mediumModalStyle}
        >   
            <div>
                <h1>Change service date</h1>
                <ServiceCalendar serviceId={selectedServiceId} onRequest={onChangeSubmit} isUpdate={true}/>
                <button onClick={closeCalendarModal}>Cancel</button>
            </div>
        </Modal> }
    </div></LoadingSpinner> )
}

export default Profile
