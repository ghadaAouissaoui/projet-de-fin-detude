import React, {useState,useEffect} from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Sidebar from "./Sidebare";
import { ResponsiveLine } from '@nivo/line';
import Doctor from '../images/femaleDoctor.jpg';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import {  useNavigate } from "react-router-dom";


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
  const [successMessage, setSuccessMessage] = useState("");
  const navigate=useNavigate()
  const token = localStorage.getItem("token");
 console.log(token)


  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    telephone: "",
    cin: "",
    password:"",
    role: "secretaire", // Ajoutez le rôle de l'utilisateur dans les données du formulaire
  });
 // Surveiller le changement du token

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/veto/secretaire/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoutez le jeton dans l'en-tête d'autorisation
        },
      });
      console.log(response.data);
      setSuccessMessage("Secrétaire créé avec succès.");
      navigate('/')

    } catch (error) {
      console.error("Error creating secretary:", error);
      // Traitez les erreurs en fonction de votre logique (par exemple, affichez un message d'erreur)
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              name="fullname"
              placeholder="Enter the name"
              required
              className="w-full"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="example@example.com"
              required
              type="email"
              className="w-full"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="telephone">Phone Number</Label>
            <Input
              id="telephone"
              name="telephone"
              placeholder="+216 55-555-555"
              required
              type="tel"
              className="w-full"
              value={formData.telephone}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cin">CIN</Label>
            <Input
              id="cin"
              name="cin"
              placeholder="Enter your CIN"
              required
              type="text"
              className="w-full"
              value={formData.cin}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              type="password"
              className="w-full"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

        <Button
          className="w-full border-none p-2 rounded-md bg-blue-700 hover:bg-blue-500 text-white"
          type="submit"
        >
          Save User
        </Button>
      </form>
      
      </div>
      </main>


      </div>
    </div>
  )
}