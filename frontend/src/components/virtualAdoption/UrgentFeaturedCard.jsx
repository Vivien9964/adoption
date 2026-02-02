import { useState } from "react";
import { HeartPulse } from 'lucide-react';


const UrgentFeaturedCard = ({ dog }) => {

    const [ donations, setDonations ] = useState(dog.donationsReceived);
    const progressPercentage = (donations / dog.donationsGoal) * 100;

    const addDonation = (amount) => {
        setDonations(prev => Math.min(prev + amount, dog.donationsGoal))
    }

    return (
        // Main card body
        <>
        <div className="
            flex flex-col h-full w-full rounded-2xl overflow-hidden 
            border border-amber-200 shadow-md hover:shadow-xl transition-shadow"
        >
            
            {/* Image container */}
            <div className="relative aspect-square w-full overflow-hidden">

            <div className="
                absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full
                bg-red-500 text-white text-xs font-bold animate-pulse"
            >
                CRITICAL
            </div>
        
                <img 
                    src={dog.image} 
                    alt={`${dog.name}-${dog.breed}`} 
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Urgent care data - condition, story, progress */}
            <div className="bg-white p-5 flex-1 flex flex-col">

                {/* Name */}
                <h1 className="mb-3 font-bold text-xl text-gray-700">{dog.name}</h1>
                

                {/* Condition */}
                <div className="
                    px-3 py-2 mb-3 rounded-full
                    text-center text-md text-gray-700 font-black
                    border-l-2 border-r-2 border-amber-500 bg-amber-50
                    ">
                    <p className="text-md font-semibold text-amber-900">{dog.condition}</p>
                </div>

                {/* Condition description */}
                <p className="mb-4 text-xs text-gray-600 line-clamp-3">{dog.description}</p>

                {/* Donation progress section */}
                <div className="mt-auto p-6 rounded-2xl border-2 border-amber-400">

                    <div className="flex justify-between mb-2 text-sm">
                            <span className="font-black text-lg text-gray-700">{donations}Lei</span>
                            <span className="text-gray-500">{progressPercentage.toFixed(0)}%</span>
                    </div>


                    <div className="w-full h-2 rounded-full bg-gray-100">
                        <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%`}}></div>
                    </div>

                    <p className="mt-1 text-xs font-bold text-gray-600">{dog.donationsGoal - donations}Lei to go!</p>
                

                </div>

            </div>

            <div className="flex justify-evenly p-2 gap-2 mb-2">
                <button 
                    onClick={() => addDonation(50)}
                   className="
                    flex-1 px-3 py-2 rounded-xl cursor-pointer
                    bg-amber-400 font-black text-yellow-800 text-sm
                    hover:bg-amber-500 transition-colors duration-200
                    "
                >
                Donate to {dog.name}
                </button>

                <button className="
                px-3 py-1 rounded-xl cursor-pointer
                bg-gray-300 font-black text-gray-700 text-sm
                hover:bg-gray-400 transition-colors duration-200
                "
                
                >
                    Share
                </button>

            </div>

        </div>
        </>
    )
}

export default UrgentFeaturedCard;