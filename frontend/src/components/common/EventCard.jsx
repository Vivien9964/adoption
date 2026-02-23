import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, PawPrint } from 'lucide-react';

const EventCard = ({ event }) => {

    const navigate = useNavigate();

    const handleVolunteerClick = () => {
        navigate("/virtual-adoption?tab=volunteer");

        setTimeout(() => {
            const element = document.getElementById("opportunities");

            if(element) {
                element.scrollIntoView({ behavior: "smooth", block: "start"});
            }
        }, 300)
    }


    return (
    <div className="
            group relative flex-1 rounded-3xl overflow-hidden
            bg-white border-2 border-gray-100 hover:border-yellow-300
            hover:shadow-xl hover:scale-102 hover:-translate-y-2
            transition-all duration-300 cursor-pointer"
    >
            {/* Header with event name and type */}
            <div className="relative p-6 bg-yellow-200">
                <div className="flex items-center gap-4">

                    {/* Icon container */}
                    <div className="
                        w-14 h-14 flex items-center justify-center rounded-xl shadow-md
                        bg-white group-hover:scale-110 transition-all duration-300"
                    >
                        <CalendarDays className="w-7 h-7 text-yellow-700" />
                    </div>

                    {/* Title and badge */}
                    <div className="flex-1">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-800">
                            {event.eventName}
                        </h3>

                        {/* Event type badge */}
                        <span className="
                            inline-block px-3 py-1 mt-2 rounded-full
                            text-xs text-yellow-900 font-semibold italic
                            bg-yellow-100"
                        >
                            {event.eventType}
                        </span>
                    </div>
                </div>
            </div>

            {/* Card content */}
            <div className="p-6">

                {/* Event description */}
                <p className="mb-6 text-gray-600 text-sm leading-relaxed">
                    {event.eventDescription}
                </p>

                {/* Event details */}
            <div className="space-y-3 mb-6">
                    
                    {/* Date and time */}
                    <div className="flex items-start gap-3">
                        <CalendarDays className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{event.eventDate}</p>
                            <p className="text-xs text-gray-600">{event.eventTime}</p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{event.eventPlace}</p>
                            <p className="text-xs text-gray-600">{event.eventAddress}</p>
                        </div>
                    </div>

                    {/* Contact person */}
                    <div className="flex items-start gap-3">
                        <PawPrint className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{event.contactPerson}</p>
                            <p className="text-xs text-gray-600">{event.phoneNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Special note if there is one */}
                {event.specialNote && (
                    <div className="mb-6 p-4 rounded-xl bg-sky-50 border border-sky-200">
                        <div className="flex items-center gap-3">
                            <PawPrint className="w-5 h-5 text-sky-700 flex-shrink-0" />
                            <p className="text-sm font-semibold italic text-sky-800">
                                {event.specialNote}
                            </p>
                        </div>
                    </div>
                )}

                {/* CTA button */}
                <button
                    onClick={handleVolunteerClick}
                    className="
                        w-full px-6 py-3 rounded-full
                        bg-yellow-300 hover:bg-yellow-400
                        text-yellow-900 font-bold
                        hover:scale-105 hover:shadow-lg
                        transition-all duration-300"
                >
                    I volunteer
                </button>
        </div>

    </div>
);
}


export default EventCard;