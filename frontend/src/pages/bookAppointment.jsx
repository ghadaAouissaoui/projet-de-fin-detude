import React from 'react';
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import {  Button } from '@mui/material';

import axios from 'axios';
import ReactCalender from './calendrier';


export default function Calendar() {

    const { vetId } = useParams();
   
   

    const [vetProfile, setVetProfile] = useState(null);
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
      const fetchVetProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/veterinaries/profile/${vetId}`);
          setVetProfile(response.data.veterinaire);
          setLoading(false);
        } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération du profil du vétérinaire :", error);
          setLoading(false);
        } 
      };
  
      fetchVetProfile();
    }, [vetId]);

    return (
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 bg-gray-200 p-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center space-y-4">
            <div className="w-24 h-24 bg-[#f3f4f6] rounded-full flex items-center justify-center">
              <img
                alt="Veterinary Clinic"
                height="100"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
            </div>
            <h2 className="text-xl font-semibold text-center">{vetProfile?.nomCabinet}</h2>
            <div className="text-center">
              <p className="text-sm">{vetProfile?.fullname}</p>
              <p className="text-sm">{vetProfile?.address?.rue} {vetProfile?.address?.city} {vetProfile?.address?.postalCode}</p>
             
             {/* <p className="text-sm mt-2 flex items-center justify-center">
                <LocateIcon className="mr-2 w-4 h-4 text-gray-500" />
                10.03 km
            </p>*/}
            </div>
           
          </div>
          <div className="col-span-2 bg-white shadow rounded-lg">
            <ReactCalender/>
          </div>
        </div>
      </section>
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
  
  
  function LocateIcon(props) {
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
        <line x1="2" x2="5" y1="12" y2="12" />
        <line x1="19" x2="22" y1="12" y2="12" />
        <line x1="12" x2="12" y1="2" y2="5" />
        <line x1="12" x2="12" y1="19" y2="22" />
        <circle cx="12" cy="12" r="7" />
      </svg>
    )
  }