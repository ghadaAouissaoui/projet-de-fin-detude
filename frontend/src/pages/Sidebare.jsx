import React from "react";
import { useState ,useEffect } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import Axios from "axios";
import { ResponsiveLine } from '@nivo/line';
import Doctor from '../images/femaleDoctor.jpg';
import { jwtDecode } from "jwt-decode";
import { FaRegUser } from "react-icons/fa";
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
    
 
  




      export default function Sidebar() {
        const { vetId } = useParams();
        const [profile, setProfile] = useState(null);

        const [loading, setLoading] = useState(true);
        const [showConfirmation, setShowConfirmation] = useState(false);
        const token = localStorage.getItem('token');
        const navigate = useNavigate();
        const decoded = jwtDecode(token);

      

        useEffect(() => {
          const fetchProfile = async () => {
            try {
              let response;
              if (decoded.role === 'veterinaire') {
                response = await Axios.get(`http://localhost:5000/api/veterinaries/profile/${vetId}`);
                setProfile(response.data.veterinaire);
              } else if (decoded.role === 'secretaire') {
                response = await Axios.get(`http://localhost:5000/api/veto/secretaire/${decoded.id}`);
                setProfile(response.data);
                console.log('secreeee',response.data)
              }
              setLoading(false);
            } catch (error) {
              console.error("Une erreur s'est produite lors de la récupération du profil :", error);
              setLoading(false);
            }
          };
      
          fetchProfile();
        }, [vetId, decoded.id, decoded.role]);
      
        const handleLogout = () => {
          setShowConfirmation(true);
        };
      
        const handleConfirmLogout = () => {
          localStorage.removeItem('token');
          navigate('/');
        };
      
        const handleCancelLogout = () => {
          setShowConfirmation(false);
        };
      
        if (loading) {
          return <div>Loading...</div>;
        }
      
        return (
          <aside className="w-full py-4 bg-white">
            <div className="flex flex-col items-center space-x-4">
              <Avatar>
                <AvatarImage alt="Profile picture" src={Doctor} className="h-12 w-12 rounded-full" />
              </Avatar>
              <div className="text-center">
                {profile && (
                  <>
                    <h3 className="text-lg font-bold hover:underline">{profile.fullname}</h3>
                    <p className="text-sm text-gray-500">{profile.role}</p>
                  </>
                )}
              </div>
            </div>
      
            <nav className="mt-8">
              <ul className="w-full m-0">
                <li className="bg-blue-100 hover:bg-blue-100 w-full h-full font-semibold">
                  <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14 border-r-4 border-[#dc6a07] border-solid" to={`/pro/${vetId}`}>
                    <HomeIcon className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                {decoded.role === 'veterinaire' && (
                  <>
                    <li className="w-full h-full font-semibold hover:bg-blue-100 border-r-4 border-[#dc6a07] border-solid">
                      <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14" to={`/pro/inbox/${vetId}`}>
                        <InboxIcon className="h-5 w-5" />
                        <span>Inbox</span>
                      </Link>
                    </li>
                    <li className="w-full h-full font-semibold hover:bg-blue-100 border-r-4 border-[#dc6a07] border-solid">
                      <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14" to={`/pro/appointment/${vetId}`}>
                        <HomeIcon className="h-5 w-5" />
                        <span>Appointment</span>
                      </Link>
                    </li>
                    <li className="w-full h-full font-semibold hover:bg-blue-100 border-r-4 border-[#dc6a07] border-solid">
                      <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14" to={`/pro/patients/${vetId}`}>
                        <UserEtoileIcon className="h-5 w-5" />
                        <span>Patients</span>
                      </Link>
                    </li>
                    <li className="w-full h-full font-semibold hover:bg-blue-100 border-r-4 border-[#dc6a07] border-solid">
                      <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14" to={`/pro/adding/${vetId}`}>
                        <UserPlusIcon className="h-5 w-5" />
                        <span>Add User</span>
                      </Link>
                    </li>
                  </>
                )}
                {decoded.role === 'secretaire' && (
                  <>
                    <li className="w-full h-full font-semibold hover:bg-blue-100 border-r-4 border-[#dc6a07] border-solid">
                      <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14" to={`/pro/inbox/${vetId}`}>
                        <InboxIcon className="h-5 w-5" />
                        <span>Inbox</span>
                      </Link>
                    </li>
                    <li className="w-full h-full font-semibold hover:bg-blue-100 border-r-4 border-[#dc6a07] border-solid">
                      <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14" to={`/pro/appointment/${vetId}`}>
                        <HomeIcon className="h-5 w-5" />
                        <span>Appointment</span>
                      </Link>
                    </li>
                    <li className="w-full h-full font-semibold hover:bg-blue-100 border-r-4 border-[#dc6a07] border-solid">
                      <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14" to={`/pro/patients/${vetId}`}>
                        <UserEtoileIcon className="h-5 w-5" />
                        <span>Patients</span>
                      </Link>
                    </li>
                    <li className="w-full h-full font-semibold hover:bg-blue-100 border-r-4 border-[#dc6a07] border-solid">
                      <Link className="flex items-center space-x-3 text-gray-700 pl-4 h-14" to={`/pro/adding/${vetId}`}>
                        <FaRegUser className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
                    </li>
                  </>
                )}
                <li className="hover:bg-blue-100 w-full h-full font-semibold">
                  <div className="flex items-center space-x-3 text-gray-700 pl-4 h-14 hover:border-r-4 border-[#dc6a07] border-solid" onClick={handleLogout}>
                    <LogOutIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </div>
                </li>
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
  
  
  

  