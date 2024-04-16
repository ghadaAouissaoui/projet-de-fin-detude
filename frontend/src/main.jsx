import React from 'react'; // Import React
import {createRoot} from 'react-dom/client'; // Import ReactDOM for rendering
import App from './App.jsx'; // Import your App component
import './index.css'; // Import your CSS file

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );