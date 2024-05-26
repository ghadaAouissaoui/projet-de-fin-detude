import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Grid, Divider
} from '@mui/material';
import Separator from './important/Separator';
import ScrollArea from  './important/ScrollArea';
import { useParams } from 'react-router-dom';

function TableHeader({ children }) {
  return <thead className="bg-[#F8F9FB]">{children}</thead>;
}



export default function  PetInfoDialog() {
  // Return null if petInfo is not provided
  const [petInfo, setPetInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const petId='66422c70f064e8fb1e2b458b'

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pet/historical/${petId}`);
        setPetInfo(response.data);
      } catch (error) {
        setError('Error fetching medical history');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, [petId]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col items-center p-8 space-y-4">
        <img
          alt="Pet photo"
          className="rounded-full"
          height={150}
          src={petInfo.profilePicture || "/placeholder.svg"}
          style={{
            aspectRatio: "150/150",
            objectFit: "cover",
          }}
          width={150}
        />
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">{petInfo.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Owner: {petInfo.user.fullname}
            <br />
            Phone: {petInfo.user.phone}
            <br />
            Email: {petInfo.user.email}
          </p>
        </div>
      </div>
      <Separator />
      <div className="p-8 space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-2">Vaccinations</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vaccine</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {petInfo.appointments.flatMap(appointment => appointment.treatments.map(treatment => (
                treatment.vaccines && (
                  <TableRow key={treatment._id}>
                    <TableCell>{treatment.vaccines.vaccineName}</TableCell>
                    <TableCell>{new Date(treatment.vaccines.vaccineDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                )
              )))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Medical Treatments</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Treatment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {petInfo.appointments.flatMap(appointment => appointment.treatments.map(treatment => (
                <TableRow key={treatment._id}>
                  <TableCell>{treatment.medicalTreatments.treatmentName}</TableCell>
                  <TableCell>{new Date(treatment.medicalTreatments.dateTreatment).toLocaleDateString()}</TableCell>
                  <TableCell>{treatment.medicalTreatments.notes}</TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Routine Exams</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {petInfo.appointments.map(appointment => (
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
            <TableHeader>
              <TableRow>
                <TableHead>Allergen</TableHead>
                <TableHead>Reaction</TableHead>
              </TableRow>
            </TableHeader>
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
              {petInfo.appointments.map(appointment => (
                <p key={appointment._id}>{appointment.vetNotes}</p>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};