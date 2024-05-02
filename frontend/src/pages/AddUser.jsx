import React from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Sidebar from "./Sidebare";
import { ResponsiveLine } from '@nivo/line';
import Doctor from '../images/femaleDoctor.jpg';
  

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
        

export function Label({ htmlFor, children }) {
    return (
      <div className='pb-2'>
        <label htmlFor={htmlFor}>{children}</label>
      </div>
    );
  }      
  function Button({ children, className }) {
    return (
      <button
        className={` ${className }`}
      >
        {children}
      </button>
    );
  }


export const Input = (props) => {
return (
  <input
    {...props}
    className={` border-2 p-2 rounded-md ${props.className}`}/>);
};


export default function Adding() {


    const [role, setRole] = React.useState('');

    const handleChange = (event) => {
      setRole(event.target.value);
    };


  return (
    <div className="space-y-6 flex w-full bg-gray-100">
        <div  className="max-md:w-1/3 w-1/5 top-20 "><Sidebar/></div>  

        <div className="flex-1 pb-8  ">

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
          </div>
        </div>
        <main className="bg-white p-12 ">
            <div className=" mx-24 p-2 rounded-lg border-2 ">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Add User</h1>
        <p className="text-gray-500">Enter the new user's information.</p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required className='w-full' />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john@example.com" required type="email" className='w-full'/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="+216 55-555-555" required type="tel" className='w-full' />
        </div>

        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value={10}>Veterinarian</MenuItem>
          <MenuItem value={20}>Nurse</MenuItem>
          <MenuItem value={30}>secretary</MenuItem>
        </Select>
      </FormControl>
    </Box>

        <Button className="w-full border-none p-2 rounded-md bg-blue-700 hover:bg-blue-500 text-white " type="submit">
          Save User
        </Button>
      </form></div>
      </main>
      </div>
    </div>
  )
}