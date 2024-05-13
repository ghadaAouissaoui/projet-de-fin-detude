import React ,{useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
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

      // Card component
export const Card = ({ children, className }) => {
    return (
      <div className={`bg-white p-4 shadow rounded-lg ${className}`}>
        {children}
      </div>
    );
  };
    function CardTitle({ children }) {
      return <h3 className="text-lg font-bold mb-4">{children}</h3>;
    }
  
    
    // CardHeader component
    export function CardHeader({ children }) {
      return <div className="mb-2">{children}</div>;
    }
    
    // CardContent component
    export function CardContent({ children }) {
      return <div>{children}</div>;
    }

    function CardDescription(props) {
        return (
          <div className="card-description">
            {props.children}
          </div>
        );
      }
      function Label({ htmlFor, children }) {
        return (
          <div className='pb-2'>
            <label htmlFor={htmlFor}>{children}</label>
          </div>
        );
      }      

export const Input = (props) => {
    return (
      <input
        {...props}
        className={` border-2 p-2 rounded-md ${props.className}`}
      />
    );
  };
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


  function TableCell({ children, className }) {
    return <td className={`px-4 py-2  ${className}`}>{children}</td>;
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
  
  function TableHead({ children,className }) {
    return <th className={`px-4 py-2 text-left text-[12px] font-bold text-black uppercase ${className}`}>{children}</th>;
  }
  
  function TableBody({ children }) {
    return <tbody className="border-t-[1px] border-b-[1px]">{children}</tbody>;
  }



export default function Patient() {
  const [patients, setPatients] = useState([]);
const {vetId}=useParams()
  useEffect(() => {
    // Définissez une fonction asynchrone pour récupérer les patients du vétérinaire
    const fetchPatients = async () => {
      try {
        // Faites une requête GET à votre backend pour récupérer les patients du vétérinaire
        const response = await axios.get(`http://localhost:5000/api/veterinaries/${vetId}/patients`);
        
        // Mettez à jour l'état des patients avec les données de la réponse
        setPatients(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    // Appelez la fonction pour récupérer les patients lorsque le composant est monté
    fetchPatients();
  }, []); // Assurez-vous de passer un tableau vide comme deuxième argument pour useEffect afin de ne déclencher cette fonction qu'une seule fois lors du montage du composant
console.log(patients);
  return (
    <div className="flex min-h-screen bg-gray-100 ">
        <div  className="max-md:w-1/3 w-1/5 top-20 "><Sidebar/></div> 
        
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[200px_1fr] p-6 space-x-4 overflow-x-auto">
      
        <div className="bg-white rounded-lg shadow-md p-6  space-y-6">
          <div className="space-y-6 ">
            <h2 className="text-lg font-bold">Quick Stats</h2>
            <div className="grid grid-row-2 gap-4">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <UsersIcon className="w-6 h-6 text-gray-500" />
                  <span className="text-2xl font-bold">1,234</span>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Total Patients</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <ActivityIcon className="w-6 h-6 text-gray-500" />
                  <span className="text-2xl font-bold">789</span>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Active Patients</p>
                </CardContent>
              </Card>    
            </div>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <form className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <Input
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search patients..."
                  type="search"
                />
              </form>
            
            </div>
            <Button size="sm">Add Patient</Button>
          </div>


          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {patients.map(patient => (
    <TableRow key={patient._id}>
        <TableCell>{patient.name}</TableCell>
        <TableCell>{patient.species}</TableCell>
        <TableCell>
            {patient.appointments
                .filter(appointment => appointment.status === 'not_available') // Filtrer les rendez-vous avec le statut 'not_available'
                .map(appointment => appointment.appointment_date) // Extraire les dates de rendez-vous
                .reduce((maxDate, currentDate) => { // Trouver la date la plus récente
                    return maxDate > currentDate ? maxDate : currentDate;
                }, '') // La date initiale est une chaîne vide
            }
        </TableCell>
        <TableCell className="text-right">
            <Button size="sm" >
                View
            </Button>
        </TableCell>
    </TableRow>
))}

              
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}

function ActivityIcon(props) {
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
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
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


function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function UsersIcon(props) {
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
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

{/*  <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <FilterIcon className="w-5 h-5 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value="name">
                    <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="species">Species</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="lastVisit">Last Visit</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>*/} 