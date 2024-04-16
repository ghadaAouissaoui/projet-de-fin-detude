import React from 'react';

const ComponentF = () => {
  return (
    <div className="w-full mt-20 pb-20 flex items-center flex-col">
      <div className="rounded-lg p-4 flex items-center justify-between w-full ">
        <Card
          title="Medical services at home"
          description="Receive medical services to do a variety of tests at your home"
          icon={<ChevronRightIcon />}
          color="#6fb1dc"
        />
        <Card
          title="Free Consultation"
          description="From initial diagnosis to nutrition and healthy lifestyle, we are ready to provide free services to you."
          icon={<ChevronRightIcon />}
          color="#786ec8"
        />
      </div>
      <div className="w-5/6 mx-auto">
        <h2 className="text-center text-2xl mb-8 ml-12 font-bold mt-4">How it Works?</h2>
        <div className="flex ">
          <StepCard
            icon={<UserIcon className="mx-auto mb-2 h-12 w-12 text-gray-500" />}
            number="1"
            title="Find Your Doctor"
            description="Find your desired doctor and clinic based on location and specialty."
          />
          <StepCard
            icon={<CalendarIcon className="mx-auto mb-2 h-12 w-12 text-gray-500" />}
            number="2"
            title="Make an Appointment"
            description="Easily book your appointment on the desired date."
          />
          <StepCard
            icon={<HomeIcon className="mx-auto mb-2 h-12 w-12 text-gray-500" />}
            number="3"
            title="Get Services"
            description="We will help find and provide solutions for your health."
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, description, icon, color }) => {
  return (
    <div className="w-1/3 h-60  mx-auto rounded-md shadow-md flex mb-4" style={{ backgroundColor: color }}>
      <div>
        <div className="bg-white w-1/2 h-14 text-center pt-3 rounded-br-xl ">
          <h2 className='font-semibold  '>{title}</h2>
        </div>
        <div className="flex flex-row p-10">
          <p className="text-lg text-white">{description}</p>
          <div className="text-white p-3 cursor-pointer">{icon}</div>
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ icon, title, description, number }) => {
  return (
    <div className="w-full text-center bg-white rounded-lg p-6">
      {icon}
      <h2 className="text-blue-400">{number}</h2>
      <h3 className="text-blue-600 text-lg font-semibold">{title}</h3>
      <p className='text-base font-medium text-gray-500 flex w-3/10 ml-35'>{description}</p>
    </div>
  );
};

const CalendarIcon = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
};

const ChevronRightIcon = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
};

const HomeIcon = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
};

const UserIcon = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

export default ComponentF;
