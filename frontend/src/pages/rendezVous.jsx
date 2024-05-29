import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function RendezVous() {
  const { userId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);


  const [UserProfile, setUserProfile] = useState(null);

  const [open, setOpen] = useState(false); // État pour suivre l'ouverture du dialogue

  const [petId, setPetId] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        const { user } = response.data;
        setUserProfile(user);
        setLoading(false);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération du profil de l'utilisateur :", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Assurez-vous de stocker le token d'authentification dans le localStorage
        const response = await axios.get(`http://localhost:5000/api/appointments/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching the appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="flex w-full h-[600px]">
      {/* Sidebar */}
      <div className="bg-[#0B2447] md:w-[15%] w-[20%] px-6 py-4 text-white sticky top-0 h-[600px] overflow-y-auto">
          <div className="flex flex-col items-start gap-6">
            <Link className="flex items-center gap-2" to={`/espaceclient/${UserProfile?._id}`}>
              <PawPrintIcon className="h-6 w-6" />
              <span className=''>{UserProfile?.fullname} Dashboard</span>
            </Link>
            {UserProfile && (
              <nav className="flex flex-col items-start gap-4">
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/pets/${UserProfile._id}`}>Pets</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/appointment/${UserProfile._id}`}>Medical Folder</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/review/${UserProfile._id}`}>Review</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/messages/${UserProfile._id}`}>Messages</Link>
              </nav>
            )}
          </div>
        </div>
      
        <div className="flex-1 bg-[#F0F0F0] overflow-y-auto">
          <header className="bg-white dark:bg-[#0B2447] px-6 py-4 shadow sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
              <Button className="hidden md:inline-flex bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" variant="text"> My pets</Button>
            </div>
          </header>


    <div>
      <Typography variant="h4" gutterBottom>Appointments</Typography>
      {appointments.length === 0 ? (
        <Typography variant="body1">No appointments found.</Typography>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment._id} style={{ marginBottom: '16px' }}>
            <CardContent>
              <Typography variant="h5">{appointment.petName}</Typography>
              <Typography variant="body2">Date: {new Date(appointment.date).toLocaleDateString()}</Typography>
              <Typography variant="body2">Time: {new Date(appointment.date).toLocaleTimeString()}</Typography>
              <Typography variant="body2">Details: {appointment.details}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
    </div>

</div>  

);
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