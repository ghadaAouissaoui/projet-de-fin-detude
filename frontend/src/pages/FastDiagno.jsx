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
import { useState ,useEffect } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import { Menu, MenuItem, Avatar, Typography, Grid, Card, CardHeader, CardContent } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TextareaAutosize } from '@mui/material';
import SymptomSelector from './SymptomSelector';
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
export default function FastDiagno(){
    const { userId } = useParams();
    const [UserProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
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

    return(

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
                <Link  className='hover:text-[#A5D7E8]' to={`/espaceclient/diagnostic/${UserProfile._id}`}>Fast Diagnostic</Link>
              </nav>
            )}
          </div>
           </div>


        {/* Main content */}
        <div className="flex-1 bg-[#F0F0F0] overflow-y-auto">
        <header className="bg-white dark:bg-[#0B2447] px-6 py-4 shadow sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
              <Button className="hidden md:inline-flex bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" variant="text"> My pets</Button>
            </div>
          </header>
          
          <section className="w-full max-w-4xl mx-auto py-8 md:py-12">
            <SymptomSelector/>
            </section>
            </div>



        </div>
    );
}