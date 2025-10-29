import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dog, X, Menu, ChevronDown } from 'lucide-react';


const Navigation = () => {

    // state to toggle mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // state to toggle adoption dropdown menu
    const [isAdoptionDropdownOpen, setIsAdoptionDropdownOpen] = useState(false);

    const location = useLocation();


    const isActiveRoute = (path) => {
        return location.pathname === path;
    }

    // function to change states
    const handleLinkClick = () => {
        setIsMenuOpen(false);
        setIsAdoptionDropdownOpen(false);
    }


    const toggleAdoptionDropdown = () => {
        setIsAdoptionDropdownOpen(!isAdoptionDropdownOpen);
    }

    // Clearer styles inside style class for clearer code and better maintainability
    // reasoning for the changes in my approach: in the previous code I created a lot of repetitions with the styles,
    // if I have to change something it takes longer and it is harder to read to code 
    const styles = {

        navLink: (isActive) => `
            px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105
            ${isActive 
                ? "bg-blue-100 text-blue-700 scale-105" 
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }
        `,

        mobileLink: (isActive) => `
            text-2xl font-medium transition-all duration-300 transform hover:scale-110 hover:text-blue-600
            ${isActive
                ? "text-blue-600 scale-110"
                : "text-gray-800"
            }
        `,

        dropDownItem: `
            block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600
            transition-colors duration-200
        `,

        dropDownItemMobile: `
            text-lg text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-105
        `,

        primaryBtn: `
            px-6 py-2 rounded-full
            bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
            text-white font-medium
            transition-all duration-300 transform hover:scale-105
            shadow-md hover:shadow-lg
        `,

        primaryBtnMobile: `
            px-8 py-3 mt-8 rounded-full
            bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
            text-white font-medium text-xl
            transition-all duration-300 transform hover:scale-105
            shadow-md
        `,

        dropDownBtn: (isActive) => `
            flex items-center px-3 py-2 space-x-1 rounded-md
            text-sm font-medium transition-all duration-300 transform hover:scale-105
            ${isActive 
                ? "bg-blue-100 text-blue-700 scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }
        `,

        dropDownBtnMobile: (isActive) => `
            flex items-center space-x-2 text-2xl font-medium 
            transition-all duration-300 transform hover:scale-110 hover:text-blue-600
            ${isActive 
                ? "text-blue-600 scale-110" 
                : "text-gray-800"
            }
        `   
    }

    const isAdoptionActive = isActiveRoute('/dogs') || isActiveRoute('/schedule-meeting') || isActiveRoute('/virtual-adoption');

    return (
        <nav className="sticky top-0 z-50 shadow-lg bg-white">
            <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Responsive logo section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3" onClick={handleLinkClick}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500">
                            <Dog className='w-6 h-6 text-black' />
                        </div>
                        <span className="text-black text-xl font-bold hidden sm:block">PawSome</span>
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden lg:block">
                        <div className="flex items-center ml-10 space-x-8">
                            <Link 
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                    isActiveRoute('/') ? 'bg-yellow-200 scale-105' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Home
                            </Link>
                            
                            { /* Dropdown Adoption for desktop */}
                            <div className="relative">
                                <button
                                    onClick={toggleAdoptionDropdown}
                                    className={`flex items-center px-3 py-2 space-x-1 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                        isActiveRoute('/dogs') || isActiveRoute('/schedule-meeting') || isActiveRoute('/virtual-adoption')
                                        ? "bg-yellow-200 text-black scale-105"
                                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                    }`}
                                >
                                    <span>Adoption</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-300 ${
                                            isAdoptionDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {isAdoptionDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 py-2 z-50 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                                        <Link
                                            to="/dogs"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                            onClick={() => setIsAdoptionDropdownOpen(false)}
                                        >
                                            Dogs
                                        </Link>
                                        <Link
                                            to="/schedule-meeting"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                            onClick={() => setIsAdoptionDropdownOpen(false)}
                                        >
                                            Schedule Meeting
                                        </Link>
                                        <Link
                                            to="/virtual-adoption"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                            onClick={() => setIsAdoptionDropdownOpen(false)}
                                        >
                                            Virtual Adoption
                                        </Link>
                                    </div>
                                )}
                            </div>


                            <Link
                                to="/about"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                    isActiveRoute('/about') ? "bg-blue-100 text-blue-700 scale-105" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                }`}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                    isActiveRoute('/contact') ? "bg-blue-100 text-blue-700 scale-105" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                }`}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Login button for desktop */}
                    <div className="hidden lg:block">
                        <Link
                            to="/login"
                            className="px-6 py-3 rounded bg-gradient-to-r from-black to-yellow-600 hover:from-yellow-600 hover:to-black text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            Log In
                        </Link>

                    </div>






                    {/* Menu button for mobiles */}
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
                    <div  className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out lg:hidden ${
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
                                    onClick={handleLinkClick}
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

                                    {/*Dropdown for Adoption menu item for mobile*/}
                                    {isAdoptionDropdownOpen && (
                                        <div className="flex flex-col items-center space-y-3 pl-4">
                                            <Link
                                                to="/dogs"
                                                onClick={handleLinkClick}
                                                className="text-lg text-black hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                                            >
                                                Dogs
                                            </Link>
                                            <Link
                                                to="/schedule-meeting"
                                                onClick={handleLinkClick}
                                                className="text-lg text-black hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                                            >
                                                Schedule Meeting
                                            </Link>
                                            <Link
                                                to="/virtual-adoption"
                                                onClick={handleLinkClick}
                                                className="text-lg text-black hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                                            >
                                                Virtual Adoption
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    to="/about"
                                    onClick={handleLinkClick}
                                    className={`text-2xl font-medium transition-all duration-300 transform hover:scale-110 hover:text-blue-600 ${
                                        isActiveRoute('/about') ? 'text-blue-600 scale-110' : 'text-black'
                                    }`}
                                >
                                    About
                                </Link>

                                <Link
                                    to="/contact"
                                    onClick={handleLinkClick}
                                    className={`text-2xl font-medium transition-all duration-300 transform hover:scale-110 hover:text-blue-600 ${
                                        isActiveRoute('/contact') ? 'text-blue-600 scale-110' : 'text-black'
                                    }`}
                                >
                                    Contact
                                </Link>

                                <Link
                                    to="/login"
                                    onClick={handleLinkClick}
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