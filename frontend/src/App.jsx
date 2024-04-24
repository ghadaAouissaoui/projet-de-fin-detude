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

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
          <Routes>
            <Route path="/" element={<><Home /><ComponentD /><ComponentF /><ComponentQ /></>} />
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signupPro" element={<SignupPro />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/users/:id/verify/:token" element={<EmailVerifyUser />} />
            <Route path="/veterinaries/:id/verify/:token" element={<EmailVerifyVeto/> } />
            <Route path="/pro" element={<Dashboard />} />
            <Route path="/doctorprofile/:id" element={<DoctorProfile />} />
          </Routes>
        <Footer />
      </>
    </Router>
  );
};

export default App;
