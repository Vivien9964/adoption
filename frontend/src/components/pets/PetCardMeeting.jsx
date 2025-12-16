import { MapPin } from 'lucide-react';
import { useState } from 'react';

const PetCardMeeting = ({ dog }) => {

    const [ isSelected, setIsSelected ] = useState(false);

    // Function to toggle selected state for now
    const toggleSelected = () => {
        setIsSelected(!isSelected);
    }

    return (
        // Main container
        <div 
            onClick={toggleSelected}
            className='
                p-3 rounded-xl bg-sky-50 cursor-pointer border-3 border-sky-200 shadow-lg 
                hover:-rotate-3 hover:bg-gray-200/50 transition-all duration-300'
        >
            {/* Image + Name + Breed container */}
            <div className='flex flex-row items-center gap-3' >
                {/* Image container */}
                <div className='h-20 w-20 rounded-full border-4 border-white shadow-xl overflow-hidden'>
                    <img src={dog.mainImage} className='h-full w-full object-cover' alt={`${dog.name} - ${dog.breed}`} />
                </div>

                {/* Name and breed container */}
                <div>
                    <h2 className='mb-1 text-gray-700 font-bold text-xl md:text-3xl'>{dog.name}</h2>
                    <p className='text-gray-500 text-sm'>{dog.breed}</p> 
                </div>
            </div>

            {/* Badges container -> from PetCardDogsPage component */}
            <div className='flex flex-1 flex-wrap gap-2 mt-4'>
                    <span className='px-3 py-1.5 flex items-center gap-1 bg-yellow-200 text-yellow-900 rounded-full text-xs font-bold border-2 border-yellow-300'>
                        <MapPin className='w-3 h-3' />
                        {dog.location}
                    </span>

                    <span className={ `rounded-xl px-2 py-1 border-2
                            ${isSelected 
                                ? `block bg-amber-100 text-yellow-900 text-sm` 
                                : 'hidden'
                            }`}
                    >

                        Selected

                    </span>

            </div>
            
        </div>
    )

}


export default PetCardMeeting;