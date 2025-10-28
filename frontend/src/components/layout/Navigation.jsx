import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dog, X, Menu, ChevronDown } from 'lucide-react';


const Navigation = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdoptionDropdownOpen, setIsAdoptionDropdownOpen] = useState(false);
    const location = useLocation();


    const isActiveRoute = (path) => {
        return location.pathname === path;
    }

    const handleLinkClick = () => {
        setIsMenuOpen(false);
        setIsAdoptionDropdownOpen(false);
    }


    const toggleAdoptionDropdown = () => {
        setIsAdoptionDropdownOpen(!isAdoptionDropdownOpen);
    }


    return (
        <nav className="top-0 sticky z-50 shadow-lg bg-white">
            <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Responsive logo section*/}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
                        <div className="w-10 h-10 flex items-center justify-center rounded full bg-yellow-500">
                            <Dog className='w-6 h-6 text-black' />
                        </div>
                        <span className="text-black text-xl font-bold hidden sm:block">PawSome</span>
                        </Link>
                    </div>

                    {/*Menu button for mobiles */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 transition-all duration-300"
                        >
                        {/* Menu / X toggle*/}
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                        </button>
                    </div>

                    {/* Full screen menu for mobile */}
                    <div  className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out lg-hidden ${
                        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                    >
                        {/* Dark overlay for the menu */}
                        <div
                            className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                                isMenuOpen ? "opacity-50" : "opacity-0" 
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        ></div>

                        {/* Menu items with content  and close button*/}
                        <div className={`relative h-full w-full flex flex-col items-center justify-center space-y-8 transform transition-transform duration-500 bg-white ${
                            isMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}>

                            {/*Close button*/}
                            <button 
                                className="absolute top-6 right-6 p-2 text-black hover:text-gray-600 transition-colors duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <X className="w-8 h-8" />
                            </button>

                            {/*Menu items*/}
                            <div className="flex flex-col items-center text-center space-y-4">

                                {/*Home menu item*/}
                                <Link
                                    to="/"
                                    onclick={handleLinkClick}
                                    className={`text-2xl font-medium transition-all duration-300 transform hover:scale-110 hover:text-blue-600 ${
                                        isActiveRoute('/') ? 'text-blue-600 scale-110' : 'text-black'
                                    }`}
                                >
                                    Home
                                </Link>
                        
                                

                                {/*Adoption menu item*/}
                                <div className="flex flex-col items-center space-y-4">
                                    <button
                                        className={`flex items-center text-2xl font-medium space-x-2 transition-all duration-300 transform hover:scale-110 hover:text-blue-800 ${
                                            isActiveRoute('/dogs') || isActiveRoute('/schedule-meeting') || isActiveRoute('/virtual-adoption') ? "text-blue-600 scale-110" : "text-black"
                                        }`}
                                        onClick={toggleAdoptionDropdown}
                                    >
                                        <span> Adoption </span>
                                        <ChevronDown
                                            className={`w-6 h-6 transition-transform duration-300 ${
                                                isAdoptionDropdownOpen ? "rotate-180" : ""
                                            }`}
                                        />

                                    </button>

                                    {/*Dropdown items for mobile*/}
                                    {isAdoptionDropdownOpen && (
                                        <div className="flex flex-col items-center space-y-3 pl-4">
                                            <Link
                                                to="/dogs"
                                                onclick={handleLinkClick}
                                                className="text-lg text-black hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                                            >
                                                Dogs
                                            </Link>
                                            <Link
                                                to="/schedule-meeting"
                                                onclick={handleLinkClick}
                                                className="text-lg text-black hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                                            >
                                                Schedule Meeting
                                            </Link>
                                            <Link
                                                to="/virtual-adoption"
                                                onclick={handleLinkClick}
                                                className="text-lg text-black hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                                            >
                                                Virtual Adoption
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    to="/about"
                                    onclick={handleLinkClick}
                                    className={`text-2xl font-medium transition-all duration-300 transform hover:scale-110 hover:text-blue-600 ${
                                        isActiveRoute('/about') ? 'text-blue-600 scale-110' : 'text-black'
                                    }`}
                                >
                                    About
                                </Link>

                                <Link
                                    to="/contact"
                                    onclick={handleLinkClick}
                                    className={`text-2xl font-medium transition-all duration-300 transform hover:scale-110 hover:text-blue-600 ${
                                        isActiveRoute('/contact') ? 'text-blue-600 scale-110' : 'text-black'
                                    }`}
                                >
                                    Contact
                                </Link>

                                <Link
                                    to="/login"
                                    onclick={handleLinkClick}
                                    className="bg-gradient-to-r from-black to-yellow-600 hover:from-black hover:to-yellow-700 text-white py-3 px-5 rounded font-medium transition-all duration-300 transform hover:scale-105 shadow-lg text-xl mt-8"
                                >
                                    Log In
                                </Link>

                            </div>






                        </div>
                    </div>


                </div>
            </div>
        </nav>
    ) 
}

export default Navigation;