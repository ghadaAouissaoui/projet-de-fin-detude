import React from "react";
import { useState } from "react";
import image from "../images/doc.jpg";
import fond from "../images/2.jpeg";
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


  // Input component
export const Input = (props) => {
    return (
      <input
        {...props}
        className={`  ${props.className}`}
      />
    );
  };

  // Card component
export const Card = ({ children, className }) => {
    return (
      <div className={`bg-white p-4 shadow rounded-lg ${className}`}>
        {children}
      </div>
    );
  };

  function Badge({ children, variant }) {
    return (
      <span
        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
          variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {children}
      </span>
    );
  }

  
  
  function Button({ children, ...props }) {
    return (
      <button
        {...props}
        className={`py-2 px-4  text-white  bg-blue-500 hover:bg-blue-600 ${props.className}`}
      >
        {children}
      </button>
    );
  }
  
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




export default function DoctorProfile() {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };

  return (
    <div className="bg-white mb-10 ">
        <div className="w-full"><img src={fond} alt="" className=" lg:h-[250px] w-full rounded-2xl"  /></div>
        <Avatar>
              <div className="w-[100px] rounded-full relative -top-[80px] left-[40px]"> <AvatarImage alt="Doctor Profile" src={image} className=" rounded-full w-full"/></div>
            </Avatar>
        
      <div className="grid grid-cols-3 gap-4 px-6">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center space-x-4">           
              <h1 className="text-xl font-semibold">Rayna Westervelt M.Psi</h1>
              <p className="text-sm font-semibold text-gray-500">ENT Doctor</p>
              <p className="mt-1 text-sm text-gray-500">Full-time</p>
              <div className="flex items-center mt-1 space-x-2">
                <Badge variant="secondary">250k - 350k</Badge>
                <Badge>94%</Badge>
              </div>
           
          </div>
          <div>
      <h2 className="text-lg font-bold">Doctor Profile</h2>
      <div className="text-sm text-gray-600 mb-4">
        {showFullDescription ? (
          <>
            <p>
              
With over four years of dedicated service in the realm of ear, nose, and throat (ENT) health, our esteemed specialist has cultivated a profound wealth of experience and expertise. Throughout their illustrious career, they have passionately devoted themselves to the diagnosis and treatment of a diverse spectrum of ENT conditions, ranging from common ailments to complex disorders.

Their journey in ENT care has been marked by continuous refinement of skills and relentless pursuit of excellence. Through extensive training and hands-on experience, they have developed a keen ability to accurately diagnose various ENT issues, enabling them to devise tailored treatment plans that prioritize patient well-being and recovery.

What truly sets our specialist apart is their unwavering commitment to staying at the forefront of medical advancements. They remain deeply engaged in ongoing research, attend conferences, and participate in continuing education programs to ensure they are well-versed in the latest techniques, technologies, and treatments shaping the field of ENT medicine.
            </p>
            <p>
            enabling them to devise tailored treatment plans that prioritize patient well-being and recovery.

What truly sets our specialist apart is their unwavering commitment to staying at the forefront of medical advancements. They remain deeply engaged in ongoing research, attend conferences, and participate in continuing education programs to ensure they are well-versed in the latest techniques, technologies, and treatments shaping the field of ENT medicine.
            </p>
            <div className="flex flex-row">
            <Button onClick={toggleDescription} className="text-blue-500 cursor-pointer rounded-l-md">
              Show Less
            </Button> <div className='bg-blue-500 rounded-r-md pt-2  hover:bg-blue-600 cursor-pointer'onClick={toggleDescription}><ChevronUp/></div> </div>
          </>
        ) : (
          <p>
            With over four years of dedicated service in the realm of ear, nose, and throat (ENT) health, our esteemed specialist has cultivated a profound wealth of experience and expertise. Throughout their illustrious career, they have passionately devoted themselves to the diagnosis and treatment of a diverse spectrum of ENT conditions, ranging from common ailments to complex disorders.

Their journey in ENT care has been marked by continuous refinement of skills and relentless pursuit of excellence. Through extensive training and hands-on experience, they have developed a keen ability to accurately diagnose various ENT issues,...
            <div className="flex flex-row"><Button onClick={toggleDescription} className="text-blue-500 cursor-pointer rounded-l-md">
              See More
            </Button><div className='bg-blue-500 rounded-r-md pt-2  hover:bg-blue-600 cursor-pointer'onClick={toggleDescription} ><ChevronDown/></div> 
            </div>
          </p>
        )}
      </div>
    </div>

        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Medical Actions</h2>
          <ul className="space-y-2 text-sm">
            <li>BERA (Brainstem Evoked Response Audiometry)</li>
            <li>ENT Surgery</li>
            <li>ENT Corpus Alieum Extraction</li>
            <li>Ear Endoscopy</li>
            <li>Ear Irritation</li>
            <li>Trigoplasty</li>
            <li>Hearing Test</li>
          </ul>
          <Button className="rounded-md w-[200px]">Make Appointments</Button>
        </div>
      </div>

      


      {/* 
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="col-span-2 space-y-4">
          <h2 className="text-lg font-bold">Practice Experience</h2>
          <div className="space-y-2">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Siloam Hospitals Bekasi Timur</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">ENT Doctor - Neurologist - Online Consultation</p>
                <p className="text-sm">Dec 2022 - Present • 2 yrs 1 mos</p>
                <p className="text-sm">Margahayu, Kec. Bekasi Timur, West Java</p>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Mitra Keluarga Pratama Jatiasih</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">ENT Doctor - Otologist • Fulltime</p>
                <p className="text-sm">Dec 2021 - Nov 2022 • 1 yrs 1 mos</p>
                <p className="text-sm">Jatimekar, Jati, Kec. Jatiasih, West Java</p>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardHeader>
                <CardTitle>RS Ananda Bekasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">ENT Doctor - Otologist • Fulltime</p>
                <p className="text-sm">Feb 2019 - Oct 2021 • 2 yrs 8 mos</p>
                <p className="text-sm">Medan Satria, Kec. Medan Satria, Bekasi City</p>
              </CardContent>
            </Card>
          </div>
          <h2 className="text-lg font-bold">Doctor's Review</h2>
          <div className="space-y-2">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Makena Schiefler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">20 January 2024 • 06:54</p>
                <p className="text-sm">
                  My ENT consultation on Wellness was a game-changer. Scheduling was easy, the virtual session was
                  informative, and the expert advice for my ear issues surpassed my expectations.
                </p>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Lydia Lipshutz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">19 January 2024 • 17:42</p>
                <p className="text-sm">
                  Wellness deserved a seamless ENT consultation. The knowledgeable specialist, combined with the
                  comfortable virtual platform, has significantly improved my health. It's now my go-to for reliable
                  healthcare guidance.
                </p>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Talan Mango</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">13 January 2024 • 16:24</p>
                <p className="text-sm">
                  Exceptional ENT consultation on Wellness. Scheduling was straightforward, the doctor's expertise
                  extended beyond my expectations, and the platform provides reliable expert consultations from the
                  comfort of home.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="outline">Previous</Button>
            <div className="flex space-x-1">
              <Button variant="outline">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <span>...</span>
              <Button variant="outline">9</Button>
            </div>
            <Button variant="outline">Next</Button>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="p-4">
            <CardContent>
              <p className="text-sm">Download now and start your search</p>
              <div className="flex space-x-2 mt-2">
                <Button variant="outline">
                  <AppleIcon className="h-6 w-6 mr-1" />
                  App Store{"\n                          "}
                </Button>
                <Button variant="outline">
                  <PlayIcon className="h-6 w-6 mr-1" />
                  Google Play{"\n                          "}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>*/}

    </div>
  )
}

function AppleIcon(props) {
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
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  )
}
function ChevronDown(props) {
    return (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="6 9 12 15 18 9"></polyline>
</svg>
)
}

function ChevronUp(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="18 15 12 9 6 15"></polyline></svg>
    )
  }

function PlayIcon(props) {
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
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}