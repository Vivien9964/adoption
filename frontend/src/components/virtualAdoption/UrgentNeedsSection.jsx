import UrgentFeaturedCarousel from "./UrgentFeaturedCarousel";
import Section from "../layout/Section";
import UrgentCardGrid from "./UrgentCardGrid";
import { useDonations } from "../../context/DonationsContext";



const UrgentNeedsSection = ({ onDonateClick }) => {

    const { urgentCasesData, loading } = useDonations();

    const standardCareCases = urgentCasesData.filter((dog) => dog.urgencyLevel === "Medium" || dog.urgenclyLevel === "Low");


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
                    {standardCareCases.map((dog) => (
                        <UrgentCardGrid 
                            key={dog.id}
                            dog={dog}
                            onDonateClick={onDonateClick}
                        />
                    ))}
                  
                </div>
            </div>

        
        </Section>


    
    )
}

export default UrgentNeedsSection;