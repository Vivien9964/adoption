import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Section from '../layout/Section';
import { Heart, HandHeart } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background image from public folder */}
            <div 
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `url("/images/Hero-puppy.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 30%",
                    backgroundRepeat: "no-repeat"
                }}
            >

            {/* Dark overlay - more readable text */}
            <div className="absolute inset-0 bg-black/50" />
            </div>
            
            {/* Hero section - content */}
            <div className="relative z-10 w-full">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    {/* Hero - main title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                        Every dog deserves a{' '} <span className="text-yellow-300">loving HOME</span>
                    </h1>

                    {/* Hero - paragraph */}
                    <p className="max-w-2xl mx-auto mb-8 md:mb-12 text-lg md:text-xl lg:text-2xl text-gray-100 drop-shadow-md">
                        Visit our shelter or dog profiles.
                        Find your furrever friend today!
                    </p>

                    {/* Hero - CTA button container */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                        
                        {/* Adopt button */}
                        <Link to='/dogs'>
                            <Button
                                variant="accent"
                                size="large"
                                className="group"
                            >
                                <Heart className="w-5 h-5 mr-2 group-hover:fill-current transition-all" />
                                Adopt
                            </Button>
                        </Link>

                        {/* Donate button */}
                        <Link to='/donate'>
                            <Button
                                variant="outline"
                                size="large"
                                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
                            >
                                <HandHeart className="w-5 h-5 mr-2" />
                                Support Our Mission
                            </Button>
                        </Link>
                    </div>




                </div>
            

            </div>
        </section>
    )
}

export default HeroSection;