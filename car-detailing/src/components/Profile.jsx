import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import { MEDIA_URL } from "../api/Endpoints";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from 'react-modal';
import ServiceCalendar from "./ServiceCalendar";
import LoadingSpinner from "./common/LoadingSpinner";
import { Button, Typography, Card, Table } from '@mui/material';
import './style/Profile.css'; 

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
    const apiClient = useApiClient();
    const [profile, setProfile] = useState(null);
    const [submits, setSubmits] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [calendarModalIsOpen, setCalendarModalIsOpen] = useState(false);
    const [selectedSubmitId, setSelectedSubmitId] = useState(null);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const navigate = useNavigate();

    const getSubmits = useCallback(async () => {
        setSubmits(await apiClient.getUserSubmits());
    }, [apiClient]);

    const getProfile = useCallback(async () => {
        setProfile(await apiClient.getProfileDetails());
    }, [apiClient]);

    const openDeleteConfirmation = (submitId) => {
        setSelectedSubmitId(submitId);
        setModalIsOpen(true);
    };

    const deleteSubmit = useCallback(async () => {
        const {success, data} = await apiClient.deleteSubmit(selectedSubmitId);
        if (success) {
            closeModal();
            toast.success("Submit deleted");
            getSubmits();
        }
    }, [apiClient, selectedSubmitId, getSubmits]);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeCalendarModal = () => {
        setCalendarModalIsOpen(false);
    };

    const openCalendarModal = (serviceId, submit_id) => {
        setSelectedServiceId(serviceId);
        setSelectedSubmitId(submit_id);
        setCalendarModalIsOpen(true);
    };

    const onChangeSubmit = async (newDate, carId) => {
        const result = await apiClient.changeSubmitDate(selectedSubmitId, newDate, carId);
        if (result) {
            closeCalendarModal();
            getSubmits();
        }
        return result;
    };

    useEffect(() => {
        getSubmits();
        getProfile();
    }, [getSubmits, getProfile]);

    return (
        <LoadingSpinner statement={profile}>
            <div className="container mt-5">
                <Card className="bg-dark text-light">
                    <div className="card-header text-center">
                        <Typography variant="h4" component="h1" className="mb-4">
                            Profile
                        </Typography>
                    </div>
                    <div className="card-body">
                        <Typography variant="h6" component="h2" className="mb-3">
                            Details
                        </Typography>
                        <Table className="profile-table" striped bordered hover>
                            <tbody>
                                {Object.keys(profile || {}).filter(k => k !== "id").map(key => (
                                    <tr key={key}>
                                        <td className="profile-label">{key}:</td>
                                        <td>{profile[key]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <Typography variant="h6" component="h2" className="mt-4 mb-3">
                            Submits
                        </Typography>
                        {submits.length > 0 ? (
                            <Table className="submits-table" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                        <th>Image</th>
                                        <th>Car</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submits.map(sub => (
                                        <tr key={sub.submit_id}>
                                            <td>{sub.service_name}</td>
                                            <td>{sub.service_price}</td>
                                            <td>{sub.date}</td>
                                            <td>
                                                <img src={MEDIA_URL + sub.service_image} alt="service" width="150px" />
                                            </td>
                                            <td>{sub.car_name}</td>
                                            <td className="text-center">
                                                <Button variant="contained" color="primary" onClick={() => navigate(`/services/${sub.service_id}`)}>
                                                    Details
                                                </Button>
                                                <Button variant="contained" color="error" onClick={() => openDeleteConfirmation(sub.submit_id)} className="mx-2">
                                                    Cancel
                                                </Button>
                                                <Button variant="contained" color="info" onClick={() => openCalendarModal(sub.service_id, sub.submit_id)}>
                                                    Change date
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <Typography variant="body1" className="text-center">No submits found</Typography>
                        )}
                    </div>
                </Card>
            </div>

            <Modal ariaHideApp={false} isOpen={modalIsOpen} style={smallModalStyle}>
                <div className="text-center">
                    <Typography variant="h5">Delete confirmation</Typography>
                    <Typography variant="h6">Are you sure?</Typography>
                    <Button variant="contained" color="primary" onClick={deleteSubmit}>
                        Yes
                    </Button>
                    <Button variant="contained" color="secondary" onClick={closeModal} className="mx-2">
                        No
                    </Button>
                </div>
            </Modal>

            {selectedServiceId && (
                <Modal ariaHideApp={false} isOpen={calendarModalIsOpen} style={mediumModalStyle}>
                    <div className="text-center">
                        <Typography variant="h5">Change service date</Typography>
                        <ServiceCalendar serviceId={selectedServiceId} onRequest={onChangeSubmit} isUpdate={true} />
                        <Button variant="contained" color="secondary" onClick={closeCalendarModal}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
            )}
        </LoadingSpinner>
    );
};

export default Profile;
