import React, { useState } from 'react';

import { Button ,TextField} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const YourComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleChangeDate = (date) => {
      setSelectedDate(date);
  };

  const handleChangeTime = (time) => {
      setSelectedTime(time);
  };

  const handleSaveDateTime = () => {
      if (selectedDate && selectedTime) {
          const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
          const formattedTime = moment(selectedTime).format('HH:mm:ss');

          console.log('Selected Date:', formattedDate);
          console.log('Selected Time:', formattedTime);

          // Vous pouvez faire quelque chose avec la date et l'heure sélectionnées ici

          setSelectedDate(null);
          setSelectedTime(null);
      } else {
          console.error('Please select both date and time');
      }
  };

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
              <DatePicker
                  label="Appointment Date"
                  value={selectedDate}
                  onChange={handleChangeDate}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          fullWidth
                          name="appointment_date"
                          type="date"
                          InputLabelProps={{
                              shrink: true,
                          }}
                          InputProps={{
                              inputProps: { min: moment().format('YYYY-MM-DD') },
                          }}
                      />
                  )}
              />
          </div>
          <div>
              <TimePicker
                  label="Appointment Time"
                  value={selectedTime}
                  onChange={handleChangeTime}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          fullWidth
                          name="appointment_time"
                          type="time"
                          InputLabelProps={{
                              shrink: true,
                          }}
                          inputProps={{
                              step: 300,
                          }}
                      />
                  )}
              />
          </div>
          <Button onClick={handleSaveDateTime}>Save Appointment</Button>
      </LocalizationProvider>
  );
};

export default YourComponent;
