// MyDatePicker.js

import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        value={selectedDate} 
        onChange={(datebirth) => setSelectedDate(datebirth)} 
        className="w-full h-1/2" 
      />
    </LocalizationProvider>
  );
}

