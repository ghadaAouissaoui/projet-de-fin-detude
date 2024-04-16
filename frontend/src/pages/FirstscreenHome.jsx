import React from 'react';
import doctor from '../images/femaleDoctor.jpg';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-white text-gray-900 mb-10 lg:w-full sm:w-full md:w-full">
      <div className='w-full bg-white flex flex-col'>
        <div className="flex flex-row pt-10 w-full h-4/5 bg-blue-900 rounded-tl-lg rounded-tr-lg "> 
          <div className='flex pl-8 text-white'>
            <h1 className="text-3xl font-bold pt-5  pr-2">
              <span>Book </span><a className='text-sm'>your</a><br />
              <span>appointment</span><br />
              <span >online</span><a className="text-sm "> with</a><span className=""> Visitio</span>
            </h1>
          </div>
          <div className='flex ml-auto'>
            <div className="flex justify-center items-center flex-col bg-white bg-opacity-50 h-20 w-1/2 p-4  rounded-lg relative top-[115px] left-[40px]">
              <span className="text-black-700 text-md w-24">New Users</span>
              <span className="text-blue-700 text-3xl font-bold w-24">+500</span>
            </div>
            <div className="hidden sm:block">
              <img
                alt="Doctor"
                className="h-72 rounded-lg shadow-lg mr-5"
                height="400"
                src={doctor}
                style={{
                  aspectRatio: "300/300",
                  objectFit: "cover",
                }}
                width="200"
              />
            </div>
          </div>
        </div>
        <div className='flex flex-row bg-blue-900 rounded-bl-3xl'>
          <div className="bg-white p-5  rounded-tr-3xl w-1/2 h-36 flex flex-col">
            <div>
              <h1 className='font-medium text-black'>Find Your Doctor</h1>
            </div>
            <div className="flex mt-10">
              <input className="border border-gray-300 rounded-md p-2 ml-1 w-1/4 h-10" type="text" placeholder="Your City" />
              <input className="border border-gray-300 rounded-md p-2 ml-1 w-1/4 h-10" type="text" placeholder="Clinic" />
              <input className="border border-gray-300 rounded-md p-2 ml-1 w-1/4 h-10" type="text" placeholder="Category" />
              <button className="bg-blue-900 border-2 border-blue-900 py-2 px-4 rounded-md cursor-pointer ml-1 hover:bg-[#2563eb]">
                <SearchIcon/>
              </button>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
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
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default Home;
