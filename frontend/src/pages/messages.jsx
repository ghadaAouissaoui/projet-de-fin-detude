import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link,useParams} from "react-router-dom";
import Sidebar from "./Sidebare";
import Doctor from '../images/femaleDoctor.jpg';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,


} from '@mui/material';
 // Avatar component
 export const Avatar = ({ children }) => {
    return <div className="flex items-center space-x-4">{children}</div>;
  };
  
  // AvatarImage component
  export const AvatarImage = ({ alt, src, className }) => {
    return <img className={` ${className}`} alt={alt} src={src} />;
  };
  // AvatarFallback component
  export const AvatarFallback = ({ children }) => {
    return <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">{children}</div>;
  };

      // Card component
export const Card = ({ children, className }) => {
    return (
      <div className={`bg-white p-4 shadow rounded-lg ${className}`}>
        {children}
      </div>
    );
  };
    function CardTitle({ children }) {
      return <h3 className="text-lg font-bold mb-4">{children}</h3>;
    }
  
    
    // CardHeader component
    export function CardHeader({ children }) {
      return <div className="mb-2">{children}</div>;
    }
    
    // CardContent component
    export function CardContent({ children }) {
      return <div>{children}</div>;
    }

    function CardDescription(props) {
        return (
          <div className="card-description">
            {props.children}
          </div>
        );
      }
      function Label({ htmlFor, children }) {
        return (
          <div className='pb-2'>
            <label htmlFor={htmlFor}>{children}</label>
          </div>
        );
      }      

export const Input = (props) => {
    return (
      <input
        {...props}
        className={` border-2 p-2 rounded-md ${props.className}`}
      />
    );
  };
 const MessagesList = ({ messages }) => {
    const [showAll, setShowAll] = useState(false);
    const initialDisplayCount = 3; // Number of messages to display initially
  
    const toggleShowAll = () => {
      setShowAll(!showAll);
    };
  
    const displayedMessages = showAll ? messages : messages.slice(0, initialDisplayCount);
  }  

  export default function Message() {
    const { userId } = useParams();
    const [UserProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [email, setEmail] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [message, setMessage] = useState('');
    const [showAll, setShowAll] = useState(false);
    const initialDisplayCount = 3;
    const toggleShowAll = () => {
      setShowAll(!showAll);
    };

    const displayedMessages = showAll ? messages : messages.slice(0, initialDisplayCount);
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
          const { user } = response.data;
          setUserProfile(user);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, [userId]);
  
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/messages/${userId}`);
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      fetchMessages();
    }, [userId]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.get(`http://localhost:5000/api/veterinaries/email/${email}`);
        const veterinaryId = response.data._id;
        const receiverModel="Veterinary";
        const senderModel="User";
        const messageResponse = await axios.post('http://localhost:5000/api/messages', {
          senderId: userId,
          receiverId: veterinaryId,
          senderModel,
          receiverModel,
          content: messageContent
        });
  
        setMessage("Message sent successfully");
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  
    return (
      <div className="flex w-full h-[600px]">
        <div className="bg-[#0B2447] md:[15%] w-[20%] px-6 py-4 text-white sticky top-0 h-[600px] overflow-y-auto">
          <div className="flex flex-col items-start gap-6">
            <Link className="flex items-center gap-2" to={`/espaceclient/${UserProfile?._id}`}>
              <PawPrintIcon className="h-6 w-6" />
              <span className=''>{UserProfile?.fullname} Dashboard</span>
            </Link>
            {UserProfile && (
              <nav className="flex flex-col items-start gap-4">
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/pets/${UserProfile._id}`}>Pets</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/appointment/${UserProfile._id}`}>Medical Folder</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/review/${UserProfile._id}`}>Review</Link>
                <Link className="hover:text-[#A5D7E8]" to="#">Messages</Link>
              </nav>
            )}
          </div>
        </div>
        <div className="flex-1 bg-[#F0F0F0] overflow-y-auto ">
          <header className="bg-white dark:bg-[#0B2447] px-6 py-4 shadow sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
              <Button className="hidden md:inline-flex bg-[#1F4690] hover:bg-[#1F4690]/90 text-white " variant="text" > My pets</Button>
            </div>
          </header>
  
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
           {/* Received Messages Section */}
          <div className="border shadow-sm rounded-lg p-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg"> My received messages</h2>
              </div>
              {/* Display Messages List */}
              <div className="flex flex-col gap-4">
                {displayedMessages.map((message) => {
                  if (message.receiverModel === "User") {
                    return (
                      <div className="flex items-start gap-4" key={message._id}>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">
                              {message.sender?.fullname} - {message?.sender?.email}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(message.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
                {messages.length > initialDisplayCount && (
                  <button
                    onClick={toggleShowAll}
                    className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    {showAll ? "Show Less" : "Show All"} <ChevronIcon className={`ml-2 transform transition-transform ${showAll ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            </div>
          </div>

            <Card>
              <CardHeader>
                <CardTitle>Communication with veterinaries</CardTitle>
                <CardDescription>Send messages to your veterinaries.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Veterinary Email</Label>
                      <Input
                        id="email"
                        placeholder="Enter veterinary email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>


            <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      className="min-h-[100px] border-2 p-2 rounded-md"
                      id="message"
                      placeholder="Enter your message"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Send the message</Button>
                </div>
              </form>
              {message && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
                  {message}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
      {messages.map((message) => {
        if (message.senderModel === "User") {
          return (
            <div className="flex items-start gap-4" key={message._id}>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{message.receiver?.fullname}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {message.content}
                </div>
              </div>
            </div>
          );
        } else {
          return null; // Si l'expéditeur n'est pas un utilisateur, ne rien afficher
        }
      })}{messages.length > initialDisplayCount && (
        <button
          onClick={toggleShowAll}
          className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          {showAll ? "Show Less" : "Show All"} <ChevronIcon className={`ml-2 transform transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
        </main>
      </div>
    </div>
  );
};








const ChevronIcon = ({ isOpen }) => {
  return (
    <svg
      className={`text-blue transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};




function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function PawPrintIcon(props) {
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
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="20" cy="16" r="2" />
        <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
      </svg>
    )
  }

function SearchIcon(props) {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="gray" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      class="feather feather-activity">
        <circle cx="10.5" cy="10.5" r="7.5"></circle>
        <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
        </svg>
  )
}


