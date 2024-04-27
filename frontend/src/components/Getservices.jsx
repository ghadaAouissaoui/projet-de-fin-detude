import React from "react"
import {Link } from "react-router-dom";

export default function Services() {
  return (
    <>
    <div className="mt-8">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f8f8] dark:bg-[#171b29] max-md:m-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#333] dark:text-[#f8f8f8]">
                Comprehensive Veterinary Care
              </h1>
              <p className="mx-auto max-w-[700px] text-[#666] md:text-xl dark:text-[#ccc]">
                From routine check-ups to emergency care, our experienced team of veterinarians and staff are dedicated
                to providing the best possible care for your beloved pets.
              </p>
            </div>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-white 
              px-8 text-sm font-medium text-[#f8f8f8] shadow transition-colors hover:bg-[#43a047] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-offset-2 
              disabled:pointer-events-none disabled:opacity-50 dark:bg-[#2e7d32] dark:hover:bg-[#1b5e20] dark:focus:ring-[#2e7d32]"
              href="#"
            >
              Schedule an Appointment
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <StethoscopeIcon className="h-8 w-8 text-[#2834b5] mr-4" />
              <h3 className="text-xl font-bold">General Check-ups</h3>
            </div>
            <p className="text-[#0b0b0b] ">
              Our experienced veterinarians provide comprehensive physical examinations to ensure your pet's overall
              health and well-being.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 ">
            <div className="flex items-center mb-4">
              <SyringeIcon className="h-8 w-8 text-[#2834b5] mr-4" />
              <h3 className="text-xl font-bold">Vaccinations</h3>
            </div>
            <p className="text-[#0b0b0b] ">
              Keep your pet up-to-date with essential vaccinations to protect them from harmful diseases.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 ">
            <div className="flex items-center mb-4">
              <ScissorsIcon className="h-8 w-8 text-[#2834b5] mr-4" />
              <h3 className="text-xl font-bold">Grooming</h3>
            </div>
            <p className="text-[#0b0b0b] ">
              Our professional grooming services will keep your pet looking and feeling their best.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <AlarmCheckIcon className="h-8 w-8 text-[#2834b5] mr-4" />
              <h3 className="text-xl font-bold">Emergency Care</h3>
            </div>
            <p className="text-[#0b0b0b] ">
              Our 24/7 emergency services are available to provide immediate care for your pet in urgent situations.
            </p>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

function AlarmCheckIcon(props) {
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
      <circle cx="12" cy="13" r="8" />
      <path d="M5 3 2 6" />
      <path d="m22 6-3-3" />
      <path d="M6.38 18.7 4 21" />
      <path d="M17.64 18.67 20 21" />
      <path d="m9 13 2 2 4-4" />
    </svg>
  )
}


function ScissorsIcon(props) {
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
      <circle cx="6" cy="6" r="3" />
      <path d="M8.12 8.12 12 12" />
      <path d="M20 4 8.12 15.88" />
      <circle cx="6" cy="18" r="3" />
      <path d="M14.8 14.8 20 20" />
    </svg>
  )
}


function StethoscopeIcon(props) {
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
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  )
}


function SyringeIcon(props) {
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
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
      <path d="m9 11 4 4" />
      <path d="m5 19-3 3" />
      <path d="m14 4 6 6" />
    </svg>
  )
}

