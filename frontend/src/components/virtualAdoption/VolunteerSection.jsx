import { useState } from "react";
import VolunteerApplicationModal from "./VolunteerApplicationModal";
import { volunteerOpportunities } from "../../data/volunteerData";

const VolunteerSection = () => {

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedOpportunity, setSelectedOpportunity ] = useState(null);

    const handleOpenModal = (opportunity) => {
        setIsModalOpen(true);
        setSelectedOpportunity(opportunity);
    }




    return (
        // Main section container
        <div className="py-16">
            {/* Inner container with opportunity cards and title */}
            <div className="px-4 max-w-7xl mx-auto">

                {/* Section title and description */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-4xl md:text-5xl text-gray-800 font-bold">
                        Join our volunteer team!
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Can't donate? You can still help! 
                        <br />
                        Every hour you volunteer makes a real difference in a dog's life.
                    </p>
                </div>

                {/* Volunteer opportunity grid for opportunity cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {volunteerOpportunities.map((opportunity) => {
                        const IconComponent = opportunity.icon;


                        return (
                            <div 
                                key={opportunity.id}
                                onClick={() => handleOpenModal(opportunity)}
                            >
                                
                                <div className={`p-6 text-center ${opportunity.iconBg}`}>
                                    <IconComponent 
                                        className={`w-16 h-16 mx-auto mb-3 ${opportunity.iconColor}`}
                                    />
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {opportunity.title}
                                    </h3>
                                </div>

                            </div>

                            
                        )
                    })}


                    <VolunteerApplicationModal 
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        opportunity={selectedOpportunity}
                    />

                </div>

            </div>

    
        </div>
    )
}


export default VolunteerSection;