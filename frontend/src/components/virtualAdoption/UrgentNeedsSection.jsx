import UrgentFeaturedCarousel from "./UrgentFeaturedCarousel";
import Section from "../layout/Section";
import UrgentCardGrid from "./UrgentCardGrid";
import { Activity } from 'lucide-react';


const UrgentNeedsSection = ({ onDonateClick }) => {
    return (
        // Main section container
        <Section padding="small">
            
            {/* Urgent featured donations container with badge and carousel */}
            <div className="mb-8 p-4">

            {/* Title */}
            <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-yellow-400">Critical</span>{" "}
                    <span className="text-yellow-900">Cases</span>
                </h2>
                <p className="mt-4 text-lg text-gray-600 font-light">
                    Dogs that need help right now
                 </p>
        
                {/* Badge */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full shadow-lg">
                        <Activity className="h-5 w-5 animate-pulse" />
                        <span className="font-bold text-sm uppercase tracking-wide">Critical</span>
                    </div>
                </div>
            </div>

                {/* Carousel */}
                <UrgentFeaturedCarousel onDonateClick={onDonateClick} />
            </div>

            {/* Standard care donations container */}
            <div className="flex flex-col gap-4">
                {/* Title */}
                <div className="mb-8 text-center">  
                    <h3 className="text-3xl font-bold text-yellow-900">    
                        <span className="text-yellow-400">
                            Standard
                        </span>  Cases
                    </h3>  
                    <p className="mt-2 text-gray-600">
                        A little push to full recovery
                    </p>
                </div>

                {/* Standard donations card grid witg cards*/}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UrgentCardGrid onDonateClick={onDonateClick} />
                    <UrgentCardGrid onDonateClick={onDonateClick} />
                    <UrgentCardGrid onDonateClick={onDonateClick} />
                    <UrgentCardGrid onDonateClick={onDonateClick} />
                  
                </div>
            </div>

        
        </Section>


    
    )
}

export default UrgentNeedsSection;