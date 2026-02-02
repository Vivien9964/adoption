import UrgentFeaturedCarousel from "./UrgentFeaturedCarousel";
import Section from "../layout/Section";
import UrgentCardGrid from "./UrgentCardGrid";
import { Activity } from 'lucide-react';


const UrgentNeedsSection = () => {
    return (
        // Main section container
        <Section padding="normal">
            
            {/* Urgent featured donations container with badge and carousel */}
            <div className="mb-8">
        
                {/* Badge */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full shadow-lg">
                        <Activity className="h-5 w-5 animate-pulse" />
                        <span className="font-bold text-sm uppercase tracking-wide">Critical</span>
                    </div>
                </div>
                
                {/* Title & Description */}
                <h2 className="text-3xl font-black text-gray-800 mb-2">
                    Dogs That Need Help Right Now
                </h2>
                <p className="mb-4 text-lg text-gray-600 max-w-2xl">
                    Every lei brings them closer to recovery. 
                </p>

                {/* Carousel */}
                <UrgentFeaturedCarousel />
            </div>

            {/* Standard care donations container */}
            <div className="flex flex-col gap-4">
                <h3>A little push to find a home</h3>
                {/* Standard donations card grid witg cards*/}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UrgentCardGrid />
                    <UrgentCardGrid />
                    <UrgentCardGrid />
                </div>

                <button className="mt-6 max-w-md m-auto rounded-full bg-sky-200">Show all cases</button>
            </div>

            

     


        </Section>


    
    )
}

export default UrgentNeedsSection;