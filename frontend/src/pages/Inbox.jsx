import React from "react";
import {Link} from "react-router-dom";
import Sidebar from "./Sidebare";

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
  function Button({ children, variant }) {
    return (
      <button
        className={`py-2 px-4 rounded-md text-white ${
          variant === "outline" ? "bg-transparent border border-gray-400 hover:bg-gray-100 hover:text-gray-800" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {children}
      </button>
    );
  }


export default function Inbox() {
  return (
    <div className="flex w-full bg-gray-100">  
    <div  className="max-md:w-1/3 w-1/5 top-20 "><Sidebar/></div>  
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 ">

          <div className="border shadow-sm rounded-lg p-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Messages</h2>
                <Button variant="outline">New Message</Button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage alt="John Doe" src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Apr 23, 2023</div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Hi Dr. Doe, I wanted to follow up on Buddy's appointment yesterday. How is he doing?
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage alt="Jane Smith" src="/placeholder-user.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Apr 21, 2023</div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Good morning, I wanted to schedule a check-up for Whiskers. Can you please let me know your
                      availability?
                    </div>
                  </div>
                </div>
              </div>
              <Card>
              <CardHeader>
                <CardTitle>Communication with patients</CardTitle>
                <CardDescription>Send messages to your patients.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="patient-name">Patient Name</Label>
                      <Input id="patient-name" placeholder="Enter patient name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Enter subject" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea className="min-h-[100px] border-2 p-2 rounded-md" id="message" placeholder="Enter your message" />
                    </div>
                    <Button type="submit">Send the message</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            </div>
          </div>
        </main>
      
    </div>
  )
}




