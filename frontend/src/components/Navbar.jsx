import React, { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleButtonClick = () => {
    navigate('/signup'); // Navigate to the specified route when the button is clicked
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        if (window.scrollY > navbar.offsetHeight) {
          navbar.classList.add("fixed");
        } else {
          navbar.classList.remove("fixed");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="navbar" className="flex items-center max-md:absolute w-full md:h-[80px] justify-between bg-white px-20 py-5  bg-fixed table-fixed top-0 z-50">
      <div>
        <h3 className="font-bold">LOGO</h3>
      </div>
      <button
        className="md:hidden p-1 cursor-pointer bg-transparent absolute top-4 right-8 border-none outline-none text-gray-800 opacity-1 text-3xl"
        onClick={toggleNavbar}
      >
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav
        className={`${
          isNavOpen ? "block" : "hidden"
        } md:flex md:flex-wrap md:mr-[400px] max-md:absolute max-md:h-[100vh] flex-col items-center justify-center max-md:bg-blue-900 px-20 py-5  max-md:top-[64px] max-md:right-[0px] `}
      >
        {/* Your navigation links */}
        <div className="max-md:flex  max-md:flex-col w-full max-md:p-5  flex flex-row ">
          <a className="relative mx-4 text-md font-semibold no-underline 
            transition duration-300 ease-in-out hover:text-blue-500 group
            max-md:p-5" href="/" >
            Home
            <span className="absolute  right-[20px] -left-[0px] md:group-hover:w-[100%] block w-[60%] h-[2px] bg-[#6799fc] max-md:left-[20px] max-md:w-[30%] max-md:h-[2px]"></span>
          </a>

          <a className="relative mx-4 text-md font-semibold hover:text-blue-500 text-gray-800 no-underline transition duration-300 ease-in-out group
          max-md:p-5" href="/">
            Find Doctor
            <span className="absolute  -left-[0px]  block w-0 h-[2px] bg-[#6799fc] transition-all duration-300 ease-in-out group-hover:w-[60px] max-md:group-hover:left-5"></span>
          </a>
          <a className="relative mx-4 text-md font-semibold hover:text-blue-500 text-gray-800 no-underline transition duration-300 ease-in-out group
          max-md:p-5" href="/services">
            Services
            <span className="absolute  -left-[0px]  block w-0 h-[2px] bg-[#6799fc] transition-all duration-300 ease-in-out group-hover:w-[60px] max-md:group-hover:left-5"></span>
          </a>
          <a className="relative mx-4 text-md font-semibold hover:text-blue-500 text-gray-800 no-underline transition duration-300 ease-in-out group max-md:p-5" href="/aboutus">
            About Us
            <span className="absolute  -left-[0px]  block w-0 h-[2px] bg-[#6799fc] transition-all duration-300 ease-in-out group-hover:w-[60px] max-md:group-hover:left-5"></span>
          </a>
          <a className="relative mx-4 text-md font-semibold hover:text-blue-500 text-gray-800 no-underline transition duration-300 ease-in-out group max-md:p-5" href="/contactus">
            Contact Us
            <span className="absolute -left-[0px]  block w-0 h-[2px] bg-[#6799fc] transition-all duration-300 ease-in-out group-hover:w-[60px] max-md:group-hover:left-5"></span>
          </a>

        <div className="md:absolute flex items-center  right-5 top-4 max-md:p-5">
          <button className=" bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" onClick={handleButtonClick} >
            Register
          </button>
          <GoArrowUpRight className=" text-blue-600 ml-2 text-2xl cursor-pointer" onClick={handleButtonClick} />
        </div>
        <button
          className="md:hidden p-1 top-[10px]  cursor-pointer bg-transparent border-none outline-none text-gray-800 opacity-1 text-3xl"
          onClick={toggleNavbar}>
        </button>
        </div>
      </nav>
    </header>
  );

};

export default Navbar;
