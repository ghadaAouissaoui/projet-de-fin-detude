import React from 'react';
import moumou from '../images/moumou.jpg';
import { useState ,useEffect } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import { Menu, MenuItem, Avatar, Typography, Grid, Card, CardHeader, CardContent } from '@mui/material';

import { TextField, Dialog, DialogActions, DialogContent, DialogTitle,Button, Popover, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';


export default function AppointmentUser() {

  const [formData, setFormData] = React.useState({
    petName: '',
    appointment_date: '',
    appointment_time: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const token=localStorage.getItem('token');
  console.log(token);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the token from wherever you store it (localStorage, cookies, etc.)
      const token = localStorage.getItem('token');
   // Assuming you store the token in localStorage
      console.log('Token:', token);
      // Set the headers with the authorization token
      const headers = {
        'Authorization': `Bearer ${token}`
      };
  
      // Make a POST request to your backend endpoint with the headers
      const response = await axios.post('http://localhost:5000/api/appointment', formData, { headers });
      
      console.log(response.data); // Log the response data
      // Optionally, you can display a success message or redirect the user after successful appointment creation
    } catch (error) {
      console.error('Error creating appointment:', error.response.data); // Log any errors
      // Optionally, you can display an error message to the user
    }
  };
  const { userId } = useParams();

  const [UserProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        const { user } = response.data; // Supposez que les animaux de compagnie sont renvoyés dans la propriété "pets" de la réponse
        
        setUserProfile(user);
        console.log(user);
        setLoading(false);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération du profil de l'utilisateur :", error);
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, [userId]);
          
            const handleClose = () => {
              setOpen(false);
            };
          
            const handleOpen = () => {
              setOpen(true);
            };

  return (
    <div className="flex w-full h-[600px]">
      <div className="bg-[#0B2447] md:[15%] w-[20%] px-6 py-4 text-white sticky top-0 h-[600px] overflow-y-auto">
        <div className="flex flex-col items-start gap-6">
          <Link className="flex items-center gap-2" to="">
            <PawPrintIcon className="h-6 w-6" />
            <span className=''>{UserProfile?.fullname} Dashboard</span>
          </Link>
          {UserProfile && (
          <nav className="flex flex-col items-start gap-4">
          
            <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/pets/${UserProfile._id}`}>Pets</Link>
            <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/appointment/${UserProfile._id}`}>Appointments</Link>
            <Link className="hover:text-[#A5D7E8]" to="#">Review</Link>
            <Link className="hover:text-[#A5D7E8]" to="#">Messages</Link>
          </nav>)}
          <div className="flex items-center gap-4">
            
            <Menu
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              getContentAnchorEl={null}
              anchorEl={null}
              open={false}
            >
              <Avatar alt="Avatar" src="/placeholder.svg" />
              <MenuItem>{UserProfile?.fullname}</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Support</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>


      <div className="flex-1 bg-[#F0F0F0] overflow-y-auto ">
        <header className="bg-white dark:bg-[#0B2447] px-6 py-4 shadow sticky top-0 z-10">
          <div className="container mx-auto flex items-center justify-between">
          
          <div className="flex  ">
         <Link to='/:userId'><Button  className="hidden md:inline-flex bg-[#1F4690] hover:bg-[#1F4690]/90 text-white " variant="text" > Add Appointment</Button></Link> 
              <Menu
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                getContentAnchorEl={null}
                anchorEl={null}
                open={false}
              >
                <Avatar alt="Avatar" src="/placeholder.svg" />
                <MenuItem>John Doe</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Support</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </header>


        <main className="container m-4 py-1">
          <div className=''></div>
        </main>
      </div>
    </div>
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