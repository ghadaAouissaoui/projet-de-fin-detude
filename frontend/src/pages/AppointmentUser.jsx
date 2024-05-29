import React ,{useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import Sidebar from "./Sidebare";
import { ResponsiveLine } from '@nivo/line';
import Doctor from '../images/femaleDoctor.jpg';
import PetInfoDialog from './PetInfoDialog'; 
import {Button,Menu,MenuItem,TableContainer,TableCell,TableBody,TableRow,Table,TableHead,
  Dialog, DialogTitle, DialogContent, DialogContentText,  Paper, Avatar, Typography, Grid, Divider
} from '@mui/material';
import Separator from './important/Separator';
import ScrollArea from './important/ScrollArea';
import AddPatientForm from "./AddPatientForm";
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



  export default function AppointmentUser() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState(null);
    const [petInfo, setPetInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = React.useState({
      petName: '',
      appointment_date: '',
      appointment_time: '',
      reason: ''
    });
  
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const token = localStorage.getItem('token');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const headers = {
          'Authorization': `Bearer ${token}`
        };
  
        const response = await axios.post('http://localhost:5000/api/appointment', formData, { headers });
        
        console.log(response.data);
      } catch (error) {
        console.error('Error creating appointment:', error.response.data);
      }
    };
  
  const { userId } = useParams();

  const [UserProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        const { user } = response.data; // Supposez que les animaux de compagnie sont renvoyés dans la propriété "pets" de la réponse
        
        setUserProfile(user);
        console.log(user);
        setLoading(false);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération du profil de l'utilisateur :", error);
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, [userId]);
          
           
            const handleOpenDialog = (petId) => {
              setSelectedPetId(petId);
              console.log("hhhhhhhhh")
              setDialogOpen(true);
            };

            const [selectedPetId, setSelectedPetId] = useState(null);
            useEffect(() => {
              const fetchPetInfo = async () => {
                if (selectedPetId) {
                  setLoading(true);
                  try {
                    const response = await axios.get(`http://localhost:5000/api/pet/historical/${selectedPetId}`, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    setPetInfo(response.data);
                    console.log("Pet Info:", response.data);
                  } catch (error) {
                    setError('Error fetching medical history');
                  } finally {
                    setLoading(false);
                  }
                }
              };
          
              fetchPetInfo();
            }, [selectedPetId]);

            const handleDialogClose = () => {
              setDialogOpen(false);
              setSelectedPetId(null);
              setPetInfo(null);
            };
        
  return (
    <div className="flex w-full h-[600px]">
      <div className="bg-[#0B2447] md:[15%] w-[20%] px-6 py-4 text-white sticky top-0 h-[600px] overflow-y-auto">
        <div className="flex flex-col items-start gap-6">
          <Link className="flex items-center gap-2" to={`/espaceclient/${UserProfile?._id}`}>
            <PawPrintIcon tIcon className="h-6 w-6" />
            <span className=''>{UserProfile?.fullname} Dashboard</span>
          </Link>
          {UserProfile && (
          <nav className="flex flex-col items-start gap-4">
          
            <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/pets/${UserProfile._id}`}>Pets</Link>
            <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/appointment/${UserProfile._id}`}>Medical Folder</Link>
            <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/review/${UserProfile._id}`}>Review</Link>
            <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/messages/${UserProfile._id}`}>Messages</Link>
          </nav>)}
          <div className="flex items-center gap-4">
            
            <Menu
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              getContentAnchorEl={null}
              anchorEl={null}
              open={false}
            >
              <Avatar alt="Avatar" src="/placeholder.svg" />
              <MenuItem>{UserProfile?.fullname}</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Support</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>


      <div className="flex-1 bg-[#F0F0F0] overflow-y-auto ">
        <header className="bg-white dark:bg-[#0B2447] px-6 py-4 shadow sticky top-0 z-10">
          <div className="container mx-auto flex items-center justify-between">
          
          <div className="flex  ">
         <Link to='/:userId'><Button  className="hidden md:inline-flex bg-[#1F4690] hover:bg-[#1F4690]/90 text-white " variant="text" > Add Appointment</Button></Link> 
      
            </div>
          </div>
        </header>


        <main className="container m-4 py-1">
        <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardHeader>
                  <CardTitle>Medication Reminders</CardTitle>
                  <CardDescription>Track your pet's medications and set reminders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                  {UserProfile?.pets.map((pet, index) => (
        <div key={index} className="grid grid-cols-[100px_1fr] items-center gap-4">
          <img
            alt="Pet"
            className="rounded-md"
            height="100"
            src={pet.image} // Vous devrez remplacer 'pet.image' par le chemin de l'image de l'animal
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <div>
            <h3 className="text-lg font-medium">{pet.name}</h3>
            <p className="text-[#6B7280] dark:text-[#A5D7E8]">{pet.breed}, {pet.age} years old</p>
            <div className="mt-2 flex items-center gap-2">
              <Button className="bg-[#1F4690] hover:bg-[#1F4690]/90 text-right flex justify-end text-white" size="sm" onClick={()=>{handleOpenDialog(pet._id)} }>
                View Medical folder
              </Button>
            
            </div>
          </div>
        </div>
      ))}
              <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
  <DialogTitle>Pet Information</DialogTitle>
  <DialogContent>
    {dialogOpen && petInfo ? (
      <>
        <div className="text-center space-y-1">
          <Avatar alt="Pet photo" src={petInfo.profilePicture || "/placeholder.svg"} sx={{ width: 150, height: 150 }} />
          <Typography variant="h5">{petInfo.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            Owner: {petInfo.user.fullname}
            <br />
            Phone: {petInfo.user.phoneNumber}
            <br />
            Email: {petInfo.user.email}
          </Typography>
        </div>
      
        <Typography variant="h6">Appointments</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {petInfo.appointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>{new Date(appointment.appointment_date).toLocaleDateString()}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Separator />
        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Vaccinations</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vaccine</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {petInfo.appointments.flatMap((appointment) => 
                  appointment.treatments.map((treatment) => 
                    treatment.vaccines && (
                      <TableRow key={treatment._id}>
                        <TableCell>{treatment.vaccines.vaccineName}</TableCell>
                        <TableCell>{new Date(treatment.vaccines.vaccineDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Medical Treatments</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Treatment</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {petInfo.appointments.flatMap((appointment) => 
                  appointment.treatments.map((treatment) => (
                    <TableRow key={treatment._id}>
                      <TableCell>{treatment.medicalTreatments.treatmentName}</TableCell>
                      <TableCell>{new Date(treatment.medicalTreatments.dateTreatment).toLocaleDateString()}</TableCell>
                      <TableCell>{treatment.medicalTreatments.notes}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Routine Exams</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Exam</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {petInfo.appointments.map((appointment) => (
                  <TableRow key={appointment._id}>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>{new Date(appointment.appointment_date).toLocaleDateString()}</TableCell>
                    <TableCell>{appointment.vetNotes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Allergies</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Allergen</TableCell>
                  <TableCell>Reaction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{petInfo.allergies}</TableCell>
                  <TableCell>{petInfo.allergiesReaction}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Veterinary Notes</h2>
            <ScrollArea className="h-40 rounded-md border">
              <div className="p-4 text-sm">
                {petInfo.appointments.map((appointment) => (
                  <p key={appointment._id}>{appointment.vetNotes}</p>
                ))}
              </div>
            </ScrollArea>
          </div>
          <Button onClick={handleDialogClose}>Close</Button>
        </div>
      </>
    ) : (
      loading ? <div>Loading...</div> : error && <div>{error}</div>
    )}
  </DialogContent>
</Dialog>

                  </div>
                </CardContent>
              </Card>
            </Grid>
        </main>
      </div>
    </div>
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


