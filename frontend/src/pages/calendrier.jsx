import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button ,Dialog,DialogContent} from "@mui/material";
import { useParams,useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

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
  const { vetId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(dayjs());
  const [openDialog, setOpenDialog] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [allAppointments,setAllAppointments]=useState([]);
  const [selectedDateAppointmentTimes,setSelectedDateAppointmentTimes] = useState({});
  const navigate = useNavigate();
  // Other state variables...


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

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

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    // Check if the user is a veterinarian
    if (userData.role !== "veterinaire") {
      // Navigate to AppointmentUser component with the selected date
      navigate(`/appointment-user/${date.format('YYYY-MM-DD')}`);
    }
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


  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className=" flex md:flex-row flex-col gap-8">
          <div className="bg-white rounded-lg shadow-sm md:w-2/3 w-full  ">
         

            <div className="grid  gap-px bg-gray-100 border-t " />
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
      
      <div className="p-4 grid grid-cols-3 gap-4 md:w-1/3 w-full">
        {selectedDateAppointmentTimes.length > 0 ? (
          selectedDateAppointmentTimes.map((time, index) => (
            <div className="text-center" key={index}>
              <p className="bg-gray-200 rounded-full py-1 px-3 inline-block mb-2 text-red-500">{time}</p>
            </div>
          ))
        ) : (
          <p>No appointments available for selected date</p>
        )}
      </div>
          </div>

      </div>
      <Button onClick={handleOpenDialog}>Open Dialog</Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-medium">Appointment Details</div>
            <div>
              <Button size="small" variant="ghost" onClick={handleCloseDialog}>
                <XIcon />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-900 font-medium">
                PET
              </div>
              <div>
                <div className="font-medium">Buddy the Dog</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">10:00 AM - 11:00 AM</div>
              </div>
            </div>
            <div className="text-gray-500 dark:text-gray-400">Routine Checkup</div>
            <div className="flex justify-end">
              <Button variant="outline">Reschedule</Button>
              <Button className="ml-2">Check In</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}




function CalendarDaysIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}


function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
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