import { Calendar, Clock, MapPin, UserRound, Dog } from 'lucide-react';
import { useMeeting } from "../../context/MeetingContext";


const StepConfirmation = () => {

    const { selectedDog, selectedDate, selectedTime, userInfo } = useMeeting();
  


    const goodToKnow = [
        { id: 1, label: "Come 5-10 minutes earlier"},
        { id: 2, label: "Bring a valid ID card"},
        { id: 2, label: `You will have 600 minutes to play with ${selectedDog.name} `},
        { id: 3, label: "The more the better, you can bring up to 3 more people with you"},
        { id: 4, label: "Our staff will be more than happy to answer your questions"}
    ];

    return (
        <div className="flex flex-col items-center justify-center px-16 py-18 md:px-18 md:py-20 mt-4 border-3 border-yellow-300 rounded-xl bg-white">

            <h1>Meeting Confirmed!</h1>
            <p>We are excited for you to meet {selectedDog.name}! A confirmation was sent to {userInfo.email}</p>

            {/* Meeting details card */} 
            <div className="p-4 gap-4 flex items-center flex-col mt-6 border-2 border-yellow-300 rounded-xl sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px]">
                
                {/* Details title */}
                <h2>Meeting details</h2>

                {/* Selected dog card */}
                {/* Image + Name + Breed container */}
                <div className='w-full flex flex-col self-start'>
                    <p>You are meeting with:</p>
                <div className="p-3 mt-2 flex flex-row justify-self items-center gap-3 border-3 border-yellow-300 rounded-xl" >
                    {/* Image container */}
                    <div className="h-20 w-20 rounded-full border-4 border-white shadow-xl overflow-hidden">
                        <img src={selectedDog.mainImage} className='h-full w-full object-cover' alt={`${selectedDog.name} - ${selectedDog.breed}`} />
                    </div>

                    {/* Name and breed container */}
                    <div>
                        <h2 className="mb-1 text-gray-700 font-bold text-md md:text-lg">{selectedDog.name}</h2>
                        <p className="text-gray-500 text-sm">{selectedDog.breed}</p> 
                    </div>
                </div>
                </div>

                {/* Meeting date and time  */}
                {/* When to meet section -> date */}
                <div className="mt-3 flex flex-col gap-3 w-full ">
                    <div className="px-3 py-1 flex items-center justify-between gap-2 border-2 border-sky-400/30 rounded-lg">
                        <div className="flex flex-row gap-2">
                            <Calendar className="h-5 w-5 text-yellow-600" />
                            <p className="text-gray-600 text-md">Date</p>
                        </div>
                        <span className="text-gray-800 font-bold text-lg">{selectedDate}</span>
                    </div>
                    
                    {/* When to meet section -> time */}
                    <div className="px-3 py-1 flex items-center justify-between gap-2 border-2 border-sky-400/30 rounded-lg">
                        <div className="flex flex-row gap-2">
                            <Clock className="h-5 w-5 text-yellow-600" />
                            <p className="text-gray-600 text-md">Time</p>
                        </div>
                        <span className="text-gray-800 font-bold text-lg">{selectedTime}:00</span>
                    </div>

                    {/* Where to meet section -> based on dog data = location + shelter for now, later -> shelter name with address */}
                    <div className="px-3 py-1 flex items-center justify-between gap-2 border-2 border-sky-400/30 rounded-lg">
                        <div className="flex flex-row gap-2">
                            <MapPin className="h-5 w-5 text-yellow-600" />
                            <p className="text-gray-600 text-md">Location</p>
                        </div>
                        <div>
                        <span className="text-gray-800 font-bold text-lg">{selectedDog.location} Shelter</span>
                        <p className="mt-2 text-sm text-gray-500 italic">Address, Arad 12</p>
                        </div>
                    </div>


                     {/* Contact info section */}
                     <div className="px-3 py-1 flex flex-row justify-between items-center gap-2 border-2 border-sky-400/30 rounded-lg">
                        <div className="flex flex-row items-center gap-2">
                            < UserRound className="h-5 w-5 text-yellow-600" />
                            <p className="text-gray-600 text-md">Contact</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-gray-700 font-bold text-sm">{userInfo.name}</span>
                            <span className="text-gray-600 italic text-sm">{userInfo.email}</span>
                            <span className="text-gray-600 italic text-sm">{userInfo.phone}</span>
                        </div>
                    </div>

                </div>


                {/* Good to know section - main container */}
                <div className="bg-sky-100 p-8 rounded-lg">

                    {/* Good to know title container*/}
                    <div className="flex items-center gap-2">
                        <div className="bg-yellow-400 rounded-full p-2">
                            <Dog className='w-8 h-8 text-yellow-800 drop-shadow-sm' />
                        </div>
                        <h2>Good to know</h2>
                    </div>

                    {/* Good to know content container */}
                    <div className="mt-4 flex flex-col gap-2">

                      { goodToKnow.map((fact) => (
                        <span 
                            key={fact.id}
                            className="text-sm text-gray-700"
                        >
                                {fact.label}
                        </span>
                      ))}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default StepConfirmation;