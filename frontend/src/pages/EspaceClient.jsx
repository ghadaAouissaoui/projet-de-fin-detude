import React from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moumou from '../images/moumou.jpg';
import { useState ,useEffect,useMemo } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import { Menu, MenuItem, Avatar,  CircularProgress ,Typography, Grid, Card, CardHeader, CardContent } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TextareaAutosize } from '@mui/material';
import useRequireAuth from '../../auth/userRequireAuth';
function CardTitle({ children }) {
    return <h3 className="text-lg font-bold mb-4">{children}</h3>;
  }
  function CardDescription({ children, className }) {
    return <p className={className}>{children}</p>;
  }
  
  function PencilIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    )
  }
export default function  UserDashboard() {
    const { userId } = useParams();
    const [UserProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      fullname: '',
      email: '',
      dateOfBirth: '',
      phoneNumber: '',
      name: '',
      species: '',
      breed: '',
      sex: '',
      profilePicture: '',
      comments: '',
      medicalHistory: ''
    });
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
          const { user } = response.data;
          setUserProfile(user);
          setLoading(false);
        } catch (error) {
          console.error("An error occurred while fetching the user profile:", error);
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, [userId]);
  
    const handleOpenDialog = () => {
      setOpenDialog(true);
      if (UserProfile) {
        setFormData({
          ...formData,
          fullname: UserProfile.fullname || '',
          email: UserProfile.email || '',
          dateOfBirth: UserProfile.dateOfBirth || '',
          phoneNumber: UserProfile.phoneNumber || ''
        });
      }
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handleChangeProfile = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmitProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `http://localhost:5000/api/users/${UserProfile._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSubmit = async () => {
      try {
        setOpen(false);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error);
      }
    };
  
    const calculateAge = useMemo(() => (dateOfBirth) => {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      return age;
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  

    return (
      <div className="flex w-full h-[600px]">
        <div className="bg-[#0B2447] md:w-[15%] w-[20%] px-6 py-4 text-white sticky top-0 h-[600px] overflow-y-auto">
          <div className="flex flex-col items-start gap-6">
            <Link className="flex items-center gap-2" to={`/espaceclient/${UserProfile?._id}`}>
              <PawPrintIcon className="h-6 w-6" />
              <span className=''>{UserProfile?.fullname} Dashboard</span>
            </Link>
            <Button onClick={handleOpenDialog}>Modify Profile</Button>
  
            {UserProfile && (
              <nav className="flex flex-col items-start gap-4">
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/pets/${UserProfile._id}`}>Pets</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/appointment/${UserProfile._id}`}>Medical Folder</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/review/${UserProfile._id}`}>Review</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/messages/${UserProfile._id}`}>Messages</Link>
                <Link  className='hover:text-[#A5D7E8]' to={`/espaceclient/diagnostic/${UserProfile._id}`}>Fast Diagnostic</Link>
              </nav>
            )}
          </div>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Modify User Profile</DialogTitle>
            <DialogContent>
              <TextField
                label="Full Name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChangeProfile}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChangeProfile}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChangeProfile}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSubmitProfile}>Save Changes</Button>
            </DialogActions>
          </Dialog>
        </div>
  
        <div className="flex-1 bg-[#F0F0F0] overflow-y-auto ">
          <header className="bg-white dark:bg-[#0B2447] px-6 py-4 shadow sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex">
                <Button onClick={handleOpen} className="hidden md:inline-flex bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" variant="text">Add Pet</Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add Pet</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      name="name"
                      label="Name"
                      fullWidth
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <TextField
                      margin="dense"
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      fullWidth
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                    <TextField
                      margin="dense"
                      name="species"
                      label="Species"
                      fullWidth
                      value={formData.species}
                      onChange={handleChange}
                    />
                    <TextField
                      margin="dense"
                      name="breed"
                      label="Breed"
                      fullWidth
                      value={formData.breed}
                      onChange={handleChange}
                    />
                    <TextField
                      margin="dense"
                      name="sex"
                      label="Sex"
                      fullWidth
                      value={formData.sex}
                      onChange={handleChange}
                    />
                    <TextField
                      margin="dense"
                      name="profilePicture"
                      label="Profile Picture"
                      fullWidth
                      value={formData.profilePicture}
                      onChange={handleChange}
                    />
                    <TextField
                      margin="dense"
                      name="comments"
                      label="Comments"
                      fullWidth
                      value={formData.comments}
                      onChange={handleChange}
                    />
                    <TextField
                      margin="dense"
                      name="medicalHistory"
                      label="Medical History"
                      fullWidth
                      value={formData.medicalHistory}
                      onChange={handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </header>
  
          <main className="container m-4 py-1">
  <Grid container spacing={8} className='flex flex-row'>
    <Grid item xs={12} md={6} lg={7}>
      <Card>
        <CardHeader
          title="Upcoming Appointments"
          subheader="View and manage your pet's upcoming appointments."
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>Appointments</Typography>
          {UserProfile.pets && UserProfile.pets.length > 0 ? (
            UserProfile.pets.map((pet) => (
              pet.appointments && pet.appointments.length > 0 ? (
                pet.appointments.map((appointment) => (
                  <Card key={appointment._id} style={{ marginBottom: '16px' }}>
                    <CardContent>
                      <Typography variant="h5">{pet.name}</Typography>
                      <Typography variant="body2">Date: {new Date(appointment.appointment_date).toLocaleDateString()}</Typography>
                      <Typography variant="body2">Time: {new Date(appointment.appointment_time).toLocaleTimeString()}</Typography>
                      <Typography variant="body2">Details: {appointment.reason}</Typography>
                      <Typography variant="body2">Status: {appointment.status}</Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body1" key={pet._id}>No appointments found for {pet.name}.</Typography>
              )
            ))
          ) : (
            <Typography variant="body1">No pets found.</Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardHeader
          title="My Pets"
          subheader="View details of your registered pets."
        />
        <CardContent>
          {UserProfile && UserProfile.pets && UserProfile.pets.map((pet) => (
            <div key={pet._id} className="flex items-center gap-4">
              <img
                alt="Pet"
                className="rounded-full"
                height="64"
                src={pet.profilePicture}
                style={{ aspectRatio: "64/64", objectFit: "cover" }}
                width="64"
              />
              <div>
                <h3 className="text-lg font-medium">{pet.name}</h3>
                <p className="text-[#6B7280]">{pet.species}, {pet.breed}, {pet.sex}, {calculateAge(pet.dateOfBirth)} years old</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</main>

        </div>
      </div>
    );
  }

// Rest of the code for MenuIcon and PawPrintIcon components remains the same
function MenuIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }
  
  
  function PawPrintIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="20" cy="16" r="2" />
        <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
      </svg>
    )
  }