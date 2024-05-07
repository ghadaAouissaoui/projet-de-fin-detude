import { Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from "@mui/material";
import React from "react";
import axios from "axios";
import { useEffect ,useState} from "react";
import { Link } from "react-router-dom";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
     

function Label({ componentName, valueType, isProOnly }) {
    const content = (
      <span>
        <strong>{componentName}</strong> for {valueType} editing
      </span>
    );
  }
export default function AvailableAppointment() {

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };
    
    const [veterinarians, setVeterinarians] = useState([]);
   
    useEffect(() => {
      const fetchVeterinarians = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/veterinaries');
          setVeterinarians(response.data);
        } catch (error) {
          console.error('Error fetching veterinarians data:', error);
        }
      };
  
      fetchVeterinarians();
    }, []);
    console.log(veterinarians);
    const [formData, setFormData] = useState({
        name: '',
        appointment_date: '',
        appointment_time: '',
        reason: ''
      });
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };    


  return (
    <div className="flex min-h-screen">
      <main className="w-full bg-gray-100 py-8 px-6">
        
          
            <h2 className="text-2xl text-center font-bold mb-4">Select a Veterinarian</h2>
            <div className="grid grid-rows-3 gap-6 m-5 md:grid-cols-3 mx-5 md:mx-0 my-5">
            {veterinarians.map((vet, index) => (
              <Card key={index} className="bg-white rounded-lg shadow p-4">
                <CardHeader
                  title={vet.nomCabinet} 
                  subheader={`${vet.fullname} ${vet.specialite} ${vet.address.rue} ${vet.address.city} ${vet.address.postalCode}`}
                  avatar={<img alt={vet.fullname} className="rounded-full" height={64} src="/placeholder.svg" style={{ aspectRatio: "64/64", objectFit: "cover" }} width={64} />}
                />
                <CardContent>
                  <Button variant="contained" color="primary" onClick={handleOpenDialog}>Request Appointment</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Request Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill out the form to request an appointment with the selected veterinarian.
            </DialogContentText>
            <TextField autoFocus margin="dense" id="fullname" label="Full Name" type="text" fullWidth />
            <TextField margin="dense" id="phoneNumber" label="Phone" type="text" fullWidth />
            <TextField margin="dense" id="email" label="Email" type="email" fullWidth />
            <TextField margin="dense" id="notes" label="Notes" type="text" fullWidth />
            <TextField
                    fullWidth
                    label="Pet Name"
                    name="petName"
                    value={formData.petName}
                    onChange={handleChange}
                    margin="normal"
                />
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoItem label={<Label componentName="DatePicker" valueType="date" />} name="appointmentDate"
                          value={formData.appointment_date}
                          onChange={handleChange} >
                               <DatePicker />
                     </DemoItem>
        
                     <DemoItem label={<Label componentName="TimePicker" valueType="time" />} name="appointmentTime"
                    value={formData.appointment_time}
                    onChange={handleChange}>
                        <TimePicker />
                     </DemoItem>
                       </LocalizationProvider>  
                        <TextField
                                  fullWidth
                                  label="Reason"
                                  name="reason"
                                  value={formData.reason}
                                  onChange={handleChange}
                                  margin="normal"
                              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
            <Button color="primary">Submit</Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  )
}
