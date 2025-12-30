
import { Link } from 'react-router-dom';
import { Star, MapPin} from 'lucide-react';
import Button from '../common/Button';


const PetCardCarousel = ({ pet }) => {

    return (
        // Component body is a link, since the user can just click on the card itself and 
        // go to the individual profile - link acts as a wrapper
        <Link 
            to={`/dogs/${pet.id}`}
            className="block group h-full rounded-xl"    
        >
            {/* Card container */}
            <div className="
                    h-full rounded-2xl overflow-hidden
                    bg-white shadow-xl hover:shadow-2xl
                    transition-all duration-300 hover:-translate-y-1"
            >
               
               {/* Image conatiner with image + badge + view profile cta */}
               <div className="relative aspect-square overflow-hidden">
                    <img 
                        src={pet.mainImage}
                        alt={`${pet.name}-${pet.breed}`}
                        className="
                            w-full h-full object-cover
                            group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Featured Badge */}
                    <div className="
                            absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full
                            text-yellow-800 text-xs font-semibold bg-yellow-300 shadow-lg"
                    >
                        <Star className="w-3 h-3 fill-current" />
                        Star Pup
                    </div>

                    {/* Overlay for hover effect */}
                    <div className="
                            absolute inset-0 flex items-center justify-center pb-6
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <Button variant="primary" size="large" className="cursor-pointer">
                            View Profile
                        </Button>

                    </div>
               </div>

               {/* Pet information card section */}
               <div className="p-5">

                { /* Name */}
                <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
                    {pet.name}
                </h3>

                {/* Information badges - container with grid */}
                <div className="grid grid-cols-2 gap-2">

                    {/* Breed */}
                    <div className="
                        px-2 py-2 rounded-2xl border-2 border-gray-700
                        text-center text-sm font-semibold text-gray-800 bg-yellow-200"
                    >
                        {pet.breed}
                    </div>

                     {/* Size */}
                     <div className="
                        px-2 py-2 rounded-2xl text-center text-sm font-semibold text-gray-800 
                        bg-yellow-200 border-2 border-gray-700"
                    >
                        {pet.size}
                    </div>

                     {/* Age */}
                     <div className="
                        px-2 py-2 rounded-2xl text-center text-sm font-semibold text-gray-800
                        bg-yellow-200 border-2 border-gray-700"
                    >
                        {pet.age === 1 ? `${pet.age} year` : `${pet.age} years`}
                    </div>

                    {/* Location */}
                    <div className="
                        flex justify-center items-center gap-2 px-3 py-2 rounded-2xl 
                        text-center text-sm font-semibold text-gray-800 
                        bg-yellow-200 border-2 border-gray-700">
                        <MapPin className="h-5 w-5 text-gray-800" />
                        {pet.location}
                    </div>


                </div>


               </div>
                
            </div>
        </Link>
    )
}

export default PetCardCarousel;