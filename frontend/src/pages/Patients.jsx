import React ,{useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import Sidebar from "./Sidebare";
import { ResponsiveLine } from '@nivo/line';
import Doctor from '../images/femaleDoctor.jpg';
import PetInfoDialog from './PetInfoDialog'; 
import {Button,TableContainer,TableCell,TableBody,TableRow,Table,TableHead,
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




  export default function Patient() {
    const [patients, setPatients] = useState([]);
    const { vetId } = useParams();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [petInfo, setPetInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPetId, setSelectedPetId] = useState(null);
    const [addPatientDialogOpen, setAddPatientDialogOpen] = useState(false); // État pour contrôler l'ouverture du formulaire d'ajout de patient
    const [totalPatients, setTotalPatients] = useState(0);

    const handleAddPatientDialogOpen = () => {
      setAddPatientDialogOpen(true);
    };
  
    const handleAddPatientDialogClose = () => {
      setAddPatientDialogOpen(false);
    };
  
    useEffect(() => {
      const fetchPatients = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/veterinaries/${vetId}/patients`);
          setPatients(response.data);
          console.log("Patients:", response.data);
         // Calculate the number of patients
        const numberOfPatients = response.data.length;
        
        setTotalPatients(numberOfPatients);
        console.log('Number of patients:', numberOfPatients);
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };
  
      fetchPatients();
    }, [vetId]);
  
    const handleOpenDialog = (petId) => {
      setSelectedPetId(petId);
      console.log("hhhhhhhhh")
      setDialogOpen(true);
    };
    
    const token=localStorage.getItem('token')
    console.log("tokeeen",token)
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
      <div className="flex min-h-screen bg-gray-100">
        <div className="max-md:w-1/3 w-1/5 top-20">
          <Sidebar />
        </div>
        <main className="flex-1 w-2/3 pb-8 ">
        <div className="flex justify-between w-full pb-8 p-6">
            <div className="flex rounded-lg w-1/2">
        <div className=' bg-gray-200  pt-2.5 pl-2 rounded-l-xl'><SearchIcon  /></div>
          <Input
            className="block w-full p-2 bg-gray-200 rounded-r-xl outline-none"
            placeholder="Search"
          /></div>
          <div className="flex items-center space-x-4">
            <BellIcon className="h-6 w-6 text-gray-600" />
            <Avatar>
              <AvatarImage alt="User profile" src={Doctor} className="h-12 w-12 rounded-full"/>
            </Avatar>
          {/* <TextIcon className="h-6 w-6 text-gray-600 lg:opacity-0 md:visible" /> */}  
          </div>
        </div>
        <main className="flex-1 grid grid-cols-1 md:grid-cols-[200px_1fr] p-6 space-x-4 overflow-x-auto ">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div className="space-y-6">
              <h2 className="text-lg font-bold">Quick Stats</h2>
              <div className="grid grid-row-2 gap-4">
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <UsersIcon className="w-6 h-6 text-gray-500" />
                    <span className="text-2xl font-bold">{totalPatients}</span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Total Patients</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <ActivityIcon className="w-6 h-6 text-gray-500" />
                    <span className="text-2xl font-bold">7</span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Active Patients</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <form className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <Input
                    className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search patients..."
                    type="search"
                  />
                </form>
                </div>
                        <Button size="sm" onClick={handleAddPatientDialogOpen}>Add Patient</Button>
                    </div>

                    <AddPatientForm open={addPatientDialogOpen} handleClose={handleAddPatientDialogClose} vetId={vetId} />

  
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Last Visit</TableCell>
                  <TableCell className="text-left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((pet) => (
                  <TableRow key={pet._id}>
                    <TableCell>{pet.name}</TableCell>
                    <TableCell>{pet.species}</TableCell>
                    <TableCell>
                      {pet.appointments
                        .filter((appointment) => appointment.status === 'not_available')
                        .map((appointment) => appointment.appointment_date)
                        .reduce((maxDate, currentDate) => (maxDate > currentDate ? maxDate : currentDate), '')}
                    </TableCell>
                    <TableCell className="text-left" >
                      <button size="sm"  onClick={()=>{handleOpenDialog(pet._id)} }>
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
        <Divider sx={{ my: 2 }} />
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
          </main>
        </main>
      </div>
    );
  }
 





function ActivityIcon(props) {
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
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
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


function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

{/*  <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <FilterIcon className="w-5 h-5 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value="name">
                    <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="species">Species</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="lastVisit">Last Visit</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>*/} 