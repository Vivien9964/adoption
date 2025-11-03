import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dog, X, Menu, ChevronDown } from 'lucide-react';


const Navigation = () => {

    // state to toggle mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // state to toggle adoption dropdown menu
    const [isAdoptionDropdownOpen, setIsAdoptionDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);
    const location = useLocation();

    // The function below ensures that the dropdown menu on a desktop can be closed
    // by clicking anywhere on the page if the mobile menu is not open!!
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(!isMenuOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsAdoptionDropdownOpen(false);
            }

        };

        if(isAdoptionDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

       return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [isAdoptionDropdownOpen, isMenuOpen]);

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

        navLink: (isActive, index = 0) => `
            px-4 py-2 rounded-full text-md font-semibold 
            transition-all duration-300 transform hover:scale-105 hover:rotate-3

            ${index % 2 === 0 ? "hover:-rotate-3" : "hover:rotate-3"}
            ${isActive 
                ? "bg-yellow-300 text-yellow-800 scale-105 shadow-sm" 
                : "text-yellow-900 hover:bg-yellow-200 hover:shadow-md"
            }
        `,

        mobileLink: (isActive, index = 0) => `
            px-4 py-2 rounded-full text-2xl font-semibold 
            transition-all duration-300 transform hover:scale-110 hover:rotate-3

            ${index % 2 === 0 ? "hover:rotate-3" : "hover:-rotate-3"}
            ${isActive
                ? "bg-yellow-400 text-yellow-800 scale-110 shadow-sm"
                : "text-yellow-900 hover:bg-yellow-200 hover:shadow-md"
            }
        `,

        dropDownItem:(index = 0) =>  `
            block px-4 py-3 mx-2 my-1 
            text-sm font-semibold rounded-full
            text-yellow-900 hover:bg-yellow-200 hover:text-yellow-800
            transition-all duration-300 transform hover:scale-105 hover:rotate-2 hover:shadow-md

            ${index % 2 === 0 ? "hover:rotate-2" : "hover:-rotate-2"}
        `,

        dropDownItemMobile:(index = 0) => `
            px-4 py-2 rounded-full
            text-lg font-semibold text-yellow-900 hover:text-yellow-800
            transition-all duration-300 transform hover:scale-105 hover:rotate-2 hover:shadow-md hover:bg-yellow-200

            ${index % 2 === 0? "hover:rotate-2" : "hover:-rotate-2"}
        `,

        primaryBtn: `
            px-6 py-2 rounded-full
            text-md font-semibold text-yellow-800
            transition-all duration-300 transform hover:scale-105 hover:rotate-3
            shadow-md hover:shadow-lg bg-yellow-300/80 hover:bg-yellow-300
        `,

        primaryBtnMobile: `
            px-8 py-3 mt-8 rounded-full
            text-xl font-semibold text-yellow-800
            transition-all duration-300 transform hover:scale-105 hover:rotate-3
            shadow-lg bg-yellow-300/80 hover:bg-yellow-300
        `,

        dropDownBtn: (isActive) => `
            flex items-center px-4 py-2 space-x-1 rounded-full
            text-md font-semibold 
            transition-all duration-300 transform hover:scale-105 hover:rotate-3
            ${isActive 
                ? "bg-yellow-300 text-yellow-800 scale-105 shadow-sm"
                : "text-yellow-900 hover:bg-yellow-200 hover:shadow-md"
            }
        `,

        dropDownBtnMobile: (isActive) => `
            flex items-center space-x-2  px-4 py-2 rounded-full
            text-2xl font-semibold transition-all duration-300 transform hover:scale-110 hover:rotate-3
            ${isActive 
                ? "bg-yellow-300 text-yellow-800 scale-110 shadow-sm" 
                : "text-yellow-900 hover:bg-yellow-200 hover:shadow-md"
            }
        `   
    }

    const isAdoptionActive = isActiveRoute('/dogs') || isActiveRoute('/schedule-meeting') || isActiveRoute('/virtual-adoption');

    return (
        <nav className="sticky top-0 z-50 shadow-lg bg-sky-100 border-blue-100 backdrop-blur-sm">
            <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Responsive logo section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group" onClick={handleLinkClick}>
                        <div className="logo-wiggle w-12 h-12 flex items-center justify-center rounded-full bg-yellow-300/80 shadow-sm transition-colors duration-300 group-hover:bg-yellow-300">
                            <Dog className='w-8 h-8 text-yellow-800 drop-shadow-sm' />
                        </div>
                        <span className="text-yellow-800 text-xl font-bold hidden sm:block">PawSome</span>
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden lg:block">
                        <div className="flex items-center ml-10 space-x-8">
                            <Link 
                                to="/"
                                className={styles.navLink(isActiveRoute('/'), 0)}
                            >
                                Home
                            </Link>
                            
                            { /* Dropdown Adoption for desktop */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleAdoptionDropdown}
                                    className={styles.dropDownBtn(isAdoptionActive, 1)}
                                >
                                    <span>Adoption</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-300 ${
                                            isAdoptionDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {isAdoptionDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 py-2 z-50 w-52 bg-white rounded-xl shadow-xl border border-blue-100">
                                        <Link
                                            to="/dogs"
                                            className={styles.dropDownItem(0)}
                                            onClick={() => setIsAdoptionDropdownOpen(false)}
                                        >
                                            Dogs
                                        </Link>
                                        <Link
                                            to="/schedule-meeting"
                                            className={styles.dropDownItem(1)}
                                            onClick={() => setIsAdoptionDropdownOpen(false)}
                                        >
                                            Schedule Meeting
                                        </Link>
                                        <Link
                                            to="/virtual-adoption"
                                            className={styles.dropDownItem(2)}
                                            onClick={() => setIsAdoptionDropdownOpen(false)}
                                        >
                                            Virtual Adoption
                                        </Link>
                                    </div>
                                )}
                            </div>


                            <Link
                                to="/about"
                                className={styles.navLink(isActiveRoute('/about'), 2)}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className={styles.navLink(isActiveRoute('/contact'), 3)}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Login button for desktop */}
                    <div className="hidden lg:block">
                        <Link
                            to="/login"
                            className={styles.primaryBtn}
                        >
                            Log In
                        </Link>

                    </div>






                    {/* Menu button for mobiles */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:bg-yellow-100 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-110"
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
                    <div  className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out lg:hidden ${
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
                        <div className={`relative h-screen w-screen z-10 flex flex-col items-center justify-center space-y-8 transform transition-transform duration-500 bg-yellow-50 ${
                            isMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                        >

                            {/*Close button*/}
                            <button 
                                className="absolute z-10 top-6 right-6 p-2 text-yellow-900 hover:text-gray-600 transition-colors duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <X className="w-8 h-8" />
                            </button>

                            {/*Menu items*/}
                            <div className="flex flex-col items-center text-center space-y-6">

                                {/*Home menu item*/}
                                <Link
                                    to="/"
                                    onClick={handleLinkClick}
                                    className={styles.mobileLink(isActiveRoute('/'), 0)}
                                >
                                    Home
                                </Link>
                        
                                
                                {/*Adoption menu item*/}
                                <div className="flex flex-col items-center space-y-4">
                                    <button
                                        className={styles.dropDownBtnMobile(isAdoptionActive, 1)}
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
                                        <div className="flex flex-col items-center space-y-3" >
                                            <Link
                                                to="/dogs"
                                                onClick={handleLinkClick}
                                                className={styles.dropDownItemMobile(0)}
                                            >
                                                Dogs
                                            </Link>
                                            <Link
                                                to="/schedule-meeting"
                                                onClick={handleLinkClick}
                                                className={styles.dropDownItemMobile(1)}
                                            >
                                                Schedule Meeting
                                            </Link>
                                            <Link
                                                to="/virtual-adoption"
                                                onClick={handleLinkClick}
                                                className={styles.dropDownItemMobile(2)}
                                            >
                                                Virtual Adoption
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    to="/about"
                                    onClick={handleLinkClick}
                                    className={styles.mobileLink(isActiveRoute('/about'), 2)}
                                >
                                    About
                                </Link>

                                <Link
                                    to="/contact"
                                    onClick={handleLinkClick}
                                    className={styles.mobileLink(isActiveRoute('/contact'), 3)}
                                >
                                    Contact
                                </Link>

                                <Link
                                    to="/login"
                                    onClick={handleLinkClick}
                                    className={styles.primaryBtnMobile}
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