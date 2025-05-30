import React from "react"
import axios from "axios";
import { useState ,useEffect } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import moment from 'moment';
import { AiFillDelete } from 'react-icons/ai';
import { FaRegCheckSquare } from "react-icons/fa";
import { ResponsiveLine } from '@nivo/line';
import Doctor from '../images/femaleDoctor.jpg';
import Sidebar from "./Sidebare";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DialogContent, DialogTitle,DialogActions, Dialog,TextField, TextareaAutosize, Button, Grid, Typography,Popover,MenuItem } from '@mui/material';
import useRequireAuth from "../../auth/userRequireAuth";
import { FaBriefcaseMedical } from "react-icons/fa";    
import { LuPencilLine } from "react-icons/lu";
import {jwtDecode} from "jwt-decode";

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
          className={`t px-2 py-1 text-xs font-semibold rounded-full ${
            variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {children}
        </span>
      );
    }
  
    

    
    
    function TableCell({ children, className }) {
      return <td className={`px-4 py-2 ${className}`}>{children}</td>;
    }
    
    function Table({ children, className }) {
      return <table className={`w-full ${className}`}>{children}</table>;
    }
    
    function TableHeader({ children }) {
      return <thead className="bg-[#F8F9FB]">{children}</thead>;
    }
    
    function TableRow({ children }) {
      return <tr >{children}</tr>;
    }
    
    function TableHead({ children }) {
      return <th className="px-4 py-2 text-left text-[12px] font-bold text-black uppercase">{children}</th>;
    }
    
    function TableBody({ children }) {
      return <tbody className="border-t-[1px] border-b-[1px]">{children}</tbody>;
    }


    
  function DropdownMenu(props) {
    return (
      <div className="dropdown-menu">
        {props.children}
      </div>
    );
  }
  
  function DropdownMenuTrigger(props) {
    return (
      <div className="dropdown-trigger" onClick={props.onClick}>
        {props.children}
      </div>
    );
  }
  
  function DropdownMenuContent(props) {
    return (
      <div className={`dropdown-content ${props.align}`}>
        {props.children}
      </div>
    );
  }
  
  function DropdownMenuItem(props) {
    return (
      <div className="dropdown-item" onClick={props.onClick}>
        {props.children}
      </div>
    );
  }
  
  function MoreHorizontalIcon(props) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="12" r="2" fill="#000000"/>
        <circle cx="12" cy="12" r="2" fill="#000000"/>
        <circle cx="19" cy="12" r="2" fill="#000000"/>
      </svg>
    );
  }


export default function Appointment() {
  // Call the useRequireAuth hook
  const { vetId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    petName: '',
    appointment_date: moment().format('MM/DD/YYYY'),
    appointment_time: moment().format('hh:mm A'),
    reason: '',
  });
  const token=localStorage.getItem('token');
  console.log("token: ",token);
  const [formDataTraitement, setFormDataTraitement] = useState({
    ownerName: '',
    ownerEmail: '',
    petName: '',
    petSpecies: '',
    vaccines: {
        vaccineName: '',
        vaccineDate: Date.now
    },
    medicationName: '',
    allergies: '',
    medicalTreatments: {
        treatmentName: '',
        notes: ''
    },
    vetNotes: ''
});

  const [ownerDetailsMap, setOwnerDetailsMap] = useState({});
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
const [totalAppointments,setTotalAppointment]=useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointment/vet/${vetId}`);
        const vetAppointments = response.data.appointments;
        setAppointments(vetAppointments);
        console.log('number',response.data.appointments.length)
        setTotalAppointment(response.data.appointments.length)
        console.log("vet appointments", vetAppointments);
      } catch (error) {
        console.error('Error fetching vet appointments:', error.message);
      }
    };
    fetchData();
  }, [vetId]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchOwnerDetails = async (petName) => {
      try {
        const response = await axios.post('http://localhost:5000/api/pet/owner', { name: petName });
        const ownerDetails = response.data;
        setOwnerDetailsMap(prevMap => ({
          ...prevMap,
          [petName]: ownerDetails
        }));
      } catch (error) {
        console.error('Error fetching owner details:', error.message);
      }
    };
    appointments.forEach(appointment => {
      fetchOwnerDetails(appointment.pet?.name);
    });
  }, [appointments]);

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointment/unavailable/${vetId}`);
        setUpcomingAppointments(response.data.unavailableAppointments);
      } catch (error) {
        console.error('Error fetching upcoming appointments:', error.message);
      }
    };
    fetchUpcomingAppointments();
  }, [vetId]);

  const handleCheckboxChange = (appointmentId) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [appointmentId]: !prevState[appointmentId]
    }));
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event, appointment) => {
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(appointment);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Fonction pour fermer le popover
  const handleClos = () => {
    setAnchorEl(null);
    setSelectedAppointment(null);
  };
  const [openPopovers, setOpenPopovers] = useState({});

  
  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedAppointmentId(appointment._id)
    setIsModalOpen(true)
    setOpenPopovers(prevState => ({
      ...prevState,
      [appointment._id]: true
    }));
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false)
    setOpenPopovers(prevState => ({
      ...prevState,
      [selectedAppointment._id]: false
    }));
  };
  const handleOpenDialog = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    
    setOpenDialog(true);
  };

  console.log("apppppointment id :",selectedAppointmentId)

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveTreatment = () => {
    setConfirmDialogOpen(true);
  };

  const handleCancelSave = () => {
    setConfirmDialogOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  
  const handleChangeTraitement = (event) => {
    const { name, value } = event.target;
    setFormDataTraitement(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleOpenPopover = (appointmentId) => {
    setOpenPopovers(prevState => ({
      ...prevState,
      [appointmentId]: true
    }));
  };
  
  const handleClosePopover = (appointmentId) => {
    setOpenPopovers(prevState => ({
      ...prevState,
      [appointmentId]: false
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/appointment/first/${vetId}`, formData);

      
       alert('Appointment created successfully.');
        
        setOpen(false); // Fermer le dialogue de création d'appointement
      
    } catch (error) {
      console.error('Error creating appointment:', error);
      
    }
  };
  

  const handleSubmitConfirmAppointment = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/appointment/book/${selectedAppointment._id}`, {
        treatmentIds: [],
        petId: selectedAppointment.pet._id,
        vetId,
      });
      console.log('Appointment booked successfully:', response.data.message);
      handleCloseModal();
      setTimeout(() => {
        window.location.reload(); 
      }, 20);
    } catch (error) {
      console.error('Error confirming appointment:', error.message);
    }
  };



  const handleSubmitTraitement = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/api/treatment/', { ...formDataTraitement, appointmentId: selectedAppointmentId }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
        // Afficher une alerte de succès
    alert('Treatment created successfully.'); 
    // Fermez la boîte de dialogue après la création réussie du traitement
    handleCloseDialog();
     
    } catch (error) {
      console.error('Error creating treatment:', error);
    }
  };
    // Déclaration et initialisation de recentAppointments avec useState
    const [recentAppointments, setRecentAppointments] = useState([]);
    useEffect(() => {
      // Fonction pour récupérer les rendez-vous récents depuis le backend
      const fetchRecentAppointments = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/api/appointment/isTreated/${vetId}`);
              setRecentAppointments(response.data.recentAppointments);
              console.log('receeeeents :',response.data.recentAppointments)
              console.log("kalfouussa",recentAppointments)
          } catch (error) {
              console.error('Error fetching recent appointments:', error);
          }
      };

      // Appel de la fonction pour récupérer les rendez-vous récents lors du chargement du composant
      fetchRecentAppointments();
  }, []); // L'effet se déclenche seulement lors du montage initial

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState(null);

  const handleOpenEditDialog = (appointment) => {
    setEditedAppointment(appointment);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditedAppointment(null);
  };

  const handleSaveEditedAppointment = async () => {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token depuis le stockage local
      const response = await axios.put(
        `http://localhost:5000/api/appointment/${editedAppointment._id}`,
        editedAppointment,
        {
          headers: {
            'Authorization': `Bearer ${token}` // Ajouter le token dans les en-têtes
          }
        }
      );
      if (response.status === 200) {
        // Mise à jour réussie, vous pouvez mettre en œuvre les actions nécessaires ici
        console.log('Appointment updated successfully:', response.data.message);
        handleCloseEditDialog(); // Fermer le dialogue d'édition
      } else {
        // Gérer les erreurs ou les cas où la mise à jour a échoué
        console.error('Failed to update appointment:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating appointment:', error.message);
    }
  };
  
  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token depuis le stockage local
      const response = await axios.delete(
        `http://localhost:5000/api/appointment/${appointmentId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}` // Ajouter le token dans les en-têtes
          }
        }
      );
      if (response.status === 200) {
        // Suppression réussie, vous pouvez mettre en œuvre les actions nécessaires ici
        console.log('Appointment deleted successfully');
        alert('Appointment deleted successfully');
        setTimeout(() => {
          window.location.reload(); 
        }, 20);
        // Mettre à jour l'état ou effectuer d'autres actions nécessaires après la suppression
      } else {
        // Gérer les erreurs ou les cas où la suppression a échoué
        console.error('Failed to delete appointment:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting appointment:', error.message);
    }
  };
  
  
    const handleDeleteClick = (appointment) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
      if (confirmDelete) {
        handleDeleteAppointment(appointment._id);
      } }


  return (
    
    <div className="flex w-full bg-gray-100">
        <div className="max-md:w-1/3 w-1/5 ">
          <Sidebar />
         </div>


      <main className="flex-1 w-2/3 pb-8">        
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

        
    <div className="bg-gray-100 flex flex-col">
      <header className="bg-white  shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <PawPrintIcon className="h-6 w-6 text-primary" />
        
        <div className="flex flex-row ">
                <div className="bg-slate-200 p-2 rounded-l-lg"><SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" /></div>
                <Input
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-slate-200 rounded-r-lg"
                  placeholder="Search appointments..."
                  type="search"
                />
              </div>
              </div>
        
        
        
        <button className="flex flex-row items-center bg-slate-200 p-2 pl-8 gap-2 rounded-md font-semibold w-[250px]" onClick={handleClickOpen}>
          <PlusIcon className="h-4 w-4 mr-2" />
         New Appointment
        </button>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit}>

         <DialogTitle>Make an Appointment</DialogTitle>
         <DialogContent className="sm:w-[425px]">
        <div className="grid gap-4 py-4">
          
          <TextField
                    fullWidth
                    label="Pet Name"
                    name="petName"
                    value={formData.petName}
                    onChange={handleChange}
                    margin="normal"
                />
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
      
        <div>
          <TextField
            fullWidth
            label="Appointment Date"
            name="appointment_date"
            type="date"
            value={formData.appointment_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { min: moment().format('YYYY-MM-DD') } // Empêcher la sélection de dates antérieures
            }}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Appointment Time"
            name="appointment_time"
            type="time"
            value={formData.appointment_time}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // Les intervalles de temps sont de 5 minutes (300 secondes)
            }}
            margin="normal"
          />
        </div>
                       </LocalizationProvider>  
                        <TextField
                                  fullWidth
                                  label="Reason"
                                  name="reason"
                                  value={formData.reason}
                                  onChange={handleChange}
                                  margin="normal"
                              />
                </div>
                  </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Confirm Appointment</Button>
                    </DialogActions>
                    </form>
                  </Dialog>
                  <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      </header>


      <main className="m-4">
      <div className="bg-white rounded-lg shadow-sm mt-8 ">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Request Appointments</h2>
          </div>
          </div>
          <div className="border shadow-sm rounded-lg  bg-white p-4 mt-1 ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[150px]">Patient</TableHead>
                  <TableHead className="hidden md:table-cell">Owner</TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
              {appointments.map((appointment) =>
            appointment.status === "available" && (
              <TableRow key={appointment._id}>
                <TableCell className="font-medium">{appointment.appointment_date}</TableCell>
                <TableCell>
                  {appointment.pet ? (
                    <>
                      {appointment.pet.name}, {appointment.pet.species}
                    </>
                  ) : (
                    'Pet not found'
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {ownerDetailsMap[appointment.pet?.name]?.fullname}
                </TableCell>
                <TableCell className="hidden md:table-cell">{appointment.appointment_time}</TableCell>
                <TableCell className="text-left">
                  <Badge variant="warning">{appointment.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                <DropdownMenu>
          <DropdownMenuTrigger onClick={() => handleOpenPopover(appointment._id)}>
            <MoreHorizontalIcon className="w-4 h-4" />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>

          {openPopovers[appointment._id] && (
            <div>
              <Button
                aria-describedby={appointment._id}
                onClick={() => handleOpenPopover(appointment._id)}
               
              >
              </Button>
              <Popover
                id={appointment._id}
                open={openPopovers[appointment._id]}
                anchorEl={anchorEl}
                onClose={() => handleClosePopover(appointment._id)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={() => handleOpenModal(appointment)}>View appointment</MenuItem>
                <MenuItem onClick={() => handleOpenEditDialog(appointment)}>Reschedule</MenuItem>
                <MenuItem onClick={() => handleClosePopover(appointment._id)}>Cancel</MenuItem>
              </Popover>
            </div>
          )}
        </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
    



<Dialog open={isModalOpen} onClose={handleCloseModal} className="w-full h-full">
  <DialogTitle>Appointment Details</DialogTitle>
  <DialogContent>
    {selectedAppointment && (
      <div>
        <p>Date: {selectedAppointment.appointment_date} , {selectedAppointment.appointment_time}</p>
        <p>Patient: {selectedAppointment.pet.name}, {selectedAppointment.pet.species}</p>
        <p>Owner :{ownerDetailsMap[selectedAppointment.pet.name]?.fullname}</p>
        <p>Reason: {selectedAppointment.reason}</p>
        {/* Autres détails de l'appointment */}
      </div>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal}>Close</Button>
    <Button onClick={handleSubmitConfirmAppointment}  >Confirm</Button>
  </DialogActions>
</Dialog>
</TableBody>



            </Table>
          </div>
          </main>
          </div>
      
      <main className="flex md:flex-row flex-col w-full">
        <div className="bg-white  rounded-lg shadow-sm overflow-hidden m-4 md:w-1/2 w-full">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
          </div> 
          {upcomingAppointments.map(appointment => (
        <div key={appointment.id}>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{appointment.appointment_date}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{appointment.appointment_time}</span>
                </div>

                {appointment.pet ? (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{appointment.pet.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {ownerDetailsMap[appointment.pet.name]?.fullname}
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-red-500">
                Pet not found
              </span>
            </div>
          )}

                <div className="flex items-center gap-2 ">
                  
                  <PencilIcon  className="h-6 w-5 cursor-pointer text-green-500" onClick={() => handleOpenEditDialog(appointment)}/>
                  <AiFillDelete className="h-6 w-6 cursor-pointer text-red-400"  onClick={() => handleDeleteClick(appointment)} />
                  <FaBriefcaseMedical className="h-6 w-6 text-blue-800"  onClick={() => handleOpenDialog(appointment._id)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
</div>


{/* Dialogue de modification */}
<Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
  <DialogTitle>Edit Appointment</DialogTitle>
  <DialogContent>
    <form onSubmit={handleSaveEditedAppointment}>
      <TextField
        label="Date"

        value={editedAppointment?.appointment_date}
        onChange={(e) => setEditedAppointment(prevState => ({ ...prevState, appointment_date: e.target.value }))}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: { min: moment().format('YYYY-MM-DD') } // Empêcher la sélection de dates antérieures
        }}
      />
      <TextField
        label="Time"
        
        value={editedAppointment?.appointment_time}
        onChange={(e) => setEditedAppointment(prevState => ({ ...prevState, appointment_time: e.target.value }))}
        fullWidth
      />
      
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseEditDialog}>Cancel</Button>
    <Button onClick={handleSaveEditedAppointment}>Save</Button>
  </DialogActions>
</Dialog>


<Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>
    Dossier médical - Animaux de compagnie
  </DialogTitle>
  <DialogContent>
    <form onSubmit={handleSubmitTraitement}>
      <Typography variant="h6" gutterBottom>Owner</Typography>
      <Grid container spacing={2} className="pt-">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="ownerName"
            value={formDataTraitement.ownerName}
            label="Name"
            variant="outlined"
            onChange={handleChangeTraitement} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="ownerEmail"
            value={formDataTraitement.ownerEmail}
            label="Email"
            variant="outlined"
            type="email"
            onChange={handleChangeTraitement}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>Pet</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="petName"
            value={formDataTraitement.petName}
            label="Pet Name"
            variant="outlined"
            onChange={handleChangeTraitement}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="petSpecies"
            value={formDataTraitement.petSpecies}
            label="Espèce"
            variant="outlined"
            onChange={handleChangeTraitement}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>Vaccines</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="vaccineName"
            value={formDataTraitement.vaccines[0]}
            label="Nom du vaccin"
            variant="outlined"
            onChange={handleChangeTraitement}
          />
        </Grid>
       
      </Grid>

      <Typography variant="h6" gutterBottom>Médicaments</Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="medicationName"
            value={formDataTraitement.medicationName}
            label="Nom du médicament"
            variant="outlined"
            onChange={handleChangeTraitement}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>Allergies</Typography>
      <TextField
        name="allergies"
        value={formDataTraitement.allergies}
        fullWidth
        placeholder="Entrez les allergies de l'animal"
        rowsMin={4}
        onChange={handleChangeTraitement}
      />

      <Typography variant="h6" gutterBottom>Traitements médicaux</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="treatmentName"
            value={formDataTraitement.medicalTreatments[0]}
            label="Nom du traitement"
            variant="outlined"
            onChange={handleChangeTraitement}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="notes"
            value={formDataTraitement.medicalTreatments[1]}
            label="Notes"
            variant="outlined"
            onChange={handleChangeTraitement}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>Notes du vétérinaire</Typography>
      <TextField
        name="vetNotes"
        value={formDataTraitement.vetNotes}
        fullWidth
        placeholder="Entrez les notes du vétérinaire"
        onChange={handleChangeTraitement}
      />

      <DialogActions>
        <div className="flex gap-6 w-full">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCloseDialog}>
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveTreatment}
            fullWidth>
            Save Treatment
          </Button>
          {confirmDialogOpen && (
            <div>
              <p>Are you sure to save?</p>
              <Button variant="contained" color="primary" onClick={handleSubmitTraitement}>Yes</Button>
              <Button variant="contained" color="secondary" onClick={handleCancelSave}>No</Button>
            </div>
          )}
        </div>
      </DialogActions>
    </form>
  </DialogContent>
</Dialog>








<div className="bg-white rounded-lg shadow-sm  m-4 md:w-1/2 w-full">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Appointments</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentAppointments.length === 0 ? (
                <div className="px-6 py-4">No recent appointments found.</div>
            ) : (
                 recentAppointments.map(appointment => (
                    <div key={appointment.id} className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{appointment.appointment_date}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{appointment.appointment_time}</span>
                            </div>
                            {appointment.pet ? (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{appointment.pet.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {ownerDetailsMap[appointment.pet.name]?.fullname}
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-red-500">
                Pet not found
              </span>
            </div>
          )}
                        </div>  
                    </div>
                ))
            )}
        </div>
    </div>  
        </main>
        
        
      </main>
    </div>
    
  
    
    
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


function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
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


function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function CurvedlineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LogOutIcon(props) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function TextIcon(props) {
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
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  )
}