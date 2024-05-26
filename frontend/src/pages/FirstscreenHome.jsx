import React,{useEffect,useRef} from 'react';
import doctor from '../images/vet1.png';
import { Link } from 'react-router-dom';
import { useFocus } from './FocusContext';
import fleche from '../images/arrow_decorative-removebg-preview.png'
const Home = () => {
  const { focusTarget } = useFocus();
  const cityInputRef = useRef(null);
  const clinicInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  useEffect(() => {
    if (focusTarget === 'city' && cityInputRef.current) {
      cityInputRef.current.focus();
    } else if (focusTarget === 'clinic' && clinicInputRef.current) {
      clinicInputRef.current.focus();
    } else if (focusTarget === 'category' && categoryInputRef.current) {
      categoryInputRef.current.focus();
    }
  }, [focusTarget]);

  return (
    <div className="flex flex-col items-center  justify-between bg-white text-gray-900 mb-10 lg:w-full sm:w-full md:w-full">
      <div className='w-full bg-white flex flex-col'>
        <div className="flex flex-col pt-10 w-full h-[100vh] md:h-[60vh] bg-blue-900 rounded-tl-lg rounded-tr-lg "> 
          <div className='flex flex-row'>
            <div>
            <h1 className="md:text-5xl text-2xl text-white font-bold pt-10  pr-2">
              <span className='text-white pl-10'>Book </span><a className='text-sm text-white'>your</a><br />
              <span className='text-white pl-10'>appointment</span><br />
              <span className='text-white pl-10' >online</span><a className="text-sm text-white"> with</a><span className=""> Vetoline</span>
            </h1></div>
          <div className='max-md:mt-16 '><CurvedLine/></div>
          </div>
          <div className=' m-auto mr-10 max-md:mr-0 max-md:mt-8 z-0'>
            <div className="flex justify-center items-center flex-col bg-white bg-opacity-50 h-20 w-1/6 p-4  z-50 rounded-lg absolute top-[170px] right-[500px]  max-md:absolute max-md:top-[80px] max-md:right-[200px] ">
              <a className="text-black-700 text-md w-24 hover:underline"href="#">New Users</a>
              <span className="text-blue-700 text-3xl font-bold w-24">+500</span>
            </div>
            <img
                alt="Doctor"
                className="md:h-80 h-[300px] mt-[-150px] max-md:w-full rounded-lg mr-5 md:mt-[-150px]"
                
                src={doctor}
                style={{
                  aspectRatio: "300/300",
                  objectFit: "cover",
                }}
                width="450"
               
              />
            
          </div>
        
          <div className="bg-white p-5 mt-[-150px] rounded-tr-3xl  w-1/2  flex flex-col">
            <div>
              <h1 className='font-medium text-black'>Find Your Doctor</h1>
            </div>
            <div className="flex mt-10">
              <input className="border border-gray-300 rounded-md p-2 ml-1 w-1/4 h-10" type="text" placeholder="Your City" ref={cityInputRef} />
              <input className="border border-gray-300 rounded-md p-2 ml-1 w-1/4 h-10" type="text" placeholder="Clinic" ref={clinicInputRef}/>
              <input className="border border-gray-300 rounded-md p-2 ml-1 w-1/4 h-10" type="text" placeholder="Category" ref={categoryInputRef}/>
              <button className="bg-blue-900 border-2 border-blue-900 py-2 px-4 rounded-md cursor-pointer ml-1 hover:bg-[#2563eb]">
                <Link to="/search"> <SearchIcon /></Link> 
              </button>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
function CurvedLine(props) {
  return (
    <svg fill="#fff" height="80px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 177.501 177.501" xmlSpace="preserve">
      <path d="M0,177.501C0,79.626,79.627,0,177.501,0v15C87.898,15,15,87.898,15,177.501H0z"/>
    </svg>
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
