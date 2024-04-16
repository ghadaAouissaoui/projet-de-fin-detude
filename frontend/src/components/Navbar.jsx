import React, { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navRef = useRef(null);

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("hidden");
    }
  };

  return (
    <header className="relative flex items-center justify-between h-20 px-8 bg-white text-gray-800">
      <div>
        <h3 className="font-bold">LOGO</h3>
      </div>
      <button
        className="md:hidden p-1 cursor-pointer bg-transparent border-none outline-none text-gray-800 lg:invisible opacity-1 text-3xl"
        onClick={showNavbar}
      >
        <FaBars />
      </button>
      <nav ref={navRef} className="hidden lg:flex items-center justify-between ml-auto gap-80">
        <div className="flex m">
          <a className="relative mx-4 text-blue-500 no-underline " href="/#">
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
          </a>
          <a className="mx-4 text-gray-800 no-underline hover:text-blue-500" href="/#">
            Find Doctor
          </a>

          <a className="mx-4 text-gray-800 no-underline hover:text-blue-500" href="/#">
            Services
          </a>
          <a className="mx-4 text-gray-800 no-underline hover:text-blue-500" href="/#">
            About Us
          </a>
          <a className="mx-4 text-gray-800 no-underline hover:text-blue-500" href="/#">
            Contact Us
          </a>
        </div>

        <div className="flex items-center ml-0 md:ml-4 ">
          <button className=" bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
            Register
          </button>
          <GoArrowUpRight className=" text-blue-600 ml-2 text-2xl" />
        </div>
        <button className="md:hidden nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
