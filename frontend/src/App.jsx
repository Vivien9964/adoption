
// Router to manage the routes between multiple pages in the application
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages visible in the menu, main pages for the application
import HomePage from './pages/HomePage';
import DogsPage from './pages/DogsPage';
import ScheduleMeetingPage from './pages/ScheduleMeetingPage';
import VirtualAdoptionPage from './pages/VirtualAdoptionPage';
import AboutPage from './pages/AboutPage';

// Layout components
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// Context
import { PetsProvider } from './context/PetsContext';


function App() {

  return (
    <Router>
      <PetsProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dogs" element={<DogsPage />} />
          <Route path="/schedule-meeting" element={<ScheduleMeetingPage />} />
          <Route path="/virtual-adoption" element={<VirtualAdoptionPage />} />
        </Routes>
       <Footer />
      </PetsProvider>
    </Router>
  )
}

export default App
