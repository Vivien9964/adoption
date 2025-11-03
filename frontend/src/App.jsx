
// Router to manage the routes between multiple pages in the application
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages visible in the menu, main categories for the application
import HomePage from './pages/HomePage.jsx';
import AdoptPage from './pages/AdoptPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

import Navigation from './components/layout/Navigation.jsx';
import Footer from './components/layout/Footer.jsx';


function App() {

  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/adopt" element={<AdoptPage />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
