import { useState } from "react";
import HeroDonations from "../components/virtualAdoption/HeroDonations";
import UrgentNeedsSection from "../components/virtualAdoption/UrgentNeedsSection";
import ShelterProjectsSection from "../components/virtualAdoption/ShelterProjectsSection";
import DonationStatsSection from "../components/virtualAdoption/DonationStatsSection";
import QuickDonationModal from "../components/virtualAdoption/QuickDonationModal";
import DonationSuccessCard from "../components/virtualAdoption/DonationSuccessCard";

const VirtualAdoptionPage = () => {

    // State to keep track of which section to show 
    const [ selectedSection, setSelectedSection ] = useState();
    
    // State variables for donation modal
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedTarget, setSelectedTarget ] = useState(null);
    const [ isMonthly, setIsMonthly ] = useState(false);

    // State variables for success card 
    const [ isSuccessCardOpen, setIsSuccessCardOpen ] = useState(false);
    const [ donationAmount, setDonationAmount ] = useState(0);

    // Function to open donation modal and set selected target
    const openDonationModal = (target) => {
        setSelectedTarget(target);
        setIsModalOpen(true);
    }

    // Function to open success message and set donation amount
    const handleDonationSuccess = (amount, isMonthly) => {
        setDonationAmount(amount);
        setIsModalOpen(false);
        setIsSuccessCardOpen(true);
        setIsMonthly(isMonthly);
    }


    return (
        <>
            {/* Hero section */}
            <HeroDonations />

            {/* Navigation to show more sections */}
            <div className="bg-white sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-center">
                        <div className="inline-flex p-1 gap-3 bg-gray-100 rounded-full">

                            {/* Urgent donations  */}
                            <button
                                    onClick={() => setSelectedSection("urgent")}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                        selectedSection === "urgent"
                                            ? "bg-white text-amber-600 shadow-md"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    Urgent Care
                            </button>

                            
                            {/* Shelter donations */}
                            <button
                                    onClick={() => setSelectedSection("projects")}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                        selectedSection === "projects"
                                            ? "bg-white text-amber-600 shadow-md"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                 Shelter Projects   
                            </button>
                            

                            {/* Donation breakdown, donor impact */}
                            <button
                                    onClick={() => setSelectedSection("stats")}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                        selectedSection === "stats"
                                            ? "bg-white text-amber-600 shadow-md"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    YOUR impact
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* Main content container */}
            <div className="min-h-screen">

                {/* Show urgent donations section when urgent tab is selected */}
                {selectedSection === "urgent" && (
                    <div className="animate-fadeIn">
                        <UrgentNeedsSection onDonateClick={openDonationModal} />
                    </div>
                )}

                {/* Show shelter donations when projects tab is selected */}
                {selectedSection === "projects" && (
                    <div className="animate-fadeIn">
                        <ShelterProjectsSection onDonateClick={openDonationModal} />
                    </div>
                )}

                {/* Show donor impact when stats tab is selected */}
                {selectedSection === "stats" && (
                    <div className="animate-fadeIn">
                        <DonationStatsSection />
                    </div>
                )}
                
            </div> 

            
            {/* Donation modal when users want to donate - pop up */}
            <QuickDonationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                target={selectedTarget}
                onSuccess={handleDonationSuccess}
            />

            {/* Donation success card */}
            <DonationSuccessCard 
                isOpen={isSuccessCardOpen}
                onClose={() => setIsSuccessCardOpen(false)}
                amount={donationAmount}
                target={selectedTarget}
                isMonthly={isMonthly}           
            />


        </>
        
    )
}

export default VirtualAdoptionPage;