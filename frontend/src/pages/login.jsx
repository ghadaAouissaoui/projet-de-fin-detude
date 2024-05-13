import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      const responseUser = await axios.post("http://localhost:5000/api/users/loginUser", {
        email,
        password
      });
  
      if (responseUser.status === 200) {
        // Succès de la connexion pour un utilisateur
         // Success: save token to localStorage
         const token = responseUser.data.token;
         localStorage.setItem('token', token);
           console.log(token);
           const userData = responseUser.data;
           console.log('User data:', userData);

        // Redirection en fonction du type d'utilisateur
      
          console.log('Redirection vers /espaceclient');
          navigate(`/espaceclient/${userData._id}`);
        
        } else {
          // Code d'état autre que 200 (par exemple 400)
          throw new Error(responseUser.data.message);
        }
    } catch (error) {
      console.error('Login error for user:', error.message);
      
    try {
        const responseVet = await axios.post("http://localhost:5000/api/veterinaries/loginVeto", {
          email,
          password
        });
  
        if (responseVet.status === 200) {
          // Succès de la connexion pour un vétérinaire
          // Success: save token to localStorage
        const token = responseVet.data.token;
        localStorage.setItem('token', token);
        
          const vet = responseVet.data;
          console.log('Veterinarian data:', vet);
  
          // Redirection vers /pro
          console.log('Redirection vers /pro');
          navigate(`/pro/${vet._id}`);
        } else {
          // Code d'état autre que 200 (par exemple 400)
          throw new Error(responseVet.data.message);
        }
      } catch (error) {
        console.error('Login error for veterinarian:', error.message);
        alert("Wrong details. Please try again.");
      }
    }
  }
  
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <UserCircleIcon className="text-indigo-500 w-12 h-12 mx-auto" />
            <h2 className="text-2xl font-bold my-2">Welcome back</h2>
            <p className="text-gray-600">
              Glad to see you again 👋
              <br />
              Login to your account below
            </p>
          </div>
          <div className="my-6 ">
            <button className=" bg-blue-500 hover:bg-blue-600 text-white w-full py-2 px-4 rounded">
              <ChromeIcon className="w-4 h-4 mr-2 mt-2" />
              Continue with Google
            </button>
          </div>
          <div className="space-y-4">
            <input id="email" className="w-full px-4 py-2 border rounded" placeholder="Enter email..." value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" />
            <input id="password" className="w-full px-4 py-2 border rounded" placeholder="Enter password..." value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" />
          </div>
          <div className="my-6">
            <button type='submit' className="bg-indigo-500 hover:bg-indigo-600 text-white w-full py-2 px-4 rounded">Login</button>
          </div>
          <div className="text-center text-sm">
            <span>Don't have an account? </span>
            <a className="text-indigo-500 hover:text-indigo-600" href="/signup">
              Sign up for Free
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

function ChromeIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}

function UserCircleIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}
