
import { Link } from 'react-router-dom';
import { Heart} from 'lucide-react';
import Button from '../common/Button';


const PetCardCarousel = ({ pet }) => {

    return (
        // Component body is a link, since the user can just click on the card itself and 
        // go to the individual profile - link acts as a wrapper
        <Link 
            to={`/dogs/${pet.id}`}
            className="block group h-full"    
        >
            {/* Card container */}
            <div className="
                    h-full rounded-2xl overflow-hidden
                    bg-white shadow-lg hover:shadow-2xl border-3 border-yellow-200
                    transition-all duration-300 hover:-translate-y-1"
            >
               
               {/* Image conatiner with image + badge + view profile cta */}
               <div className="relative aspect-square overflow-hidden">
                    <img 
                        src={pet.image}
                        alt={`${pet.name}-${pet.breed}`}
                        className="
                            w-full h-full object-cover 
                            group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Featured Badge */}
                    <div className="
                            absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full
                            text-white text-xs font-semibold bg-amber-500 shadow-lg"
                    >
                        <Heart className="w-3 h-3 fill-current" />
                        Featured
                    </div>

                    {/* Overlay for hover effect */}
                    <div className="
                            absolute inset-0 flex items-center justify-center pb-6
                            bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0
                            group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <Button variant="primary" size="large">
                            View Profile
                        </Button>

                    </div>
               </div>

               {/* Pet information card section */}
               <div className="p-5">

                { /* Name */}
                <h3 className="mb-4 text-center text-2xl font-semibold text-yellow-900">
                    {pet.name}
                </h3>

                {/* Information badges - container with grid */}
                <div className="grid grid-cols-2 gap-2">

                    {/* Breed */}
                    <div className="px-3 py-2 rounded-lg text-center text-sm font-semibold text-sky-800 bg-sky-100">
                        {pet.breed}
                    </div>

                     {/* Gender - styling changes based on gender */}
                    {pet.gender && (
                        <div className={`px-3 py-2 rounded-lg text-center text-sm font-semibold ${
                            pet.gender.toLowerCase() === "male"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-pink-100 text-pink-800"
                        }`}>
                            {pet.gender}
                        </div>
                    )}

                     {/* Size */}
                     <div className="px-3 py-2 rounded-lg text-center text-sm font-semibold text-yellow-800 bg-yellow-100">
                        {pet.size}
                    </div>

                     {/* Age */}
                     <div className="px-3 py-2 rounded-lg text-center text-sm font-semibold text-amber-800 bg-amber-100">
                        {pet.age === 1 ? `${pet.age} year` : `${pet.age} years`}
                    </div>
                </div>


               </div>
                
            </div>
        </Link>
    )
}

export default PetCardCarousel;