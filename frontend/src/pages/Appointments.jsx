import React from "react"
import axios from "axios";
import { useState ,useEffect } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import Axios from "axios";
import { ResponsiveLine } from '@nivo/line';
import Doctor from '../images/femaleDoctor.jpg';
import Sidebar from "./Sidebare";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DialogContent, DialogTitle, TextField, Button,DialogActions, Dialog } from '@mui/material';
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
          className={`t px-2 py-1 text-xs font-semibold rounded-full ${
            variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {children}
        </span>
      );
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


    
  function DropdownMenu(props) {
    return (
      <div className="dropdown-menu">
        {props.children}
      </div>
    );
  }
  
  function DropdownMenuTrigger(props) {
    return (
      <div className="dropdown-trigger" onClick={props.onClick}>
        {props.children}
      </div>
    );
  }
  
  function DropdownMenuContent(props) {
    return (
      <div className={`dropdown-content ${props.align}`}>
        {props.children}
      </div>
    );
  }
  
  function DropdownMenuItem(props) {
    return (
      <div className="dropdown-item" onClick={props.onClick}>
        {props.children}
      </div>
    );
  }
  
  function MoreHorizontalIcon(props) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="12" r="2" fill="#000000"/>
        <circle cx="12" cy="12" r="2" fill="#000000"/>
        <circle cx="19" cy="12" r="2" fill="#000000"/>
      </svg>
    );
  }

export default function Appointment() {
  
  const { vetId } = useParams();


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [formData, setFormData] = useState({
    name: '',
    appointment_date: '',
    appointment_time: '',
    reason: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:5000/api/appointment/${vetId}`, formData);

      if (!response.data.success) {
        throw new Error('Failed to create appointment');
      }

      // Appointment created successfully, handle any UI updates or notifications
      handleClose();
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Handle error, display error message to the user, etc.
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function Label({ componentName, valueType, isProOnly }) {
    const content = (
      <span>
        <strong>{componentName}</strong> for {valueType} editing
      </span>
    );
  }


  return (
    
    <div className="flex w-full bg-gray-100">
        <div className="max-md:w-1/3 w-1/5 top-20 ">
          <Sidebar />
         </div>


      <main className="flex-1 w-2/3 pb-8">        
      <div className="flex justify-between w-full pb-8 p-6">
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

        
    <div className="bg-gray-100 flex flex-col">
      <header className="bg-white  shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <PawPrintIcon className="h-6 w-6 text-primary" />
        
        <div className="flex flex-row ">
                <div className="bg-slate-200 p-2 rounded-l-lg"><SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" /></div>
                <Input
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-slate-200 rounded-r-lg"
                  placeholder="Search appointments..."
                  type="search"
                />
              </div>
              </div>
        
        
        
        <button className="flex flex-row items-center bg-slate-200 p-2 pl-8 gap-2 rounded-md font-semibold w-[250px]" onClick={handleClickOpen}>
          <PlusIcon className="h-4 w-4 mr-2" />
         New Appointment
        </button>
        <Dialog
        open={open}
        onClose={handleClose}>
          <form onSubmit={handleChange}>
         <DialogTitle>Make an Appointment</DialogTitle>
         <DialogContent className="sm:w-[425px]">
        <div className="grid gap-4 py-4">
          
          <TextField
                    fullWidth
                    label="Pet Name"
                    name="petName"
                    value={formData.petName}
                    onChange={handleChange}
                    margin="normal"
                />
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoItem label={<Label componentName="DatePicker" valueType="date" />} name="appointmentDate"
                          value={formData.appointmentDate}
                          onChange={handleChange} >
                               <DatePicker />
                     </DemoItem>
        
                     <DemoItem label={<Label componentName="TimePicker" valueType="time" />} name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}>
                        <TimePicker />
                     </DemoItem>
                       </LocalizationProvider>  
                        <TextField
                                  fullWidth
                                  label="Reason"
                                  name="reason"
                                  value={formData.reason}
                                  onChange={handleChange}
                                  margin="normal"
                              />
                </div>
                  </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Confirm Appointment</Button>
                    </DialogActions>
                    </form>
                  </Dialog>

      </header>


      <main className="m-4">
      <div className="bg-white rounded-lg shadow-sm mt-8 ">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Request Appointments</h2>
          </div>
          </div>
          <div className="border shadow-sm rounded-lg  bg-white p-4 mt-1 ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[150px]">Patient</TableHead>
                  <TableHead className="hidden md:table-cell">Owner</TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                
                <TableRow>
                  <TableCell className="font-medium">April 26, 2023</TableCell>
                  <TableCell>Whiskers, Cat</TableCell>
                  <TableCell className="hidden md:table-cell">Jane Smith</TableCell>
                  <TableCell className="hidden md:table-cell">2:30 PM</TableCell>
                  <TableCell className="text-left ">
                    <Badge variant="warning">Pending</Badge>
                  </TableCell>
                  <TableCell className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger onClick={handleDropdownToggle}>
          <MoreHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        {isDropdownOpen && (
          <DropdownMenuContent align="start">
            <DropdownMenuItem>View appointment</DropdownMenuItem>
            <DropdownMenuItem>Reschedule</DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">April 27, 2023</TableCell>
                  <TableCell>Fluffy, Rabbit</TableCell>
                  <TableCell className="hidden md:table-cell">Sarah Johnson</TableCell>
                  <TableCell className="hidden md:table-cell">4:45 PM</TableCell>
                  <TableCell className="text-left">
                    <Badge variant="success">Confirmed</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    
                      
                  <DropdownMenu>
        <DropdownMenuTrigger onClick={handleDropdownToggle}>
          <MoreHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        {isDropdownOpen && (
          <DropdownMenuContent align="start">
            <DropdownMenuItem>View appointment</DropdownMenuItem>
            <DropdownMenuItem>Reschedule</DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          </main>
          </div>
      
      <main className="flex md:flex-row flex-col w-full">
        <div className="bg-white  rounded-lg shadow-sm overflow-hidden m-4 md:w-1/2 w-full">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">April 27, 2023</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">10:00 AM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Fluffy the Cat</span>
                </div>
              </div>
              <div className="flex items-center font-semibold gap-2">
                <button size="sm" variant="outline" className="flex gap-2 items-center bg-transparent border border-gray-400 rounded-md hover:bg-green-400 w-24 p-4">
                  <PencilIcon className="h-4 w-4" />
                 <a >Edit</a> 
                </button>
                <button className="flex items-center bg-transparent border w-24 p-4 border-gray-400  rounded-md hover:bg-red-500"  variant="outline">
                  <XIcon className="h-4 w-4 " />
                  <a>Cancel</a>
                </button>
              </div>
            </div>
          </div>
        </div>
       

        <div className="bg-white rounded-lg shadow-sm  m-4 md:w-1/2 w-full">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Appointments</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">April 24, 2023</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">9:00 AM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Sarah Lee</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Whiskers the Hamster</span>
                </div>
              </div>  
            </div>
          </div>
        </div>

        </main>
        
        
      </main>
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


function PencilIcon(props) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}


function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
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

