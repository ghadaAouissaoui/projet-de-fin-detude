import React from 'react';
import { Typography, TextField, Button, MenuItem, Popover, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the token from wherever you store it (localStorage, cookies, etc.)
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
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
  

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="space-y-2 " >
        <Typography variant="h4" component="h1" className="font-bold">Schedule a Vet Appointment</Typography>
        <Typography variant="body1" color="textSecondary">Fill out the form below to book an appointment for your pet.</Typography>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Typography htmlFor="name">Your Name</Typography>
          <TextField id="name" placeholder="Enter your name" variant="outlined" />
        </div>
        <div className="grid gap-2">
          <Typography htmlFor="email">Email</Typography>
          <TextField id="email" placeholder="Enter your email" type="email" variant="outlined" />
        </div>
        <div className="grid gap-2">
          <Typography htmlFor="phone">Phone</Typography>
          <TextField id="phone" placeholder="Enter your phone number" type="tel" variant="outlined" />
        </div>
        <div className="grid gap-2">
          <Typography htmlFor="pet-name">Pet Name</Typography>
          <TextField
          id="petName"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
          label="Pet Name"
          placeholder="Enter your pet's name"
          variant="outlined"
          fullWidth
        /> </div>
       { /*<div className="grid gap-2">
          <Typography htmlFor="pet-species">Pet Species</Typography>
          <TextField
            id="species"
            select
            label="Select pet species"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="dog">Dog</MenuItem>
            <MenuItem value="cat">Cat</MenuItem>
            <MenuItem value="bird">Bird</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </div>*/}
        <div className="grid gap-2">
          <Typography htmlFor="reason">Pet Special Needs</Typography>
          <TextField id="reason" 
          value={formData.reason}
          onChange={handleChange}
          label="Outlined" 
          variant="outlined" 
          fullWidth/>

        </div>
        <div className="grid gap-2">
          
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography htmlFor="appointment_date">Appointment Date</Typography>
          <TextField
            fullWidth
            value={formData.appointment_date}
            onChange={handleChange}
            name="appointment_date"
            type="date"

            InputProps={{
              inputProps: { min: moment().format('YYYY-MM-DD') } // Empêcher la sélection de dates antérieures
            }}
          
          />
           <Typography htmlFor="appointment_time">Appointment Time</Typography>
           <TextField
            fullWidth
            value={formData.appointment_time}
          onChange={handleChange}
            name="appointment_time"
            type="time"
            
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // Les intervalles de temps sont de 5 minutes (300 secondes)
            }}
           
          />
        
       
        </LocalizationProvider>  
         </div>
        <Button variant="contained" fullWidth type="submit">Request Appointment</Button>
      </form>
    </div>
  )
}
