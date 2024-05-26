import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import axios from 'axios';

export default function AddPatientForm ({ open, handleClose, vetId })  {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    species: '',
    breed: '',
    sex: '',
    profilePicture: '',
    medicalHistory: '',
    email: '', // Assuming you'll enter the user's email to link the pet
    vetId: vetId // Pass the vetId to the formData
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
const token =localStorage.getItem("token")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/pet", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      handleClose(); // Close the dialog on success
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Patient</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            name="species"
            label="Species"
            value={formData.species}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="breed"
            label="Breed"
            value={formData.breed}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="sex"
            label="Sex"
            value={formData.sex}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="profilePicture"
            label="Profile Picture URL"
            value={formData.profilePicture}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="medicalHistory"
            label="Medical History"
            value={formData.medicalHistory}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="email"
            label="User Email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="submit" color="primary">
          Add Patient
        </Button>
      </DialogActions>
    </Dialog>
  );
};

