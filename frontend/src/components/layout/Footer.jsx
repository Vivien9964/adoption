import { Link } from 'react-router-dom'
import { Dog, Mail, Phone, MapPin, Facebook, Instagram, Heart } from 'lucide-react'

const Footer = () => {


    // Get current year for copyright
    const currentYear = new Date().getFullYear();


    const styles = {
        link: `
            inline-block
            text-yellow-800 hover:text-yellow-600
            transition-all duration-300 transform hover:translate-x-1
        `,

        socialIcon: `
            w-10 h-10 rounded-full flex items-center justify-center
            text-yellow-800 bg-yellow-300/80 hover:bg-yellow-300
            transform hover:scale-110 hover:rotate-12
            shadow-md hover:shadow-lg
        `,

        heading: `
            flex items-center gap-2 mb-4
            text-lg font-bold text-yellow-900
        `,

        contactItem: `
            flex items-start gap-3 text-yellow-900
            transition-all duration-300 hover:translate-x-1
        `
    }

    return (
    <footer className="bg-sky-100 border-t-4 border-yellow-300/50">

        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

            {/* Grid layout -> 1 column for mobile, 2 columns for tablets and 4 columns for desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

                {/* Column 1 - About */}
                <div className="space-y-4">

                    {/* Logo + description */}
                    <div className="flex items-center gap-3 group">
                        <div className="logo-wiggle p-2 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-300/80 shadow-sm transition-colors duration-300 group-hover:bg-yellow-300">
                            <Dog className="w-10 h-10 text-yellow-800 drop-shadow-sm" />
                        </div>

                        <p className="text-yellow-900 text-sm leading-relaxed">
                            Connecting people with furry paws looking for forever homes.
                            Every adoption creates a happy tail.
                        </p>
                    </div>

                    
                    {/* Social links */}
                    <div className="flex gap-3 pt-2">

                        <a 
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialIcon}
                            aria-label="Facebook"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a 
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialIcon}
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Column 2 - Quick links */}
                <div>
                    <h3 className={styles.heading}>Quick Links</h3>

                    <ul className="space-y-3">
                        <li>
                            <Link to="/" className={styles.link}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/dogs" className={styles.link}>
                                Our Dogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={styles.link}>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={styles.link}>
                                Contact
                            </Link>
                       </li>

                    </ul>
                </div>

                {/* Column 3 - Adoption info */}
                <div>
                    <h3 className={styles.heading}>Adoption</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/dogs" className={styles.link}>
                                Our Dogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/schedule-meeting" className={styles.link}>
                                Schedule a visit
                            </Link>
                        </li>
                        <li>
                            <Link to="/virtual-adoption" className={styles.link}>
                                Virtual adoption
                            </Link>
                        </li>
                    
                    </ul>
                </div>

                {/* Column 4 - Contact info */}
                <div>
                    <h3 className={styles.heading}>Contact Us</h3>
                    <div className="space-y-4">

                        {/* Address */}
                        <div className={styles.contactItem}>
                            <MapPin className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">
                                Bdul. Revolutiei 63, Arad, Romania
                            </span>
                        </div>

                        {/* Phone */}
                        <div className={styles.contactItem}>
                            <Phone className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <a 
                                href="tel:+123456789"
                                className="text-sm hover:text-yellow-600 transition-colors"
                            >
                                (123) 456-789   
                            </a>
                        </div>

                        {/* Email */}
                        <div className={styles.contactItem}>
                            <Mail className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <a href="mailto:info@pawsome.com" className="text-sm hover:text-yellow-600 transition-colors">
                                info@pawsome.com
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        {/* Copyright */}
        <div className="bg-sky-200/50 border-t border-yellow-300/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-yellow-900 text-sm text-center md:text-left">
                        @ {currentYear} PawSome. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2 text-yellow-900 text-sm">
                        <span>Made with </span>
                        <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                        <span> for dogs.</span>

                    </div>
                </div>

            </div>

        </div>

    </footer>
    )
}


export default Footer;