// Creating one reusable component for adoption guide, instead of using two, almost identical
// components
// Based on the individual component that I've built earlier, I can take the data that is needed
// like title, description etc.

import Section from '../layout/Section';
import Button from '../common/Button';


const AdoptionGuideSection = ({ 
        title, 
        description, 
        buttonText,
        buttonHref, 
        imageSrc, 
        imageAlt, 
        reversed=false, 
        backgroundColor="yellow", 
        decorationColor="bg-yellow-200"
    }) => {

    return (
        <Section maxWidth="7xl" padding="normal" background={backgroundColor}>
            
            {/* Layout container */}
            <div className={`
                flex flex-col items-center gap-8 md:gap-16 lg:gap-20
                ${reversed ? "md:flex-row-reverse" : "md:flex-row"}    
            `}>

                {/* Text Content with 40% width */}
                <div className="w-full md:w-[40%] flex flex-col gap-4">

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-900 leading-tight">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                        {description}
                    </p>

                    {/* CTA button */}
                    <Button variant="primary" size="medium" className="self-start" href={buttonHref}>
                        {buttonText}
                    </Button>
                </div>

                {/* Image content 60% width */}
                <div className="w-full md:w-[60%] flex items-center justify-center">

                    {/* Image and decor background container */}
                    <div className="w-3/4 sm:w-2/3 md:w-full md:max-w-lg relative mt-2 aspect-square group cursor-pointer">

                        {/* Background */}
                        <div className={`
                            absolute inset-0 opacity-50
                            ${decorationColor} rounded-3xl rotate-12
                            group-hover:-rotate-12 transition-transform duration-500`
                        }></div>

                        {/* Image container */}
                        <div className="
                                flex items-center justify-center absolute inset-0
                                bg-yellow-400 rounded-3xl shadow-2xl overflow-hidden
                                transition-shadow duration-500"
                        >
                        
                        {/* Image */}
                        <img 
                            src={imageSrc} 
                            alt={imageAlt}
                            className="
                                w-full h-auto object-cover
                                group-hover:scale-105 transition-transform duration-500"
                        />

                        </div>
                    </div>


                </div>


            </div>



        </Section>
    )
}

export default AdoptionGuideSection;