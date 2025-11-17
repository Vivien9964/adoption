import Button from '../common/Button';
import { CalendarDays } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { PawPrint } from 'lucide-react';





const EventCard = ({ event }) => {


    return (
        <div className="
                flex-1 p-3 md:p-4 lg:p-6 overflow-hidden
                bg-white rounded-xl 
                shadow-lg hover:shadow-xl hover:-translate-y-2
                transition-all duration-400 
                cursor-pointer"
        >

            {/* Header  */}
            <div className="
                    w-full p-2 md:p-4 lg:p-6 
                    bg-yellow-400 rounded-lg"
            >
                {/* Event type badge */}
                <span className="
                        inline-block px-4 py-2 my-1 rounded-full
                        text-xs text-yellow-900 font-semibold italic
                        bg-yellow-100"
                >
                    {event.eventType}
                </span>

                {/* Event name */}
                <h1 className="
                        mt-4 md:mt-6 lg:mt-8 
                        text-lg lg:text-xl text-yellow-900"
                >
                    {event.eventName}
                </h1>
            </div>   

            {/* Event description */}
            <div className="p-4">
                <p className="text-md">
                {event.eventDescription}
                </p>  
            </div>   


            {/* Event details */}    
            <div className="flex flex-col p-4 gap-2">
                
                {/* Date icon with date and time */}
                <div className="flex flex-1 gap-3">
                    {/* Date icon */}
                    <CalendarDays size={20} color={"orange"} />

                    {/* Text content */}
                    <div className="flex flex-col">
                    <h3 className="text-md font-semibold text-gray-700">{event.eventDate}</h3>
                    <p className="text-sm text-yellow-800">
                        {event.eventTime}
                    </p>
                    </div>
                </div>

                {/* Map icon with event place details */}
                <div className="flex flex-1 gap-3">
                    {/* Map icon */}
                    <MapPin size={20} color={"orange"} />

                    {/* Text content */}
                    <div className="flex flex-col">
                    <h3 className="text-md font-semibold text-gray-700">{event.eventPlace}</h3>
                    <p className="text-sm text-yellow-800">
                        {event.eventAddress}
                    </p>
                    </div>

                </div>

                {/* Paw icon with special note, if there is one */}
                {event.specialNote && (

                    <div className="flex flex-1 gap-3 justify-center border-1 rounded-full p-4 mt-3 bg-sky-100/50">
                        {/* Map icon */}
                        <PawPrint size={22} color={"orange"} />

                        {/* Text content */}
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold italic text-yellow-700">{event.specialNote}</p>
                        </div>
                    
                </div>

                )}
            </div>

            {/* Contact person */}
            <div className="my-3">
                <p>Contact: {event.contactPerson}</p>
                <p className="text-md lg:text-sm italic text-gray-600">{event.phoneNumber}</p>
            </div>

            <div className="flex justify-center align-center mt-4">
                <Button variant="primary" href={"/volunteer"} >
                    I Volunteer
                </Button>
            </div>


        </div>
    )
}


export default EventCard;