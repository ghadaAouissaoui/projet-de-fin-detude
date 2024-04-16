import React, { useState } from 'react';
import axios from 'axios';
import MyDatePicker from './MyDatePicker' ; // Import your DatePicker component

export default function Signup() {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [datebirth, setDateBirth] = useState(null); // Initialize datebirth state as null
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleDateChange = (date) => {
    if (date instanceof Date) {
      setDateBirth(date);
    }
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    switch (id) {
      case 'fullname':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'datebirth':
        // Handle date changes here
        handleDateChange(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmpassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      fullname,
      email,
      datebirth,
      phoneNumber,
      password,
      confirmpassword
    };
    try {
      const url = "http://localhost:5000/api/users";
      const response = await axios.post(url, data);
      console.log("Response from backend:", response);
      if (response.status === 201) {
        setEmailSent(true);
        setMsg("Registration successful. Check your email for verification instructions.");
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMsg("Registration failed. Please try again later.");
    }
  };


  return (
    <div className="flex flex-col p-10 rounded-lg shadow-lg lg:max-w-[50rem] max-w-md mx-auto my-8">
      <Avatar className="mb-4">
        <img alt="Sign Up" src="/placeholder.svg?height=64&width=64" />
      </Avatar>
      <h1 className="text-3xl font-bold mb-2">Sign up</h1>
      <p className="mb-6 text-sm text-gray-600">Enter your details below to create your account and get started.</p>
      <form className="w-full lg:max-w-[700px] max-w-md" onSubmit={handleSubmit}>
        
        <div className="flex flex-row w-full mb-5">
          <div className="flex flex-col w-full md:w-1/2 px-3">
            <Label htmlFor="fullname">Full Name</Label>
            <Input id="fullname" placeholder="Enter your full name" type="text" value={fullname} onChange={handleChange} />
          </div>
          <div className="flex flex-col w-full md:w-1/2 px-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="example@gmail.com" type="email" value={email} onChange={handleChange} />
          </div>
        </div>

        <div className="flex flex-row w-full mb-5">
          <div className="flex flex-col w-full md:w-1/2 px-3">
            <Label htmlFor="datebirth">Date of Birth</Label>
            <MyDatePicker/>
          </div>
          <div className="flex flex-col w-full md:w-1/2 px-3">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" placeholder="Enter your phone number" type="text" value={phoneNumber} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-row w-full mb-5">
          <div className="flex flex-col w-full md:w-1/2 px-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" type="password" value={password} onChange={handleChange} />
          </div>
          <div className="flex flex-col w-full md:w-1/2 px-3 mb-5">
            <Label htmlFor="confirmpassword">Confirm Password</Label>
            <Input id="confirmpassword" placeholder="Confirm your password" type="password" value={confirmpassword} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-row w-full mb-5">
          <div  className="flex flex-col w-full md:w-1/2 px-3 mb-5"><Button className="bg-gray-200 text-gray-800 w-full mr-2 h-[58px] rounded-md border-2 border-gray-300 " type="button">Cancel</Button></div>
          <div className="flex flex-col w-full md:w-1/2 px-3 mb-5"><Button className="bg-purple-600 text-white w-90 ml-1 h-[58px] rounded-md" type="submit">Confirm</Button></div>
        </div>
        {emailSent && <p className="w-96 p-4 my-1 text-sm bg-red-600 text-white rounded-lg text-center">{msg}</p>}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link className="text-sm text-purple-600 hover:underline" to="login">Login</Link>
        </div>
      </form>
    </div>
  );
}
