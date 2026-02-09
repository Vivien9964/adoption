import { useState } from "react";
import { standardUrgentCareDogs } from "../../data/urgentCareData";

const UrgentCardGrid = ({ onDonateClick }) => {

    const dog = standardUrgentCareDogs[0];
    const [ donations, setDonations ] = useState(dog.donationsReceived);

    
    return (
        <div className="
            flex flex-col overflow-hidden rounded-2xl 
            border border-sky-200 shadow-md hover:shadow-lg 
            transition-all duration-300 hover:-translate-y-3"
        >

             {/* Image container */}
             <div className="relative w-full h-44 overflow-hidden">
                <img 
                    src={dog.image} 
                    alt={`${dog.name}-${dog.breed}`} 
                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
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
                    <span className="text-lg font-bold text-gray-900">{donations}Lei</span>
                    <span className="text-xs text-gray-500 mb-1">/ {dog.donationsGoal} Lei</span>
                </div>

                <div className="w-full h-2 rounded-full bg-gray-200 mb-3">
                    <div 
                        className="bg-sky-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${(donations / dog.donationsGoal) * 100}%` }}
                    />
                </div>
            </div>
            
            {/* CTA buttons */}
            <div className="flex justify-evenly px-4 py-2 gap-4">
                <button 
                    className="
                        flex-1 px-3 py-2 rounded-xl cursor-pointer
                        bg-sky-500/80 font-black text-gray-800
                        hover:bg-sky-500 hover:scale-105 active:scale-95
                        transition-all duration-300"
                    onClick={() => onDonateClick(dog)}>
                        Donate
                </button>
                <button 
                    className="
                    px-3 py-1 rounded-xl cursor-pointer
                    bg-gray-300 font-black text-gray-700 text-sm
                    hover:bg-gray-400 transition-colors duration-300"
                    onClick={() => alert("Share feature")}>Share</button>
            </div>
            

        </div>
    )
}

export default UrgentCardGrid;