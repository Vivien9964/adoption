
// Router to manage the routes between multiple pages in the application
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages visible in the menu, main categories for the application
import HomePage from './pages/HomePage.jsx';
import AdoptPage from './pages/AdoptPage.jsx';
import AboutPage from './pages/AboutPage.jsx';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/adopt" element={<AdoptPage />} />
      </Routes>
    </Router>
  )
}

export default App
