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
        <div className="flex flex-col overflow-hidden border-4 border-sky-500/80 rounded-2xl shadow-xl">
             {/* Image container */}
             <div className="relative w-full h-48 overflow-hidden">
                <img 
                    src={dog.image} 
                    alt={`${dog.name}-${dog.breed}`} 
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-2">
                <h2 className="font-black text-gray-800 text-xl">{dog.name}</h2>
                <div className="px-3 py-2 mt-2 text-center border-2 border-sky-500 rounded-full">
                    <p className="text-md text-gray-600 font-black">{dog.condition}</p>
                </div>
                <p className="mt-2 text-xl font-black text-gray-800">{donations}Lei / <span className="text-xs text-gray-600 font-black">{dog.donationsGoal}Lei</span>
                </p>
            </div>

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