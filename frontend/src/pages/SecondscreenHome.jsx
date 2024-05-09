import React, {useState,useEffect} from 'react';
import axios from 'axios'; // Import axios library
import doctor from '../images/doctor.png';
import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const ComponentD = () => {

  const [veterinarians, setVeterinarians] = useState([]);

  useEffect(() => {
    const fetchVeterinarians = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/veterinaries');
        setVeterinarians(response.data);
      } catch (error) {
        console.error('Error fetching veterinarians data:', error);
      }
    };

    fetchVeterinarians();
  }, []);
  console.log(veterinarians);
  return (
    <div className="flex items-center justify-between flex-col bg-white mx-auto">
      <h2 className='text-3xl font-semibold text-gray-800'>Find top specialist doctors here</h2>
      <div className="overflow-hidden ml-16 whitespace-nowrap w-full px-4 py-2 rounded-md flex items-center slide-container">
        <button className="inline-block mr-8 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600  w-64 h-24 cursor-pointer">Cardiovascular</button>
        <button className="inline-block mr-8 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600  w-64 h-24 cursor-pointer">Orthopedist</button>
        <button className="inline-block mr-8 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600  w-64 h-24 cursor-pointer">Internist</button>
        <button className="inline-block mr-8 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600  w-64 h-24 cursor-pointer">Pulmonologist</button>
        <button className="inline-block mr-8 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600  w-64 h-24 cursor-pointer">Dentist</button>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 m-5 md:grid-cols-2 mx-5 md:mx-0 my-5">


          {veterinarians.map((vet, index) => (
          <div key={index} className="w-full bg-white shadow-md p-6 rounded-md">
            <div className="flex">
              <img
                className="w-28 h-28 rounded-full"
                src={doctor}
                alt={vet.fullname} // Utilize the veterinarian's name as an alternative to the image
              />
              <div className="flex flex-row ml-4 ">
                <div className='mt-4 '>
                  <h3 className='pt-8'>{vet.fullname}</h3>
                  <p>{vet.specialite}</p>
               < div>
                  <p >{vet.address.rue}</p>
                  <p>{vet.address.city}</p>
                  <p >{vet.address.postalCode}</p>
                  </div>
                </div>
                </div>
                <div className="flex items-center mb-20">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1 text-blue-700">4.9</span>
                
              </div>
            </div>

            
            <div className="flex justify-between mt-4 w-full">
            <div className="flex justify-between mt-4 w-full lg:flex-row md:flex-col sm:flex-col">
           <div className='lg:w-1/2  items-center md:w-full md:m-1 sm:w-full sm:m-1'> 
           <button className="bg-blue-600 h-12 flex justify-center pt-2 text-white rounded-md w-full"><Link to={`/calendar/${vet._id}`}>Book Appointment</Link></button></div>
           
            <div className=' lg:w-1/2 md:w-full md:m-1 sm:w-full border-2 border-blue-500 flex items-center justify-center h-12 rounded-md cursor-pointer mx-1'>
            <Link to={`/doctorprofile/${vet._id}`}>Doctor Profile</Link><GoArrowUpRight className="ml-1 text-blue-600 text-2xl" />
            </div>
          </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StarIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#fde874"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default ComponentD;