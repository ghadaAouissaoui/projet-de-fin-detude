import React, { useState } from 'react';

function Calendar() {
  // State pour stocker les rendez-vous
  const [appointments, setAppointments] = useState([]);

  // State pour stocker les détails du nouveau rendez-vous
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    description: ''
  });

  // Fonction pour ajouter un nouveau rendez-vous
  const addAppointment = () => {
    // Vérifie si tous les champs du nouveau rendez-vous sont remplis
    if (newAppointment.date && newAppointment.time && newAppointment.description) {
      // Crée un nouvel objet rendez-vous
      const appointment = {
        id: Date.now(), // Utilise un timestamp comme identifiant unique
        date: newAppointment.date,
        time: newAppointment.time,
        description: newAppointment.description
      };

      // Met à jour la liste des rendez-vous avec le nouveau rendez-vous ajouté
      setAppointments([...appointments, appointment]);

      // Réinitialise les champs du nouveau rendez-vous
      setNewAppointment({ date: '', time: '', description: '' });
    } else {
      alert('Veuillez remplir tous les champs du rendez-vous.');
    }
  };

  return (
    <div>
      {/* Formulaire pour ajouter un nouveau rendez-vous */}
      <div>
        <input
          type="date"
          value={newAppointment.date}
          onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
        />
        <input
          type="time"
          value={newAppointment.time}
          onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
        />
        <input
          type="text"
          value={newAppointment.description}
          placeholder="Description"
          onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
        />
        <button onClick={addAppointment}>Ajouter un rendez-vous</button>
      </div>

      {/* Affichage des rendez-vous */}
      <div>
        <h2>Rendez-vous</h2>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              {appointment.date} à {appointment.time}: {appointment.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calendar;
