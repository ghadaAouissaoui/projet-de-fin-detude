import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white">
      <div className="md:mx-20 lg:mx-2 flex justify-between">
        <div className="flex flex-col w-full space-y-4 ml-8 pb-10">
          <div className="w-1/5 mx-auto flex text-center">
            <a className="text-[#3C4E91] w-full text-lg mx-auto bg-white rounded-bl-xl rounded-br-xl p-4 flex items-center justify-center hover:underline flex-nowrap" href="#">
              Back to Top <ArrowUpIcon className="h-4 w-4 ml-1" />
            </a>
          </div>
          <div className='flex flex-row w-full pt-6 gap-10'>
            <div className="flex flex-col w-80">
              <div className="flex space-x-3 mb-2">
                <StethoscopeIcon className="h-6 w-6" />
                <span className="font-bold">Vitoline</span>
              </div>
              <p className="lg:text-md ms:text-ms py-2">With Vitoline, you can easily schedule appointments with your preferred veterinarian for your pet, from anywhere and at any time.</p>
              <div className="flex space-x-4 mt-4">
                <InstagramIcon className="h-6 w-6" />
                <TwitterIcon className="h-6 w-6" />
                <FacebookIcon className="h-6 w-6" />
                <LinkedinIcon className="h-6 w-6" />
              </div>
            </div>
            <div className='flex flex-col w-full gap-4'>
              <FooterLink href="/signup">Patient registration</FooterLink>
              <FooterLink href="/signuppro">Registration of doctors</FooterLink>
              <FooterLink href="#">Terms & Conditions</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
            </div>
            <div className='flex flex-col w-full gap-4'>
              <FooterLink href="/aboutus">About Us</FooterLink>
              <FooterLink href="contactus">Contact Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Hospital & Clinics</FooterLink>
            </div>
            <div className='flex flex-col w-full gap-4'>
  <FooterLink href="#">Dentistry</FooterLink>
  <FooterLink href="#">Orthopedics</FooterLink>
  <FooterLink href="#">Dermatology</FooterLink>
  <FooterLink href="#">Ophthalmology</FooterLink>
  <FooterLink href="#">Neurology</FooterLink>
  <FooterLink href="#">Cardiology</FooterLink>
</div>
<div className='flex flex-col w-full gap-4'>
  <FooterLink href="#">Oncology</FooterLink>
  <FooterLink href="#">Behavioral Medicine</FooterLink>
  <FooterLink href="#">Internal Medicine</FooterLink>
  <FooterLink href="#">Surgery</FooterLink>
  <FooterLink href="#">Emergency and Critical Care</FooterLink>
  <FooterLink href="#">Radiology</FooterLink>
</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterLink({ href, children }) {
  return (
    <a href={href} className="font-semibold hover:underline">{children}</a>
  );
}
// Icon components
function ArrowUpIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l7-7 7 7M12 5v14"></path>
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect width="4" height="12" x="2" y="9"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function StethoscopeIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
      <circle cx="20" cy="10" r="2"></circle>
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  );
}
