import { urgentCareDogs } from "../../data/urgentCareData";
import QuickDonationModal from "./QuickDonationModal";
import DonationSuccessCard from "./DonationSuccessCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { useState } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// Card component used in carousel
const UrgentFeaturedCard = ({ dog, onDonateClick }) => {

    const [ donations, setDonations ] = useState(dog.donationsReceived);
    const progressPercentage = (donations / dog.donationsGoal) * 100;

    return (
        // Main card body
        <>
        <div className="
            flex flex-col h-full w-full rounded-2xl overflow-hidden 
            border-2 border-amber-200 shadow-md hover:shadow-xl
            transition-all duration-300 hover:-translate-y-2"
        >
            
            {/* Image container with badge */}
            <div className="relative aspect-square w-full overflow-hidden">
            
            {/* Urgent badge */}
            <div className="
                absolute top-3 right-3 flex items-center px-4 py-2 rounded-full
                bg-red-500 text-white text-xs font-bold animate-pulse"
            >
                CRITICAL
            </div>
        
                <img 
                    src={dog.image} 
                    alt={`${dog.name}-${dog.breed}`} 
                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
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
            
            {/* CTA buttons */}
            <div className="flex justify-evenly px-4 py-2 gap-4 mb-2">
                <button 
                    onClick={() => onDonateClick(dog)}
                    className="
                    flex-1 px-3 py-2 rounded-xl cursor-pointer
                    bg-amber-300 font-semibold text-yellow-800 text-sm
                    hover:bg-amber-400 hover:scale-105 active:scale-95
                    transition-all duration-300
                    "
                >
                Donate to {dog.name}
                </button>

                <button className="
                px-3 py-1 rounded-xl cursor-pointer
                bg-gray-300 font-black text-gray-700 text-sm
                hover:bg-gray-400 transition-colors duration-300
                "
                
                >
                    Share
                </button>

            </div>
        </div>           
        </>
    )
}


// Main component used in Virtual adoption page
const UrgentFeaturedCarousel = ({ onDonateClick }) => {

    return (

    <>
        <div className="w-full px-8">

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={true}
                loop={true}
                autoplay={{ 
                    delay: 2000, 
                    disableOnInteraction: false, 
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                }}
                className="py-8"
            >
                {urgentCareDogs.map((dog) => (
                    <SwiperSlide key={dog.id}>
                        <UrgentFeaturedCard 
                            dog={dog}
                            onDonateClick={onDonateClick} 
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>

          
    </>
    )
}

export default UrgentFeaturedCarousel;