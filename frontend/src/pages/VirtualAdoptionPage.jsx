import { useState } from "react";
import HeroDonations from "../components/virtualAdoption/HeroDonations";
import UrgentNeedsSection from "../components/virtualAdoption/UrgentNeedsSection";

const VirtualAdoptionPage = () => {

    const [ selectedSection, setSelectedSection ] = useState();


    return (
        <>
            {/* Hero section */}
            <HeroDonations />

            {/* Navigation to show more sections */}
            <div className="bg-white sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-center">
                        <div className="inline-flex p-1 gap-3 bg-gray-100 rounded-full">
                            <button
                                    onClick={() => setSelectedSection('urgent')}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                        selectedSection === 'urgent'
                                            ? "bg-white text-amber-600 shadow-md"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    Urgent Care
                            </button>

                            <button
                                    onClick={() => setSelectedSection('urgent')}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                        selectedSection === 'urgent'
                                            ? "bg-white text-amber-600 shadow-md"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    Urgent Care
                            </button>
                            
                            <button
                                    onClick={() => setSelectedSection('urgent')}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                        selectedSection === 'urgent'
                                            ? "bg-white text-amber-600 shadow-md"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    Urgent Care
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            <div className="min-h-creen">
                {selectedSection === "urgent" && (
                    <div>
                        <UrgentNeedsSection />
                    </div>
                )}

            </div>





            
        </>
        
    )
}

export default VirtualAdoptionPage;