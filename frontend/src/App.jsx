import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/FirstscreenHome';
import ComponentD from './pages/SecondscreenHome';
import ComponentF from './pages/ThirdscreenHome';
import ComponentQ from './pages/FourthscreenHome';
import Signup from './pages/signup';
import Login from './pages/login';
import EmailVerifyVeto from './Verification/emailVerification'
import EmailVerifyUser from './Verification/verificationEmail'
import Dashboard from './pages/Dashbord';
import DoctorProfile from './pages/DoctorProfile';
import SignupPro from './pages/signupPro';
import AboutUs from './components/Aboutus';
import ContactUs from './components/Contactus';
import Services from './components/Getservices';
import Appointment from './pages/Appointments';
import Inbox from './pages/Inbox';
import Patient from './pages/Patients';
import Adding from './pages/AddUser';
import UserDashboard from './pages/EspaceClient';
import ComponentPets from './pages/Pets';
import AvailableAppointment from './pages/FindDoctor';
import AppointmentUser from './pages/AppointmentUser';
import Calendar from './pages/bookAppointment';
import ReactCalender from './pages/calendrier';


const App = () => {
  return (
    <>
    <Router>
      <>
        <Navbar />
          <Routes>
           
            <Route path="/" element={<><Home /><ComponentD /><ComponentF /><ComponentQ /></>} />
            <Route path="/calendar/:vetId" element={< Calendar />} />
            <Route path="/aboutus" element={<AboutUs />}/>
            <Route path="/contactus" element={<ContactUs />}/>
            <Route path="/services" element={<Services />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signupPro" element={<SignupPro />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/users/:id/verify/:token" element={<EmailVerifyUser />} />
            <Route path="/veterinaries/:id/verify/:token" element={<EmailVerifyVeto/> } />
            <Route path="/pro/:vetId" element={<Dashboard />} />
            <Route path="/pro/appointment/:vetId" element={<Appointment />} />
            <Route path="/pro/inbox/:vetId" element={<Inbox />} />
            <Route path="/pro/patients/:vetId" element={<Patient/>} />
            <Route path="/pro/adding/:vetId" element={<Adding/>} />
            <Route path="/doctorprofile/:vetId" element={<DoctorProfile />} />
            <Route path="/espaceclient/:userId" element={<UserDashboard />} />
            <Route path="/espaceclient/appointment/:userId" element={<AppointmentUser/>} />
            <Route path="/espaceclient/pets/:userId" element={<ComponentPets />} />
            <Route path="/search" element={<AvailableAppointment />} />
            <Route path="/calender" element={<ReactCalender />} />
          </Routes>
        <Footer />
      </>
    </Router></>
  );
};

export default App;
