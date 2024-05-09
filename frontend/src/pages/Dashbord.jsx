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
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération du profil du vétérinaire :", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching (success or error)
      }
    };

    fetchVetProfile();
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
            <h2 className="text-3xl font-bold">489</h2>
            <CurvedlineChart className="w-full h-36" />
            <Badge className="mt-2" variant="secondary">
              +5.9% last week
            </Badge>
          </Card>
          <Card className="col-span-1 bg-white p-4 shadow rounded-lg flex flex-col items-center justify-center">
            <CardTitle>Total Patients</CardTitle>
            <h2 className="text-3xl font-bold">210</h2>
            <CurvedlineChart className="w-full h-36" />
            <Badge className="mt-2" variant="secondary">
              +4.7 last week
            </Badge>
          </Card>
          <Card className="col-span-1 bg-white p-4 shadow rounded-lg flex flex-col items-center justify-center">
            <CardTitle>Total Earning</CardTitle>
            <h2 className="text-3xl font-bold">489</h2>
            <CurvedlineChart className="w-full h-36" />
            <Badge className="mt-2" variant="secondary">
              +8.2% last week
            </Badge>
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



        {/*<Table className="mt-4 w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Visit Time</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Conditions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <div className="flex flex-row flex-wrap items-center px-5 pt-2">
                <Avatar>
            <AvatarImage alt="Profile picture" src={Doctor} className='h-9 w-9 rounded-full' />
          </Avatar>
                  <TableCell className="font-medium">Leslie Alexander</TableCell>
                  </div>
                <TableCell>25</TableCell>
                <TableCell>$25/h</TableCell>
                <TableCell>09-15-2020</TableCell>
                <TableCell>09:15-09:45am</TableCell>
                <TableCell>Dr. Jacob Jones</TableCell>
                <TableCell>Mumps Stage II</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <div className="flex flex-row flex-wrap items-center px-5 pt-2">
                <Avatar>
            <AvatarImage alt="Profile picture" src={Doctor} className='h-9 w-9 rounded-full' />
          </Avatar>
                  <TableCell className="font-medium">Leslie Alexander</TableCell>
                  </div>
                <TableCell>25</TableCell>
                <TableCell>$25/h</TableCell>
                <TableCell>09-15-2020</TableCell>
                <TableCell>09:15-09:45am</TableCell>
                <TableCell>Dr. Jacob Jones</TableCell>
                <TableCell>Mumps Stage II</TableCell>
              </TableRow>
            </TableBody>
          </Table>
  */}
          </div>
          <div className="flex justify-between items-center mt-4 px-4 py-3">
            <span className="text-gray-500">Showing 1-12 out of 40</span>
            <div className="flex space-x-2">
            <Button onClick={goToPreviousPage}>Prev</Button>
            <div className="flex space-x-2">
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <span>...</span>
            <Button variant="outline">9</Button>
          </div>
            <Button onClick={goToNextPage}>Next</Button>
            </div>
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


function GroupIcon(props) {
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
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  )
}


function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function InboxIcon(props) {
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
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  )
}


function LogOutIcon(props) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}


function SpeakerIcon(props) {
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
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <circle cx="12" cy="14" r="4" />
      <line x1="12" y1="6" x2="12.01" y2="6" />
    </svg>
  )
}


function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function TextIcon(props) {
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
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  )
}


function UserPlusIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  )
}

function UserEtoileIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="feather feather-activity">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
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

