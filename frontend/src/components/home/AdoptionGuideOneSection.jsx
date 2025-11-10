import Section from '../layout/Section';
import Button from '../common/Button';
import { PawPrint } from 'lucide-react';


const AdoptionGuideOneSection = () => {

    return (
        <Section 
            maxWidth="7-xl"
            padding="large" 
            background="yellow"
        >
            {/* Two column layout container */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-20">
                
                {/* Left column with text and button - Compact 35% width */}
                <div className="w-full md:w-[40%] flex flex-col gap-4">
                    
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-900 leading-tight">
                        Find the purrfect dog for YOU!
                    </h2>

                    {/* Subtitle */}
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                        The first step on your adoption journey should be research.
                        Browse through our available dogs and read about their stories.
                        There is one little soul that matches your personality!
                    </p>

                    <Button variant="primary" size="medium" className="self-start">
                        View Available Dogs
                    </Button>
                </div>

                {/* Right column with image, main container - Large visual content 65% width */}
                <div className="w-full md:w-[60%] flex items-center justify-center mt-6 sm:p-8 md:p-4 lg:p-2">

                    {/* Image and background container*/}
                    <div className="w-full relative sm:max-w-sm md:max-w-lg aspect-square group cursor-pointer">
                        
                        {/* Background */}
                        <div className="
                                absolute inset-0
                                bg-yellow-200 rounded-3xl rotate-12 
                                transition:transform duration-500 
                                group-hover:-rotate-12"></div>

                        {/* Image container */}
                        <div className=" 
                                flex items-center justify-center absolute inset-0 
                                bg-yellow-400 rounded-3xl shadow-2xl overflow-hidden
                                transition-shadow duration-500
                        ">
                            <img 
                                src="/images/AdoptStepOne.jpg" 
                                alt="View dog profiles" 
                                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                            />

                        </div>
                    </div>
                </div>

            </div>        
        
        </Section>
    )
}


export default AdoptionGuideOneSection;