import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/ApiClientContext";
import { MEDIA_URL } from "../api/Endpoints";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from 'react-modal';
import ServiceCalendar from "./ServiceCalendar";
import LoadingSpinner from "./common/LoadingSpinner";
import { Button, Typography, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './style/Profile.css'; 

// Stylowanie tabeli
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#333', // ciemne tło dla nagłówka tabeli
    color: '#d4af37', // złoty tekst
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: '#444', // ciemniejszy szary dla wierszy
    color: '#d1d1d1', // jasnoszary tekst
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#555', // jeszcze ciemniejszy szary dla nieparzystych wierszy
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
            <div className="profile-container mt-5">
                <Card className="profile-card bg-dark text-light">
                    <div className="card-header text-center">
                        <Typography variant="h4" component="h1" className="mb-4" style={{ color: '#d4af37' }}>
                            Profile
                        </Typography>
                    </div>
                    <div className="card-body">
                        <Typography variant="h6" component="h2" className="mb-3" style={{ color: '#d4af37' }}>
                            Details
                        </Typography>
                        <TableContainer component={Paper} style={{ backgroundColor: '#333' }}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Detail</StyledTableCell>
                                        <StyledTableCell>Value</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(profile || {}).filter(k => k !== "id").map(key => (
                                        <StyledTableRow key={key}>
                                            <StyledTableCell component="th" scope="row">
                                                {key}
                                            </StyledTableCell>
                                            <StyledTableCell>{profile[key]}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Typography variant="h6" component="h2" className="mt-4 mb-3" style={{ color: '#d4af37' }}>
                            Submits
                        </Typography>
                        {submits.length > 0 ? (
                            <TableContainer component={Paper} style={{ backgroundColor: '#333' }}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Service Name</StyledTableCell>
                                            <StyledTableCell align="right">Price</StyledTableCell>
                                            <StyledTableCell align="right">Date</StyledTableCell>
                                            <StyledTableCell align="right">Image</StyledTableCell>
                                            <StyledTableCell align="right">Car</StyledTableCell>
                                            <StyledTableCell align="right">Actions</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {submits.map(sub => (
                                            <StyledTableRow key={sub.submit_id}>
                                                <StyledTableCell>{sub.service_name}</StyledTableCell>
                                                <StyledTableCell align="right">{sub.service_price}</StyledTableCell>
                                                <StyledTableCell align="right">{sub.date}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <img src={MEDIA_URL + sub.service_image} alt="service" width="150px" />
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{sub.car_name}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Button variant="contained" color="primary" onClick={() => navigate(`/services/${sub.service_id}`)} sx={{ backgroundColor: '#d4af37', color: '#1a1a1a', marginRight: '10px' }}>
                                                        Details
                                                    </Button>
                                                    <Button variant="contained" color="error" onClick={() => openDeleteConfirmation(sub.submit_id)} sx={{ marginRight: '10px' }}>
                                                        Cancel
                                                    </Button>
                                                    <Button variant="contained" color="info" onClick={() => openCalendarModal(sub.service_id, sub.submit_id)} sx={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
                                                        Change date
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography variant="body1" className="text-center">No submits found</Typography>
                        )}
                    </div>
                </Card>
            </div>

            <Modal ariaHideApp={false} isOpen={modalIsOpen} style={smallModalStyle}>
                <div className="text-center">
                    <Typography variant="h5" style={{ color: '#d4af37' }}>Delete confirmation</Typography>
                    <Typography variant="h6">Are you sure?</Typography>
                    <Button variant="contained" color="primary" onClick={deleteSubmit} sx={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
                        Yes
                    </Button>
                    <Button variant="contained" color="secondary" onClick={closeModal} className="mx-2" sx={{ backgroundColor: '#1a1a1a', color: '#d4af37' }}>
                        No
                    </Button>
                </div>
            </Modal>

            {selectedServiceId && (
                <Modal ariaHideApp={false} isOpen={calendarModalIsOpen} style={mediumModalStyle}>
                    <ServiceCalendar submitId={selectedSubmitId} serviceId={selectedServiceId} onSubmit={onChangeSubmit} onClose={closeCalendarModal} />
                </Modal>
            )}
        </LoadingSpinner>
    );
};

export default Profile;
