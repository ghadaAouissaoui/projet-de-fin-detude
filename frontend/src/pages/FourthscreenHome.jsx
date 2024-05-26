import React, { useState } from 'react';
import { GoArrowUpRight, GoArrowLeft, GoArrowRight } from 'react-icons/go';
import image from '../images/veterinaire.png';

const ComponentQ = () => {
  return (
    <div className='flex w-full '>
    <div className=" flex flex-col  w-full sm:w-auto ">
      
      <section className="bg-[#bebec0] h-[400px] flex flex-col w-full">
        <div className=" bg-white w-1/3 h-20  rounded-br-3xl">
          <div className="pt-4">
            <span className="text-black font-bold text-2xl pl-9">What Users Say About </span>
            <span className="text-indigo-600 font-bold text-2xl mb-4">Visito</span>
          </div>
        </div>
        <div className="flex  w-full px-6 ">
          <UserReview
            review="Using Visito was a wonderful experience for me. It has a simple and efficient user interface and I was able to easily book an appointment at the office I wanted at the time I wanted. Also, getting a booking confirmation and reminder before my appointment helped me to always be on time at the office."
            avatarSrc={image}
            username="Sara Tylor"
            rating={4.5}
          />
        </div>
      </section>

      <section className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto ">
        <h2 className="mt-16 mb-8 font-semibold text-2xl text-center text-black">Got Questions?</h2>
        <div className=" mb-4 rounded-lg overflow-hidden">
          <Accordion
            question="Can I find the nearest clinic or clinic to my home?"
            answer="Yes, you can find the nearest doctor's office, clinic or clinic that is a member of this system by searching in the doctors or clinics section and specifying your desired area."
          />
        </div>
        <div className="mb-4 rounded-lg overflow-hidden">
          <Accordion
            question="Is it possible to cancel the appointment?"
            answer="Yes, you can cancel your appointment through your user dashboard or by contacting our support directly."
          />
        </div>
        <div className="mb-4 rounded-lg overflow-hidden">
          <Accordion
            question="Are all doctors members of Visito?"
            answer="Not all doctors are members of Visito. We partner with selected clinics and doctors who meet our quality standards."
          />
        </div>
        <div className=" mb-4 rounded-lg overflow-hidden">
          <Accordion
            question="Do I have to pay an amount at the time of appointment?"
            answer="Payment policies vary by clinic. Some may require a deposit or full payment at the time of booking, while others may allow payment at the time of the appointment."
          />
        </div>
      </section>
      </div></div>
  );
};

const UserReview = ({ review, avatarSrc, username, rating, className }) => {
  return (
    <div className={`flex w-full  ${className}`}>
      <div>
        <div className="flex flex-row pt-8 mb-4">
          <div>
            <p className="ml-4 text-gray-600">{username}</p>
          </div>
          <div className="flex items-center ml-3">
            <StarIcon className="text-yellow-400" />
            <span className="ml-1 text-yellow-400">{rating}</span>
          </div>
        </div>
        <blockquote className="flex ml-4 w-1/2 text-gray-900">"{review}"</blockquote>
        <div className="ml-[30%] flex flex-row gap-8 ">
          <GoArrowLeft className="text-gray-700" />
          <GoArrowRight className="text-gray-700" />
        </div>
      </div>

      <div className="flex-row max-md:gap-8 w-full flex max-md:flex-col mt-[-16]">
        <div className="bg-white bg-opacity-50 w-[300px] pt-2 pl-4 max-md:pl-20 h-[60px] top-[100px] md:relative left-0">
          <a href="#" className="text-gray-700 ml-1 text-sm hover:underline">
            +500 Users reviews
          </a>
          <br />
          <div className='flex flex-row mb-4'>
          <a href="#" className="text-gray-700 ml-1 text-sm hover:underline">
            see all reviews
          </a>
          <GoArrowUpRight className="text-gray-700 ml-1 mt-1" />
          </div>
        </div>
        <Avatar src={avatarSrc} alt={username} fallbackText={username.substring(0, 2).toUpperCase()}  />
      </div>
    </div>
  );
};


const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center p-6 cursor-pointer" onClick={toggleAccordion}>
        <span className="font-semibold mb-2 w-full text-blue-600 px-5 py-2">{question}</span>
        <ChevronIcon isOpen={isOpen} />
      </div>
      {isOpen && <p className="px-4 py-2 text-gray-600">{answer}</p>}
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

function Avatar({ src, alt, fallbackText }) {
    return (
      <div>
        <img
          src={src}
          alt={alt}
          className="flex items-center w-[100%] h-[70%] "
          onError={(e) => {
            const target = e.target;
            target.src = `https://via.placeholder.com/40?text=${fallbackText}`;
          }}
        />
      </div>
    );
  }
  

const ChevronIcon = ({ isOpen }) => {
  return (
    <svg
      className={`text-blue transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

const ChevronLeftIcon = (props) => {
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
  );
};

const ChevronRightIcon = (props) => {
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
  );
};

export default ComponentQ;
