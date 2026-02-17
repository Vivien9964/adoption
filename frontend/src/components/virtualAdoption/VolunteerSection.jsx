import { useState } from "react";
import VolunteerApplicationModal from "./VolunteerApplicationModal";
import { volunteerOpportunities, upcomingEvents } from "../../data/volunteerData";
import { Calendar, MapPin, Users  } from "lucide-react";



const VolunteerOpportunityCard = ({ opportunity, icon, openModal }) => {

    const IconComponent = icon;

    return (
        // Volunteer opportunity card
        <div 
            key={opportunity.id}
            onClick={openModal}
            className="
                group relative p-8 rounded-3xl cursor-pointer shadow-md
                bg-white border-2 border-gray-100
                hover:border-yellow-300 hover:shadow-xl hover:scale-102
                hover:-rotate-1 transition-all duration-300 overflow-hidden"
        >
            {/* Icon container */}
            <div className="relative mb-6 flex justify-center">
                <div className={`
                    w-20 h-20 flex items-center justify-center shadow-md
                    bg-yellow-100 border-2 border-yellow-200
                    group-hover:bg-yellow-200 group-hover:border-yellow-300
                    rounded-2xl group-hover:scale-110 
                    transition-all duration-300`
                }>

                    <IconComponent 
                        className={`w-10 h-10 mx-auto mb-3 text-yellow-700 group-hover:text-yellow-800 `}
                    />
                
                </div>

            </div>
                
                {/* Title */}
                <h3 className="mb-3 text-2xl font-bold text-gray-800 text-center">
                    {opportunity.title}
                </h3>

                {/* Short description */}
                <p className="relative text-gray-600 text-center text-md leading-relaxed mb-4">
                    {opportunity.description}
                </p>

        </div>   
    )
}


const UpcomingEventCard = ({ event, icon, openModal }) => {
    const IconComponent = icon;
    const progress = (event.volunteersSignedUp / event.volunteersNeeded) * 100;
    const spotsLeft = event.volunteersNeeded - event.volunteersSignedUp;

    return (
        // Main container
        <div className="
                group relative rounded-3xl overflow-hidden
                bg-white border-2 border-gray-100 hover:border-yellow-300
                hover:shadow-xl hover:scale-102 hover:-translate-y-2
                transition-all duration-300 cursor-pointer"
        >
            {/* Header with title and icons */}
            <div className="relative p-6 bg-yellow-200">
                <div className="flex items-center gap-4">
                    {/* Icon conatiner */}
                    <div className="
                        w-14 h-14 flex items-center justify-center rounded-xl shadow-md
                        bg-white group-hover:scale-110 transition-all duration-300"
                    >
                        <IconComponent className="w-7 h-7 text-yellow-700" />
                    </div>

                    {/* Title */}    
                    <h3 className="mb-2 text-xl font-bold text-gray-800">
                        {event.title}
                    </h3>
                </div>

            </div>

            {/* Card content  */}
            <div className="p-3">
                {/* Event description */}
                <p className="mb-8 text-gray-600 text-sm leading-relaxed">
                    {event.description}
                </p>

                {/* Event details -> date, time, location */}
                <div className="space-y-3 mb-4">
                    {/* Date, time */}
                    <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-5 h-5 text-yellow-600" />
                        <div>
                            <p className="font-semibold text-gray-800">{event.date}</p>
                            <p className="text-gray-600">{event.time}</p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-5 h-5 text-yellow-600" />
                        <p className="text-gray-700">{event.location}</p>
                    </div>
                </div>
            </div>


            {/* Progress for volunteers */}
            <div className="mt-2 text-center p-6">

                {/* Spots left */}
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-700">
                            {event.volunteersSignedUp} / {event.volunteersNeeded}
                        </span>
                    </div>
                    <span 
                        className={`
                            text-sm font-bold 
                            ${ spotsLeft <= 3 ? "text-yellow-800" : "text-sky-700"}`
                        }
                    >
                        {spotsLeft} spots left
                    </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className={`
                            h-full rounded-full transition-all duration-500
                            ${
                                progress >= 80 ? "bg-gray-400" 
                                : progress >= 50 ? "bg-yellow-500"
                                : "bg-sky-500"
                            }
                        `}
                        style={{ width: `${progress}%`}}
                    />
                </div>



                {/* CTA button -> sign up to volunteer */}
                <button
                    onClick={openModal}
                    className="
                        mt-6  px-6 py-3 rounded-full
                        bg-yellow-300 hover:bg-yellow-400
                        text-yellow-900 font-bold
                        hover:scale-105 hover:shadow-lg
                        transition-all duration-300"

                >

                Sign up to volunteer

            </button>
            </div>
            
            
        </div>
    )
}









const VolunteerSection = () => {

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedOpportunity, setSelectedOpportunity ] = useState(null);

    // Function to toggle modal based on opportunity
    const handleOpenModal = (opportunity) => {
        setIsModalOpen(true);
        setSelectedOpportunity(opportunity);
    }



    return (
        // Main section container
        <div className="py-16" id="opportunities">
            {/* Inner container with opportunity cards and title */}
            <div className="px-4 max-w-7xl mx-auto">

                {/* Section title and description - General volunteering */}
                <div className="mb-24 text-center">
                    <h2 className="mb-6 text-4xl md:text-5xl text-gray-800 font-bold">
                        Join our volunteer team!
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Can't donate? You can still help! 
                        <br />
                        Every hour you volunteer makes a real difference in a dog's life.
                    </p>
                </div>

                {/* Volunteer opportunity grid for opportunity cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {volunteerOpportunities.map((opportunity) => (
                       <VolunteerOpportunityCard 
                            key={opportunity.id}
                            opportunity={opportunity}
                            icon={opportunity.icon}
                            openModal={() => handleOpenModal(opportunity)}
                        />
                    ))}


                    <VolunteerApplicationModal 
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        opportunity={selectedOpportunity}
                    />

                </div>


                {/* Section title and description - Upcoming events */}
                <div className="my-24 text-center">
                    <h2 className="mb-6 text-4xl md:text-5xl text-gray-800 font-bold">
                    Upcoming events
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Join us at these event as one-time volunteers!
                        <br />
                        Play with the dogs, keep us company!
                    </p>
                </div>

                {/* Upcoming events grid for upcoming event cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        upcomingEvents.map((event) => (
                            <UpcomingEventCard 
                                key={event.id}
                                event={event}
                                icon={event.icon}
                                openModal={() => handleOpenModal(event)}

                            />
                        ))
                    }

                </div>

            </div>

    
        </div>
    )
}


export default VolunteerSection;