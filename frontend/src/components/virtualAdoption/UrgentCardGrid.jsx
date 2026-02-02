import { useState } from "react";
import { standardUrgentCareDogs } from "../../data/urgentCareData";

const UrgentCardGrid = () => {

    const dog = standardUrgentCareDogs[0];
    const [ donations, setDonations ] = useState(dog.donationsReceived);

    const addDonation = (amount) => {
        setDonations(prev => Math.min(prev + amount, dog.donationsGoal));
    }

    const resetDonation = () => {
        setDonations(dog.donationsReceived);
    }

    return (
        <div className="
            flex flex-col overflow-hidden rounded-2xl 
            border border-sky-200 shadow-md hover:shadow-lg transition-shadow">

             {/* Image container */}
             <div className="relative w-full h-44 overflow-hidden">
                <img 
                    src={dog.image} 
                    alt={`${dog.name}-${dog.breed}`} 
                    className="h-full w-full object-cover"
                />
            </div>
            
            {/* Name and condition with donations */}
            <div className="p-4">
                {/* Name */}
                <h3 className="mb-2 font-bold text-gray-800 text-lg">
                    {dog.name}
                </h3>
                
                {/* Condition */}
                <div className="
                    mb-3 px-3 py-2 mt-2 rounded-full
                    text-center border-l-2 border-r-2 border-sky-500 bg-sky-50"
                >
                    <p className="text-md text-sky-900 font-semibold">{dog.condition}</p>
                </div>

                {/* Donations */}
                <div className="flex items-end gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">{donations}</span>
                    <span className="text-xs text-gray-500 mb-1">/ {dog.donationsGoal} Lei</span>
                </div>
            </div>
            
            {/* CTA buttons */}
            <div className="p-3 flex justify-evenly gap-2">
                <button 
                    className="
                        flex-1 px-3 py-2 rounded-xl cursor-pointer
                        bg-sky-500/80 font-black text-gray-800
                        hover:bg-sky-500 transition-colors duration-200"
                    onClick={() => addDonation(50)}>Donate</button>
                <button 
                    className="
                    px-3 py-1 rounded-xl cursor-pointer
                    bg-gray-300 font-black text-gray-700 text-sm
                    hover:bg-gray-400 transition-colors duration-200"
                    onClick={resetDonation}>Share</button>
            </div>
            

        </div>
    )
}

export default UrgentCardGrid;