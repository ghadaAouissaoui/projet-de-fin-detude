import React from "react";


import { useState ,useEffect } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import axios from "axios";
import { ResponsiveLine } from '@nivo/line';
import Doctor from '../images/femaleDoctor.jpg'
import Sidebar from "./Sidebare";
import ReactCalender from "./calendrier";



   // Avatar component
   export const Avatar = ({ children }) => {
    return <div className="flex items-center space-x-4">{children}</div>;
  };
  
  // AvatarImage component
  export const AvatarImage = ({ alt, src, className }) => {
    return <img className={` ${className}`} alt={alt} src={src} />;
  };
  
  
  // AvatarFallback component
  export const AvatarFallback = ({ children }) => {
    return <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">{children}</div>;
  };


  // Input component
export const Input = (props) => {
    return (
      <input
        {...props}
        className={`  ${props.className}`}
      />
    );
  };

  // Card component
export const Card = ({ children, className }) => {
    return (
      <div className={`bg-white p-4 shadow rounded-lg ${className}`}>
        {children}
      </div>
    );
  };

  function Badge({ children, variant }) {
    return (
      <span
        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
          variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {children}
      </span>
    );
  }
  
  function Button({ children, variant }) {
    return (
      <button
        className={`py-2 px-4 rounded-md text-white ${
          variant === "outline" ? "bg-transparent border border-gray-400 hover:bg-gray-100 hover:text-gray-800" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {children}
      </button>
    );
  }
  
  function CardTitle({ children }) {
    return <h3 className="text-lg font-bold mb-4">{children}</h3>;
  }
  
  function TableCell({ children, className }) {
    return <td className={`px-4 py-2 ${className}`}>{children}</td>;
  }
  
  function Table({ children, className }) {
    return <table className={`w-full ${className}`}>{children}</table>;
  }
  
  function TableHeader({ children }) {
    return <thead className="bg-[#F8F9FB]">{children}</thead>;
  }
  
  function TableRow({ children }) {
    return <tr >{children}</tr>;
  }
  
  function TableHead({ children }) {
    return <th className="px-4 py-2 text-left text-[12px] font-bold text-black uppercase">{children}</th>;
  }
  
  function TableBody({ children }) {
    return <tbody className="border-t-[1px] border-b-[1px]">{children}</tbody>;
  }

  

export default function Dashboard() {
  // Initialize state for the date with current date
  const [date, setDate] = useState(new Date());
  const [totalPatients, setTotalPatients] = useState(0);
  // Function to handle changing the date
  const handleDateChange = (increment) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + increment);
    setDate(newDate);
  };


  const { vetId } = useParams();
  const [vetProfile, setVetProfile] = useState(null);


  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchVetProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/veterinaries/profile/${vetId}`);
        setVetProfile(response.data.veterinaire); // Assuming the vet data structure
        // Calculate the number of patients
        const numberOfPatients = response.data.veterinaire.pets.length;
        
        setTotalPatients(numberOfPatients);
        console.log('Number of patients:', numberOfPatients);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération du profil du vétérinaire :", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching (success or error)
      }
    };

    fetchVetProfile();
  }, [vetId]);



  const [totalAppointments,setTotalAppointment]=useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointment/vet/${vetId}`);
      
        console.log('number appointment',response.data.appointments.length)
        setTotalAppointment(response.data.appointments.length)
      } catch (error) {
        console.error('Error fetching vet appointments:', error.message);
      }
    };
    fetchData();
  }, [vetId]);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const goToPreviousPage = () => {
    const newPage = currentPage > 1 ? currentPage - 1 : currentPage;
    setCurrentPage(newPage);
    navigate(`/page-${newPage}`);
  };

  const goToNextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    navigate(`/page-${newPage}`);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const handleConfirmLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    
    // Navigate to the home page
    navigate('/');
  };

  const handleCancelLogout = () => {
    // Hide confirmation dialog
    setShowConfirmation(false);
  };

  return (
    <div className="flex w-full bg-gray-100">
      <div className="max-md:w-1/3 w-1/5 top-20 ">
        <Sidebar />
      </div>


      <main className="flex-1 p-6 w-2/3">
        <div className="flex justify-between w-full">
            <div className="flex rounded-lg w-1/2">
        <div className=' bg-gray-200  pt-2.5 pl-2 rounded-l-xl'><SearchIcon  /></div>
          <Input
            className="block w-full p-2 bg-gray-200 rounded-r-xl outline-none"
            placeholder="Search"
          /></div>
          <div className="flex items-center space-x-4">
            <BellIcon className="h-6 w-6 text-gray-600" />
            <Avatar>
              <AvatarImage alt="User profile" src={Doctor} className="h-12 w-12 rounded-full"/>
            </Avatar>
          {/* <TextIcon className="h-6 w-6 text-gray-600 lg:opacity-0 md:visible" /> */}  
          </div>
        </div>


        
        
        
        <div className="grid grid-cols-3 gap-6 mt-6">
          <Card className="col-span-1 bg-white p-4 shadow rounded-lg flex flex-col items-center justify-center">
            <CardTitle>Total Appointment</CardTitle>
            <h2 className="text-3xl font-bold">{totalAppointments}</h2>
            <CurvedlineChart className="w-full h-36" />
           
          </Card>
          <Card className="col-span-1 bg-white p-4 shadow rounded-lg flex flex-col items-center justify-center">
            <CardTitle>Total Patients</CardTitle>
            <h2 className="text-3xl font-bold">{totalPatients}</h2>
            <CurvedlineChart className="w-full h-36" />
            
          </Card>
          <Card className="col-span-1 bg-white p-4 shadow rounded-lg flex flex-col items-center justify-center">
            <CardTitle>Total Earning</CardTitle>
            <h2 className="text-3xl font-bold">489</h2>
            <CurvedlineChart className="w-full h-36" />
            
          </Card>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="px-5 pt-4 text-xl font-bold">Appointment Activity</h3>
            <div className="flex items-center space-x-4 px-5 pt-4 font-bold">
                <a href="#" onClick={() => handleDateChange(-1)} className="h-5 w-5 text-black font-bold">
                  <ChevronLeftIcon />
                </a>
                <time dateTime={date.toISOString()}>
                  {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <a href="#" onClick={() => handleDateChange(1)} className="h-5 w-5 text-black font-bold">
                  <ChevronRightIcon />
                </a>
            </div>
          </div>
          <div className="w-full p-8">  
<ReactCalender/>

          </div>
        </div>
      </main>
    </div>
  )
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
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
      strokeWidth="3"
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
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function ClipboardListIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  )
}


function CurvedlineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}



  function SearchIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="gray" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="feather feather-activity">
          <circle cx="10.5" cy="10.5" r="7.5"></circle>
          <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
          </svg>
    )
  }

