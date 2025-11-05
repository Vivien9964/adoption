
// Router to manage the routes between multiple pages in the application
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages visible in the menu, main pages for the application
import HomePage from './pages/HomePage.jsx';
import AdoptPage from './pages/AdoptPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

// Layout components
import Navigation from './components/layout/Navigation.jsx';
import Footer from './components/layout/Footer.jsx';

// Context
import { PetsProvider } from './context/PetsContext.jsx';


function App() {

  return (
    <Router>
      <PetsProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/adopt" element={<AdoptPage />} />
        </Routes>
       <Footer />
      </PetsProvider>
    </Router>
  )
}

export default App
