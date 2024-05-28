import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FocusProvider } from './pages/FocusContext'; // Ensure the path is correct
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/FirstscreenHome';
import ComponentD from './pages/SecondscreenHome';
import ComponentF from './pages/ThirdscreenHome';
import ComponentQ from './pages/FourthscreenHome';
import Signup from './pages/signup';
import Login from './pages/login';
import EmailVerifyVeto from './Verification/emailVerification';
import EmailVerifyUser from './Verification/verificationEmail';
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
import Logged from './pages/Home';
import PetInfoDialog from './pages/PetInfoDialog';
import EmailVerifySecretaire from './Verification/verification';
import Review from './pages/Review';
import Message from './pages/messages';

const App = () => {
  return (
    <FocusProvider>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<><Home /><ComponentD /><ComponentF /><ComponentQ /></>} />
            <Route path="/:userId" element={<Logged />} />
            <Route path="/calendar/:vetId" element={<Calendar />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signupPro" element={<SignupPro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:id/verify/:token" element={<EmailVerifyUser />} />
            <Route path="/veterinaries/:id/verify/:token" element={<EmailVerifyVeto />} />
            <Route path="/secretaires/:id/verify/:token" element={<EmailVerifySecretaire />} />
            <Route path="/pro/:vetId" element={<Dashboard />} />
            <Route path="/pro/:id" element={<Dashboard />} />
            <Route path="/pro/appointment/:vetId" element={<Appointment />} />
            <Route path="/pro/inbox/:vetId" element={<Inbox />} />
            <Route path="/pro/patients/:vetId" element={<Patient />} />
            <Route path="/pro/adding/:vetId" element={<Adding />} />
            <Route path="/doctorprofile/:vetId" element={<DoctorProfile />} />
            <Route path="/espaceclient/:userId" element={<UserDashboard />} />
            <Route path="/espaceclient/appointment/:userId" element={<AppointmentUser />} />
            <Route path="/espaceclient/pets/:userId" element={<ComponentPets />} />
            <Route path="/calender/:petId" element={<PetInfoDialog />} />
            <Route path="/espaceclient/review/:userId" element={<Review />} />
            <Route path="/espaceclient/messages/:userId" element={<Message/>} />
          </Routes>
          <Footer />
        </>
      </Router>
    </FocusProvider>
  );
};

export default App;
