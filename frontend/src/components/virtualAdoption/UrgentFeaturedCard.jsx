import { useState } from "react";
import { urgentCareDogs } from "../../data/urgentCareData";
import { HeartPulse } from 'lucide-react';


const UrgentFeaturedCard = () => {

    const dog = urgentCareDogs[0];
    const [ donations, setDonations ] = useState(dog.donationsReceived);
    const progressPercentage = (donations / dog.donationsGoal) * 100;

    const addDonation = (amount) => {
        setDonations(prev => Math.min(prev + amount, dog.donationsGoal))
    }

    return (
        // Main card body
        <div className="m-16 flex-shrink-0 w-80 rounded-lg overflow-hidden bg-yellow-600">
            
            {/* Image container */}
            <div className="relative h-64 w-full overflow-hidden">
                <img 
                    src={dog.image} 
                    alt={`${dog.name}-${dog.breed}`} 
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Urgent care data - condition, story, progress */}
            <div className="bg-gray-300 p-3">

                <div className="flex gap-2 items-center">
                    <HeartPulse className="h-6 w-6 text-yellow-900 font-black" />
                    <h1 className="font-bold text-xl">{dog.name}</h1>
                </div>

                <div className="bg-red-200 rounded-xl p-2">
                    <p>{dog.condition}</p>
                </div>

                <p>{dog.description}</p>

                <div className="mb-3">
                    <div className="mb-1 flex justify-between text-sm text-gray-600">
                        <span>{donations}</span>
                        <span>{dog.donationsGoal}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-gray-200">
                        <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%`}}></div>
                    </div>

                </div>

            </div>
            <div className="flex gap-2 mt-4">
                <button 
                onClick={() => addDonation(50)}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                +$50
                </button>
                <button 
                onClick={() => addDonation(100)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                +$100
                </button>
                <button 
                onClick={() => addDonation(250)}
                className="bg-green-700 text-white px-3 py-1 rounded text-sm"
                >
                +$250
                </button>
                <button 
                onClick={() => setDonations(dog.donationsReceived)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                Reset
                </button>
            </div>

        </div>
    )
}

export default UrgentFeaturedCard;