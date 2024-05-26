import React from "react";
import { useState ,useEffect } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import Axios from "axios";
import { ResponsiveLine } from '@nivo/line';
import Doctor from '../images/femaleDoctor.jpg';
import { jwtDecode } from "jwt-decode";
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
    
 
  




export default function Sidebar(){


    const { vetId } = useParams();
  const [vetProfile, setVetProfile] = useState(null);
  const [loading, setLoading] = useState(true);
const token=localStorage.getItem('token');
console.log("sidebaaaaar tokeeen",token)

  useEffect(() => {
    const fetchVetProfile = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/api/veterinaries/profile/${vetId}`);
        setVetProfile(response.data.veterinaire);
        setLoading(false);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération du profil du vétérinaire :", error);
        setLoading(false);
      }
    };

    fetchVetProfile();
  }, [vetId]);


    try {
      fetchVetProfile(); // Call the fetchVetProfile function defined within handleClick
    } catch (error) {
      console.error("An error occurred while fetching veterinarian profile:", error);
    }
  };
  
  // Initialize state for the date with current date
  const [date, setDate] = useState(new Date());

  // Function to handle changing the date
  const handleDateChange = (increment) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + increment);
    setDate(newDate);
  };


  const navigate = useNavigate();


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

  const [showContent, setShowContent] = useState(false);

  const handleLiClick = () => {
    setShowContent(!showContent);
  };

    return(

 <>

<aside className=" w-full py-4  bg-white ">
        <div className="flex flex-col items-center space-x-4">
        <Avatar>
            <AvatarImage alt="Profile picture" src={Doctor} className='h-12 w-12 rounded-full' />
          </Avatar>
          <div className="text-center">
          {vetProfile && (
              
              <Link to={`/doctorprofile/${vetProfile._id}`}> <h3 className="text-lg font-bold hover:underline">{vetProfile.fullname}</h3> </Link>
            )}
            <p className="text-sm text-gray-500">{vetProfile?.specialite}</p>
          </div>
        </div>

               { /*sidebarr*/ }
        <nav className="mt-8 ">
          <ul className=" w-full m-0">
            <li className="bg-blue-100 hover:bg-blue-100  w-full h-full font-semibold">
            {vetProfile && (
              <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14 border-r-4  border-[#dc6a07] border-solid" to={`/pro/${vetProfile._id}`}>
                <HomeIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>)}
            </li>
{/*hover:bg-blue-100  w-full h-full font-semibold  */}
            <li className=" {`w-full h-full font-semibold ${showContent ? 'bg-blue-100 border-r-4 border-[#dc6a07] border-solid' : ''}`}" onClick={handleLiClick}>
            {vetProfile && (
    <>
      {!showContent && (
              <Link className="flex items-center space-x-3 text-gray-700  pl-4 h-14 hover:border-r-4 border-[#dc6a07] border-solid" to={`/pro/inbox/${vetProfile._id}`}>
                <InboxIcon className="h-5 w-5" />
                <span>Inbox</span>
              </Link>
              )}
              {showContent && (
        <div className="p-4">

        </div>
      )}
</>
            )}
            </li>


            <li className={`w-full h-full font-semibold ${showContent ? 'bg-blue-100 border-r-4 border-[#dc6a07] border-solid' : ''}`} onClick={handleLiClick}>
  {vetProfile && (
    <>
      {!showContent && (
        <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14 " to={`/pro/appointment/${vetProfile._id}`}>
          <HomeIcon className="h-5 w-5" />
          <span>Appointment</span>
        </Link>
      )}

      {showContent && (
        <div className="p-4">
        </div>
      )}
    </>
  )}
</li>

            <li className={`w-full h-full font-semibold ${showContent ? 'bg-blue-100 border-r-4 border-[#dc6a07] border-solid' : ''}`} onClick={handleLiClick}>
            {vetProfile && (
    <>
      {!showContent && (
              <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14 hover:border-r-4 border-[#dc6a07] border-solid" to={`/pro/patients/${vetProfile._id}`}>
                <UserEtoileIcon className="h-5 w-5" />
                <span>Patients</span>
              </Link>)}
              {showContent && (
        <div className="p-4">
        </div>
      )}
    </>
  )}
            </li>
             
            <li className={`w-full h-full font-semibold ${showContent ? 'bg-blue-100 border-r-4 border-[#dc6a07] border-solid' : ''}`} onClick={handleLiClick}>
            {vetProfile && (
    <>
      {!showContent && (
              <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14 hover:border-r-4 border-[#dc6a07] border-solid" to={`/pro/adding/${vetProfile._id}`}>
                <UserPlusIcon className="h-5 w-5" />
                <span>Add User</span>
              </Link>
              )}
              {showContent && (
        <div className="p-4">
        </div>
      )}
    </>
  )}
            </li>

            
            {/* Logout button */}
      <li className="hover:bg-blue-100 w-full h-full font-semibold">
        <div className="flex items-center space-x-3 text-gray-700 pl-4 h-14 hover:border-r-4 border-[#dc6a07] border-solid" onClick={handleLogout}>
          <LogOutIcon className="h-5 w-5" />
          <span>Logout</span>
        </div>
      </li>

      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center">
              <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded" onClick={handleConfirmLogout}>Yes</button>
              <button className="bg-gray-500 text-white px-4 py-2 ml-2 rounded" onClick={handleCancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
          </ul>
        </nav>
        <div className="mt-auto text-xs text-gray-400 pt-8">© 2024 All Rights Reserved.</div>
      </aside>
      
      </>
);
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
  
  
  

  