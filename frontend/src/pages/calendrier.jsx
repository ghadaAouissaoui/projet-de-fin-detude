import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button ,Typography,TextField,Dialog,DialogContent,MenuItem} from "@mui/material";
import { useParams,useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import moment from "moment";
import {jwtDecode} from "jwt-decode";


function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
  function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = date.daysInMonth();
        const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));
  
        resolve({ daysToHighlight });
      }, 500);
  
      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException('aborted', 'AbortError'));
      };
    });
  }

export default function ReactCalender() {
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { vetId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(dayjs());
  const [openDialog, setOpenDialog] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [allAppointments,setAllAppointments]=useState([]);
  const [selectedDateAppointmentTimes,setSelectedDateAppointmentTimes] = useState([]);
  const navigate = useNavigate();
  // Other state variables...


  

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }; 

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointment/unavailable/${vetId}`);
        const appointments = response.data.unavailableAppointments;

        // Update highlighted days based on upcoming appointments
        const highlighted = [];
        appointments.map((app)=>{
          const [month, day, year] = app.appointment_date.split('/');
          const parsedDate = dayjs(`${year}-${month}-${day}`);

          highlighted.push({
            appointment_date: parsedDate.format('YYYY-MM-DD'),
            appointment_time: app.appointment_time
          })
       
        })
        setAllAppointments(highlighted);
        // Update highlighted days based on upcoming appointments
        const highlight = Array.from(new Set(appointments.map(appointment => {
          const [month, day, year] = appointment.appointment_date.split('/');
          const parsedDate = dayjs(`${year}-${month}-${day}`);
          return parsedDate.format('YYYY-MM-DD'); // Format date to avoid duplicate days
        })));
        setHighlightedDays(highlight);

        // Update times of upcoming appointments
      } catch (error) {
        console.error('Error fetching upcoming appointments:', error.message);
      }
    };

    fetchUpcomingAppointments();
  }, [vetId]);


  useEffect(() => {
    let newData=[];
    allAppointments.map((app)=>{
      
      if(app.appointment_date==selectedDate.format('YYYY-MM-DD')){
        newData.push(app.appointment_time)
         }
    })
    setSelectedDateAppointmentTimes(newData)
     
  }, [selectedDate]);

  useEffect(() => {
    const fetchHighlightedDays = async () => {
      setIsLoading(true);
      try {
        // Perform your fetch to get highlighted days based on selectedDate
        const result = await fakeFetch(selectedDate, { signal: null }); // Pass appropriate signal if needed
        setHighlightedDays(result.daysToHighlight);
        // Example code for handling highlighted days from fakeFetch
        // setHighlightedDays(result.daysToHighlight);
      } catch (error) {
        console.error('Error fetching highlighted days:', error.message);
        setIsLoading(false);
      }
    };

    fetchHighlightedDays();
  }, [selectedDate]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
  };
  

  

 const renderDay = (props) => {
  const { day } = props;
  const date = day.format('YYYY-MM-DD');
  const isSelected = highlightedDays.includes(date);
  const isCellSelected = selectedDate.format('YYYY-MM-DD') === date;

  return (
    <Badge
      key={date}
      overlap="circular"
      badgeContent={isSelected ? <span className="text-red-500">●</span> : undefined}
      className={isCellSelected ? 'bg-gray-200 border border-gray-400 rounded p-1' : ''}
    >
      <PickersDay {...props} />
    </Badge>
  );
};




const handleButtonClick = (time) => {
  if (!selectedDateAppointmentTimes.includes(time)) {
    console.log(time)
    // Mettre à jour l'état pour afficher le formulaire
    setOpenDialog(true);
     // Mettre à jour la date de rendez-vous avec la date sélectionnée
     setFormData({
      ...formData,
      appointment_date: selectedDate.format('YYYY-MM-DD'),
      appointment_time: time,
    });
  }
};
const [userRole, setUserRole] = useState('');

// Récupérer le token et définir le rôle de l'utilisateur
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    setUserRole(decodedToken.role);
  }
}, []);

const [message, setMessage] = useState("");

 
const [formData, setFormData] = React.useState({
  petName: '',
  species:'',
  appointment_date: '',
  appointment_time: '',
  reason: ''
});


const handleSubmitAppointment = async (e) => {
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
    const response = await axios.post(`http://localhost:5000/api/appointment/${vetId}`, formData, { headers });
    // Mettez à jour le message en cas de succès
    setMessage("Appointment created successfully!");
    console.log(response.data); // Log the response data
    // Optionally, you can display a success message or redirect the user after successful appointment creation
  } catch (error) {
    console.error('Error creating appointment:', error.response.data); // Log any errors
    
    // Optionally, you can display an error message to the user
    setMessage("Failed to create appointment. Please try again.");
  }

};

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12  ">
          <div className="flex items-center m-auto border-t-2 border-b-2 rounded-lg shadow-sm md:w-2/3 w-full  ">
            <div className="md:flex gap-8 " >
              <div className="md:w-1/2 ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          loading={isLoading}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{ day: renderDay }}
        />
      </LocalizationProvider>
      </div>


      <div className="p-8 md:w-1/2 gap-4">
    {/* Afficher tous les horaires par défaut */}
    <div className="text-center">
      {Array.from({ length: 8 }).map((_, index) => {
  const time = `${index + 9}:00`; // Générer les horaires par défaut de 09:00 à 16:00
  const isHighlighted = selectedDateAppointmentTimes.includes(time); // Vérifier si l'horaire est dans les rendez-vous
  return (
    <p 
    onClick={() => handleButtonClick(time)} // Appeler handleButtonClick lors du clic sur le bouton
      className={`bg-gray-200 rounded-full py-1 px-3 inline-block mb-2 cursor-pointer text-${isHighlighted ? 'yellow' : 'red'}-500`}
      key={index}
    >
      {time}
    </p>
  );
})}

    </div>

    {/* Conditionnellement afficher les rendez-vous disponibles */}
    {selectedDateAppointmentTimes.length > 0 && (
      <div className="text-center">
        {selectedDateAppointmentTimes.map((time, index) => (
          <p className="bg-yellow-400 rounded-full py-1 px-3 inline-block mb-2 text-yellow-900" key={index}>{time}</p>
        ))}
      </div>
    )}
   
  
  </div>

      </div>
      </div>


      </div>


      <Dialog open={openDialog && userRole === 'user'} onClose={handleCloseDialog} className="w-full">
        <DialogContent>
        <form className="space-y-4 p-6" onSubmit={handleSubmitAppointment} >
        
          <TextField id="name" label="Your Name" placeholder="Enter your name" variant="outlined" />
        
        <div>
          <TextField id="email" label="Email" placeholder="Enter your email" type="email" variant="outlined" />
        </div>
        <div >
          <TextField id="phone" label="Phone Number" placeholder="Enter your phone number" type="tel" variant="outlined" />
        </div>
        <div>
          
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
       <div>
       <TextField
          id="species"
          name="species"
          value={formData.species}
          onChange={handleChange}
          label="Species"
          placeholder="Enter your pet's name"
          variant="outlined"
          fullWidth
        />
          
        </div>
        <div className="grid gap-2">
      
          <TextField id="reason" 
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          label="Reason" 
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
         {/* Affichage du message */}
           {message && (
        <div className="text-center bg-blue-900 text-green-600">
          {message}
        </div>
      )}
      <div className="space-y-4">
        <Button variant="contained" fullWidth type="submit">Request Appointment</Button>
        <Button variant="contained" fullWidth  onClick={handleCloseDialog}>Close</Button>
        </div>
      </form>
      
        </DialogContent>
      </Dialog>
    </>
  );
}




function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}