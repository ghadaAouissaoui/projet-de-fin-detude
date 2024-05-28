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


  export default function Inbox() {
    const { vetId } = useParams();
    console.log("vetId", vetId);

    const [newMessageDialogOpen, setNewMessageDialogOpen] = useState(false);
    const [newMessageContent, setNewMessageContent] = useState({
      senderId: '',
      receiverId: vetId,
      content: ''
    });
  
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/messages/${vetId}`);
          setMessages(response.data);
          console.log("messages", response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      fetchMessages();
    }, [vetId]);
  
    const [messages, setMessages] = useState([]);
    const [email, setEmail] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [senderId, setSenderId] = useState(null);
const [message,setMessage]=useState('')

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Obtenir l'ID du vétérinaire par email
    const response = await axios.get(`http://localhost:5000/api/veterinaries/email/${email}`);
    const userId = response.data._id;

    // Envoyer le message
    const messageResponse = await axios.post('http://localhost:5000/api/messages', {
      senderId: vetId, // Assurez-vous d'avoir vetId défini quelque part
      receiverId: userId,
      content: messageContent
    });

    console.log('Message sent:', messageResponse.data);
    setMessage("Message sent successfully");

    // Attendre un court instant avant de recharger la page
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
    return (
      <div className="flex w-full bg-gray-100">
        <div className="max-md:w-1/3 w-1/5 top-20">
          <Sidebar />
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex justify-between w-full pb-8 p-6">
            <div className="flex rounded-lg w-1/2">
              <div className="bg-gray-200 pt-2.5 pl-2 rounded-l-xl">
                <SearchIcon />
              </div>
              <Input
                className="block w-full p-2 bg-gray-200 rounded-r-xl outline-none"
                placeholder="Search"
              />
            </div>
            <div className="flex items-center space-x-4">
              <BellIcon className="h-6 w-6 text-gray-600" />
              <Avatar alt="User profile" src={Doctor} className="h-12 w-12 rounded-full" />
            </div>
          </div>
          <div className="border shadow-sm rounded-lg p-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">My received messages</h2>
              </div>
              <div className="flex flex-col gap-4">
  {messages.map((message) => {
    if (message.receiverModel === "Veterinary") {
      return (
        <div className="flex items-start gap-4" key={message._id}>
          <Avatar alt={message.sender.fullname} src="/placeholder-user.jpg" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">{message.sender.fullname}</div>
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
      return null; // Si le destinataire n'est pas un vétérinaire, ne rien afficher
    }
  })}
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
          <div className="border shadow-sm rounded-lg p-2">
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <h2 className="font-semibold text-lg">Messages</h2>
    </div>
    <div className="flex flex-col gap-4">
      {messages.map((message) => {
        if (message.senderModel === "Veterinary") {
          return (
            <div className="flex items-start gap-4" key={message._id}>
              <Avatar alt={message.sender.fullname} src="/placeholder-user.jpg" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{message.sender.email}</div>
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
          return null; // Si l'expéditeur n'est pas un vétérinaire, ne rien afficher
        }
      })}
    </div>
  </div>


            </div>
            </div>
          </div>
        </main>
      </div>
    );
  }




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


