import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Demo from './pages/Demo';
import Contact from './pages/Contact';
import AdminLogin from './admin/AdminLogin';
import AdminPanel from './admin/AdminPanel';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <div style={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

export default App;