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
function CardTitle({ children }) {
    return <h3 className="text-lg font-bold mb-4">{children}</h3>;
  }
  function CardDescription({ children, className }) {
    return <p className={className}>{children}</p>;
  }
  
export default function ComponentPets() {
  const { userId } = useParams();
  const [UserProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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




  return (
    <section className="w-full max-w-4xl mx-auto py-8 md:py-12">
      {/*<div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Pets</h1>
        <Button size="sm">Add New Pet</Button>
  </div>*/}
 
      <div  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {UserProfile && UserProfile.pets && UserProfile.pets.map((pet) => (
        <Card key={pet._id}>
          <img
            alt="Pet Image"
            className="rounded-t-lg object-cover w-full aspect-video"
            height={200}
            src=""
            width={300}
          />
          <CardContent className="p-4">
          
            <div  className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">{pet.name}</h3>
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <DeleteIcon className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button className="text-red-500" size="icon" variant="outline">
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
           
            <div className="text-sm text-gray-500 dark:text-gray-400">Dog</div>
            </div>
          
          </CardContent>
        </Card>
      ))}
      
        {/*<Card>
          <img
            alt="Pet Image"
            className="rounded-t-lg object-cover w-full aspect-video"
            height={200}
            src="/placeholder.svg"
            width={300}
          />
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Chirpy</h3>
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <DeleteIcon className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button className="text-red-500" size="icon" variant="outline">
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Bird</div>
          </CardContent>
        </Card>*/}
      </div>
    
    </section>
  )
}

function DeleteIcon(props) {
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
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  )
}


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}