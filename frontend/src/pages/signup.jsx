import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles

function Avatar({ children, className }) {
  return <div className={className}>{children}</div>;
}

function Label({ htmlFor, children }) {
  return (
    <div className='pb-2'>
      <label htmlFor={htmlFor}>{children}</label>
    </div>
  );
}

function Input({ id, placeholder, type, value, onChange }) {
  return (
    <input
      id={id}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className="border-2 border-gray-300 rounded-md p-2 h-[58px]"
    />
  );
}

function Button({ className, children, type }) {
  return <button className={className} type={type}>{children}</button>;
}

export default function Signup() {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [datebirth, setDateBirth] = useState(null); // Initialize datebirth state as null
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [emailSent, setEmailSent] = useState(false);

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
        setDateBirth(value);
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
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server Error:', error.response.data);
        setMsg("Server Error. Please try again later.");
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request Error:', error.request);
        setMsg("Request Error. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('General Error:', error.message);
        setMsg("An error occurred. Please try again later.");
      }
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
            <DatePicker 
              selected={datebirth} 
              onChange={(date) => setDateBirth(date)} 
              className="border-2 border-gray-300 rounded-md p-2 h-[58px] md:w-full px-3" 
              placeholder='MM-DD-YYYY'
            />
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
