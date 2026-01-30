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
        <div className="flex flex-col h-full w-full rounded-xl overflow-hidden border-4 border-amber-500 shadow-xl">
            
            {/* Image container */}
            <div className="relative aspect-square w-full overflow-hidden">
            <div className="
                absolute top-4 left-6 px-3 py-2 rounded-full
                bg-yellow-800 animate-pulse text-white text-md font-black">
                <p>URGENT</p>
            </div>
                <img 
                    src={dog.image} 
                    alt={`${dog.name}-${dog.breed}`} 
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Urgent care data - condition, story, progress */}
            <div className="bg-white p-3 flex-1 flex flex-col">

                <div className="mb-3 flex gap-3 items-center">
                    <HeartPulse className="h-6 w-6 text-amber-700 font-black" />
                    <h1 className="font-bold text-xl text-gray-700">{dog.name}</h1>
                </div>

                <div className="
                    p-2 rounded-full
                    text-center text-md text-gray-700 font-black
                    border-2 border-amber-500
                    ">
                    <p>{dog.condition}</p>
                </div>

                <p className="p-2 text-xs text-gray-600 line-clamp-3">{dog.description}</p>

                <div className="mb-2 p-6 rounded-2xl border-2 border-amber-400">
                    <div className="mb-1 flex justify-between text-sm text-gray-600">
                        <p>Progress</p>
                        <div>
                            <span className="font-black text-lg text-gray-700">{donations}Lei / </span>
                            <span className="text-gray-600 text-xs">{dog.donationsGoal}Lei</span>
                        </div>
                    </div>
                    <div className="w-full h-3 rounded-full bg-gray-200">
                        <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%`}}></div>
                    </div>

                    <div className="mt-2 flex justify-between">
                        <p className="text-xs font-bold text-yellow-900">{progressPercentage.toFixed(0)}% funded!</p>
                        <p className="text-xs font-bold text-gray-600">{dog.donationsGoal - donations}Lei to go!</p>
                    </div>

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