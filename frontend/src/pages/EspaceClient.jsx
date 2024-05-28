import React from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moumou from '../images/moumou.jpg';
import { useState ,useEffect } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import { Menu, MenuItem, Avatar, Typography, Grid, Card, CardHeader, CardContent } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TextareaAutosize } from '@mui/material';
import useRequireAuth from '../../auth/userRequireAuth';
function CardTitle({ children }) {
    return <h3 className="text-lg font-bold mb-4">{children}</h3>;
  }
  function CardDescription({ children, className }) {
    return <p className={className}>{children}</p>;
  }
  

export default function UserDashboard() {
  useRequireAuth()
     const { userId } = useParams();
    const [UserProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    species: '',
    breed: '',
    sex: '',
    profilePicture: '',
    comments: '',
    medicalHistory: ''
  });
  
    // Fonction pour calculer l'âge à partir de la date de naissance
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

  
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


      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      // Fonction pour soumettre le formulaire et envoyer les données au backend
  const handleSubmit = async () => {
    try {
      // Envoi de la requête POST avec les données du formulaire au backend
      const response = await axios.post(`http://localhost:5000/api/pet/${userId}`, formData);
      setLoading(false);
      // Affichage d'un message de succès ou de détails supplémentaires si nécessaire
      console.log(response.data);
      setLoading(false);
      // Fermeture du popup après soumission réussie
      setOpen(false);
      
    } catch (error) {
      // Gestion des erreurs en cas d'échec de la soumission du formulaire
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };

    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
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
            <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/appointment/${UserProfile._id}`}>Appointments</Link>
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
            <Button onClick={handleOpen} className="hidden md:inline-flex bg-[#1F4690] hover:bg-[#1F4690]/90 text-white " variant="text">Add Pet</Button>

             {/* Popup pour ajouter un animal */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="" size="small" variant="outlined">Add Pet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            fullWidth
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <TextField
          margin="dense"
          name="species"
          label="Species"
          fullWidth
          value={formData.species}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="breed"
          label="Breed"
          fullWidth
          value={formData.breed}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="sex"
          label="Sex"
          fullWidth
          value={formData.sex}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="profilePicture"
          label="Profile Picture"
          fullWidth
          value={formData.profilePicture}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="comments"
          label="Comments"
          fullWidth
          value={formData.comments}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="medicalHistory"
          label="Medical History"
          fullWidth
          value={formData.medicalHistory}
          onChange={handleChange}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
            </div>
          </div>
        </header>


        <main className="container m-4 py-1">
          <Grid container spacing={8} className='flex flex-row '>
            <Grid item xs={12} md={6} lg={7}>
              <Card>
                <CardHeader
                  title="Upcoming Appointments"
                  subheader="View and manage your pet's upcoming appointments."
                />
                <CardContent>
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 ">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        value={null} // Set the value here
                        onChange={(newValue) => console.log(newValue)} // Handle change event
                        renderInput={(params) => <input {...params} />} // Render input field
                        />
                    </LocalizationProvider>
                    </div>
                </CardContent>
              </Card>

            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardHeader>
                  <CardTitle>My Pets</CardTitle>
                  <CardDescription>View details of your registered pets.</CardDescription>
                </CardHeader>
                <CardContent>
                {UserProfile && UserProfile.pets && UserProfile.pets.map((pet) => (
                    <div key={pet._id} className="flex items-center gap-4">
                        <img
                        alt="Pet"
                        className="rounded-full"
                        height="64"
                        src={moumou}
                        style={{
                            aspectRatio: "64/64",
                            objectFit: "cover",
                        }}
                        width="64"
                        />
                        <div>
                        <h3 className="text-lg font-medium">{pet.name}</h3>
                        <p className="text-[#6B7280] ">{pet.species}, {pet.breed}, {pet.sex},{calculateAge(pet.dateOfBirth)} years old</p>
                        </div>
                    </div>
))}

                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardHeader>
                  <CardTitle>Medication Reminders</CardTitle>
                  <CardDescription>Track your pet's medications and set reminders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                      <img
                        alt="Pet"
                        className="rounded-md"
                        height="100"
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "100/100",
                          objectFit: "cover",
                        }}
                        width="100"
                      />
                      <div>
                        <h3 className="text-lg font-medium">Buddy</h3>
                        <p className="text-[#6B7280] dark:text-[#A5D7E8]">Golden Retriever, 5 years old</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Button className="bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" size="sm" variant="outline">
                            View Medications
                          </Button>
                          <Button className="bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" size="sm" variant="outline">
                            Set Reminder
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                      <img
                        alt="Pet"
                        className="rounded-md"
                        height="100"
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "100/100",
                          objectFit: "cover",
                        }}
                        width="100"
                      />
                      <div>
                        <h3 className="text-lg font-medium">Whiskers</h3>
                        <p className="text-[#6B7280] dark:text-[#A5D7E8]">Tabby Cat, 3 years old</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Button className="bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" size="sm" variant="outline">
                            View Medications
                          </Button>
                          <Button className="bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" size="sm" variant="outline">
                            Set Reminder
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                      <img
                        alt="Pet"
                        className="rounded-md"
                        height="100"
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "100/100",
                          objectFit: "cover",
                        }}
                        width="100"
                      />
                      <div>
                        <h3 className="text-lg font-medium">Daisy</h3>
                        <p className="text-[#6B7280] dark:text-[#A5D7E8]">Poodle, 2 years old</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Button className="bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" size="sm" variant="outline">
                            View Medications
                          </Button>
                          <Button className="bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" size="sm" variant="outline">
                            Set Reminder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardHeader>
                  <CardTitle>Review</CardTitle>
                  <CardDescription>Leave a review for your veterinarian.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                      <img
                        alt="Veterinarian"
                        className="rounded-md"
                        height="100"
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "100/100",
                          objectFit: "cover",
                        }}
                        width="100"
                      />
                      <div>
                        <h3 className="text-lg font-medium">Dr. Jane Smith</h3>
                        <p className="text-[#6B7280] dark:text-[#A5D7E8]">Veterinarian, 10 years experience</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Button className="bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" size="sm" variant="outline">
                            Leave Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Send a message to your veterinarian.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                      <img
                        alt="Veterinarian"
                        className="rounded-md"
                        height="100"
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "100/100",
                          objectFit: "cover",
                        }}
                        width="100"
                      />
                      <div>
                        <h3 className="text-lg font-medium">Dr. Jane Smith</h3>
                        <p className="text-[#6B7280] dark:text-[#A5D7E8]">Veterinarian, 10 years experience</p>
                        <div className="mt-2 flex items-center gap-2">
                          <textarea className="w-full" placeholder="Enter your message..." />
                          <Button
                            className="bg-[#1F4690] hover:bg-[#1F4690]/90 text-white"
                            size="sm"
                            type="submit"
                            variant="outline"
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </Grid>



          </Grid>
        </main>
      </div>
    </div>
  );
}

// Rest of the code for MenuIcon and PawPrintIcon components remains the same
function MenuIcon(props) {
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
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
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