import React from 'react';
import { Typography, TextField, Button, MenuItem, Popover, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function AppointmentUser() {
  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <Typography variant="h4" component="h1" className="font-bold">Schedule a Vet Appointment</Typography>
        <Typography variant="body1" color="textSecondary">Fill out the form below to book an appointment for your pet.</Typography>
      </div>
      <form className="space-y-4">
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
          <TextField id="pet-name" placeholder="Enter your pet's name" variant="outlined" />
        </div>
        <div className="grid gap-2">
          <Typography htmlFor="pet-species">Pet Species</Typography>
          <TextField
            id="pet-species"
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
        </div>
        <div className="grid gap-2">
          <Typography htmlFor="pet-needs">Pet Special Needs</Typography>
          <TextField
            id="pet-needs"
            placeholder="Enter any special needs or requirements for your pet"
            variant="outlined"
            multiline
            minRows={4}
          />
        </div>
        <div className="grid gap-2">
          
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography htmlFor="appointment_date">Appointment Date</Typography>
          <TextField
            fullWidth
           
            name="appointment_date"
            type="date"

            InputProps={{
              inputProps: { min: moment().format('YYYY-MM-DD') } // Empêcher la sélection de dates antérieures
            }}
          
          />
           <Typography htmlFor="appointment_time">Appointment Time</Typography>
           <TextField
            fullWidth
            
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
