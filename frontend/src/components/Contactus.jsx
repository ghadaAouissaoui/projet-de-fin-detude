import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ContactUs() {
  return (
    <section className="w-full  py-6 md:py-12 xl:py-16 mt-8 mb-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-16">Contact Us</h1>
            <p className="text-gray-800 md:text-xl dark:text-gray-500">
              We're here to help. Fill out the form below and we'll get back to you as soon as we can.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
            <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Full Name" id="fullName" />
    </Box>
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Email" id="email" />
    </Box>
            </div>
            <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={5}
          
        />
            <button size="lg " className='bg-blue-800 hover:bg-blue-700 h-10 font-semibold rounded-md text-white'>Submit</button>
          </div>
        </div>
      </div>
    </section>
  )
}