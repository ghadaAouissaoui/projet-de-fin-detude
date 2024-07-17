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
function CardTitle({ children }) {
    return <h3 className="text-lg font-bold mb-4">{children}</h3>;
  }
  function CardDescription({ children, className }) {
    return <p className={className}>{children}</p>;
  }

  export default function ComponentPets() {
    const { userId } = useParams();
    const [UserProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false); // État pour suivre l'ouverture du dialogue
    const [newPetInfo, setNewPetInfo] = useState({
      name: '',
      species: '',
      breed: '',
      age: '',
      // Ajoutez d'autres champs selon les besoins
    });
    const [petId, setPetId] = useState('');
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
          const { user } = response.data;
          setUserProfile(user);
          setLoading(false);
        } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération du profil de l'utilisateur :", error);
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, [userId]);
  
    const handleEditButtonClick = (petId) => {
      setPetId(petId);
      handleEditClick(petId); // Ouvrir le dialogue de modification
    };
  
    const handleEditClick = async (petId) => {
      try {
        // Récupérer les informations de l'animal à modifier depuis le backend
        const response = await axios.put(`http://localhost:5000/api/pet/${petId}`);
        const petData = response.data.pet;
        console.log("gdshfdsh", petId);
  
        // Mettre à jour les champs du formulaire avec les informations récupérées
        setNewPetInfo({
          name: petData.name,
          species: petData.species,
          breed: petData.breed,
          sex:petData.sex,
      
          // Ajoutez d'autres champs selon les besoins
        });
  
        // Ouvrir le dialogue de modification
        setOpen(true);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'animal à modifier :", error);
      }
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (e) => {
      setNewPetInfo({ ...newPetInfo, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async () => {
      try {
        // Effectuez une requête PUT vers votre backend pour soumettre les modifications de l'animal
        const response = await axios.put(`http://localhost:5000/api/pet/${petId}`, newPetInfo);
        console.log(response.data); // Loggez la réponse du backend si nécessaire
  
        // Fermez le dialogue de modification après la soumission réussie
        handleClose();
      } catch (error) {
        console.error("Erreur lors de la soumission des modifications de l'animal :", error);
        // Gérez l'erreur selon vos besoins
      }
    };
    const deletePet = async (petId) => {
      try {
        // Envoyez une requête DELETE à votre endpoint backend avec l'ID de l'animal à supprimer
        const response = await axios.delete(`http://localhost:5000/api/pet/${petId}`);
        console.log(response.data); // Affichez la réponse du backend si nécessaire
        // Traitez la réponse en fonction de vos besoins (par exemple, afficher un message de succès)
      } catch (error) {
        console.error("Erreur lors de la suppression de l'animal :", error);
        // Traitez l'erreur en fonction de vos besoins (par exemple, afficher un message d'erreur)
      }
    };
  
    const handleDeleteClick = async (petId) => {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cet animal ?")) {
        // Appeler la fonction deletePet avec l'ID de l'animal à supprimer
        await deletePet(petId);
        // Rechargez ou mettez à jour les données après la suppression de l'animal si nécessaire
        // Par exemple, vous pouvez appeler une fonction pour recharger la liste des animaux après la suppression réussie
      }
    };
  
    return (
      <div className="flex w-full h-[600px]">
        {/* Sidebar */}
        <div className="bg-[#0B2447] md:w-[15%] w-[20%] px-6 py-4 text-white sticky top-0 h-[600px] overflow-y-auto">
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
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/messages/${UserProfile._id}`}>Messages</Link>
                <Link  className='hover:text-[#A5D7E8]' to={`/espaceclient/diagnostic/${UserProfile._id}`}>Fast Diagnostic</Link>
              </nav>
            )}
          </div>
        </div>
  
        {/* Main content */}
        <div className="flex-1 bg-[#F0F0F0] overflow-y-auto">
          <header className="bg-white dark:bg-[#0B2447] px-6 py-4 shadow sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
              <Button className="hidden md:inline-flex bg-[#1F4690] hover:bg-[#1F4690]/90 text-white" variant="text"> My pets</Button>
            </div>
          </header>
  
          <section className="w-full max-w-4xl mx-auto py-8 md:py-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {UserProfile && UserProfile.pets && UserProfile.pets.map((pet) => (
                <Card key={pet._id}>
                  <img
                    alt="Pet Image"
                    className="rounded-t-lg object-cover w-full aspect-video"
                    height={200}
                    src=""
                    width={300}
                  />
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">{pet.name}</h3>
  <div className="flex gap-2">
  <Button size="icon" variant="outline" onClick={() => handleEditButtonClick(pet._id)}>
  <PencilIcon className="h-4 w-4" />
  <span className="sr-only">Edit</span>
  </Button>
  <Button className="text-red-500" size="icon" variant="outline" onClick={() => handleDeleteClick(pet._id)}>
  <TrashIcon className="h-4 w-4" />
  <span className="sr-only">Delete</span>
  </Button>
  </div>
  </div>
  </CardContent>
  </Card>
  ))}
  </div>

        {/* Dialogue pour effectuer les modifications */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Modifier les informations de l'animal</DialogTitle>
          <DialogContent>
            <TextField
              label="Nom"
              name="name"
              value={newPetInfo.name}
              onChange={handleChange}
            />
            <TextField
              label="Espèce"
              name="species"
              value={newPetInfo.species}
              onChange={handleChange}
            />
            <TextField
              label="Race"
              name="breed"
              value={newPetInfo.breed}
              onChange={handleChange}
            />
            <TextField
              label="Âge"
              name="age"
              value={newPetInfo.age}
              onChange={handleChange}
            />
            {/* Ajoutez d'autres champs selon les besoins */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleSubmit}>Enregistrer</Button>
          </DialogActions>
        </Dialog>
      </section>
    </div>
  </div>
  );
}
function PencilIcon(props) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
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

function DeleteIcon(props) {
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
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  )
}


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}