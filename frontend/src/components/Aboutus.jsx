import React from 'react';
import image from '../images/neuralbey.jpeg';
export default function AboutUs() {
    return (
      <>
        <section className="relative w-full bg-gradient-to-r from-[#062451] to-[#1e2329] py-24 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <img
                alt="Company Logo"
                className="mx-auto"
                height={120}
                src={image}
                style={{
                  aspectRatio: "120/120",
                  objectFit: "cover",
                }}
                width={120}
              />
              <h1 className="text-4xl font-bold tracking-tight text-gray-50 sm:text-5xl lg:text-6xl">
                About Our Company
              </h1>
              <p className="text-lg text-gray-400">
                We are a team of passionate individuals dedicated to creating innovative solutions that empower our
                clients to achieve their goals.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20 blur-sm" />
        </section>
        <section className="py-12 md:py-20 lg:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
              At our company, we are deeply committed to harnessing the power of innovation 
              and collaboration to drive positive change. Our mission is clear:
               to provide cutting-edge solutions tailored specifically to the needs of veterinary practices.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
              By streamlining operations, enhancing client interactions, 
              and helping practices achieve their business objectives, 
              we strive to revolutionize the delivery and experience of veterinary
               care. Additionally, we empower clients with seamless online search 
               and appointment booking capabilities, ensuring convenience 
               and efficiency in accessing veterinary services.
              </p>
            </div>
          </div>
        </section>
       {/* <section className="py-12 md:py-20 lg:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Team</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-950">
                <img
                  alt="Team Member 1"
                  className="mx-auto h-32 w-32 rounded-full object-cover"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-gray-500 dark:text-gray-400">CEO</p>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-950">
                <img
                  alt="Team Member 2"
                  className="mx-auto h-32 w-32 rounded-full object-cover"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold">Jane Smith</h3>
                  <p className="text-gray-500 dark:text-gray-400">CTO</p>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-950">
                <img
                  alt="Team Member 3"
                  className="mx-auto h-32 w-32 rounded-full object-cover"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold">Michael Johnson</h3>
                  <p className="text-gray-500 dark:text-gray-400">COO</p>
                </div>
              </div>
            </div>
          </div>
        </section>*/} 
      </>
    )
  }