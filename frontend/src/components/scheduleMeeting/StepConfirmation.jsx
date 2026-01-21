import { Calendar, Clock, MapPin, UserRound, Dog, Mail, Phone } from 'lucide-react';
import { useMeeting } from "../../context/MeetingContext";


const StepConfirmation = () => {

    const { selectedDog, selectedDate, selectedTime, userInfo, isSubmitted } = useMeeting();
  


    // Flag field helps to differentiate facts -> Before Arrival(BA) and During Visit(DV)
    const goodToKnow = [
        { id: 1, label: "Come 5-10 minutes earlier", flag: "BA"},
        { id: 2, label: "Bring a valid ID card", flag: "BA"},
        { id: 3, label: `You will have 60 minutes to play with ${selectedDog.name} `, flag: "DV"},
        { id: 4, label: "The more the better, you can bring up to 2 more people with you", flag: "BA"},
        { id: 5, label: "You can bring toys, food, anything that would make the meeting better", flag: "DV"}
    ];

    const beforeArrival = goodToKnow.filter((fact) => fact.flag === "BA");
    const duringVisit = goodToKnow.filter((fact) => fact.flag === "DV");

    return (
        <div className="
            flex flex-col items-center justify-center px-16 py-8 md:px-18 md:py-10 mt-4 rounded-xl bg-sky-50/50"
        >


            {/* Meeting details card */} 
            <div className="p-6 gap-4 flex items-center flex-col mt-6 shadow-xl/30 rounded-xl bg-white sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px]">
                
                {/* Details title */}
                <div className="
                    w-full mt-0 flex flex-col justify-center items-center gap-2 rounded-xl h-30 
                    bg-yellow-300"
                >
                    <h2 className="font-black text-xl text-yellow-900">Review your meeting!</h2>

                    { isSubmitted ? (
                        <>
                            <h1>Meeting confirmed!</h1>
                            <p>We are excited for you to meet {selectedDog.name}! A confirmation was sent to {userInfo.email}</p>

                        </>
                    ) : (
                        <p className="text-center text-xs text-gray-600 font-medium">One step away from meeting <span className="text-yellow-800 font-black">{selectedDog.name}</span>!</p>
                    )}

                </div>

                {/* Selected dog card */}
                {/* Image + Name + Breed container */}
                <div className='w-full flex flex-col self-start'>
                <div className="
                    p-3 mt-2 flex flex-row justify-center items-center gap-3 rounded-xl
                    border-2 border-sky-200 shadow-sm bg-sky-50" 
                >
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
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">

                    {/* When to meet section -> date */}
                    <div className="min-h-[50px] px-3 py-3 flex flex-row gap-2 border-2 border-sky-400/30 rounded-lg">
                        <div className="self-start p-1 rounded-xl bg-yellow-300">
                            <Calendar className="m-2 h-5 w-5 text-yellow-800" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-600 text-md">Date</p>
                            <span className="text-gray-800 font-bold text-md">{selectedDate}</span>
                        </div>
                    </div>
                    
                    {/* When to meet section -> time */}
                    <div className="min-h-[50px] px-3 py-3 flex flex-row gap-2 border-2 border-sky-400/30 rounded-lg ">
                    <div className="self-start p-1 rounded-xl bg-yellow-300">
                            <Clock className="m-2 h-5 w-5 text-yellow-800" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-600 text-md">Time</p>
                            <span className="text-gray-800 font-bold text-md">{selectedTime}:00</span>
                        </div>
                    </div>

                    {/* Where to meet section -> based on dog data = location + shelter for now, later -> shelter name with address */}
                    <div className="px-3 py-3 flex flex-row gap-2 border-2 border-sky-400/30 rounded-lg">
                        <div className="self-start p-1 rounded-xl bg-yellow-300">
                            <MapPin className="m-2 h-5 w-5 text-yellow-800" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-600 text-md">Location</p>
                            <div>
                                <span className="text-gray-800 font-bold text-md">{selectedDog.location} Shelter</span>
                                <p className="mt-2 text-sm text-gray-500 italic">Address, Arad 12</p>
                            </div>
                        </div>
                    </div>


                     {/* Contact info section */}
                     <div className="px-3 py-2 flex flex-row gap-2 border-2 border-sky-400/30 rounded-lg">
                        <div className="self-start p-1 rounded-xl bg-yellow-300">
                            <UserRound className="m-2 h-5 w-5 text-yellow-800" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-600 text-md">Contact</p>
                            <div className="flex flex-col gap-2">
                            <span className="text-gray-800 font-bold text-sm">{userInfo.name}</span>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-yellow-600" />
                                <span className="text-gray-600 italic text-sm">{userInfo.email}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-yellow-600" />
                                <span className="text-gray-600 italic text-sm">{userInfo.phone}</span>
                            </div>
                        </div>
                        </div>
                        
                    </div>

                </div>


                {/* Good to know section - main container */}
                <div className="p-8 rounded-lg">

                    {/* Good to know title container*/}
                    <div className="flex items-center gap-2">
                        <div className="bg-yellow-300 rounded-full p-2">
                            <Dog className='w-8 h-8 text-yellow-800 drop-shadow-sm' />
                        </div>
                        <h2 className="text-yellow-900 font-black">Good to know!</h2>
                    </div>

                    {/* Good to know content container */}
                    <div className="mt-4 flex flex-col gap-4">

                       <div className="
                            p-3 flex flex-col gap-2 rounded-lg
                            bg-yellow-200/80 border-l-6 border-yellow-300
                        "
                        >
                            <h3 className="text-md font-black text-yellow-900">Before you arrive</h3>
                            {beforeArrival.map((fact) => (
                                <p 
                                    key={fact.id}
                                    className="text-sm text-gray-700"
                                >
                                    - {fact.label}
                                </p>
                            ))}
                       </div>

                       <div className="
                            p-3 flex flex-col gap-2 rounded-lg
                            bg-sky-100/50 border-l-6 border-sky-300/80"
                        >
                            <h3 className="text-md font-black text-gray-800">During your visit</h3>
                            {duringVisit.map((fact) => (
                                <p 
                                    key={fact.id}
                                    className="text-sm text-gray-700"
                                >
                                    - {fact.label}
                                </p>
                            ))}
                       </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default StepConfirmation;