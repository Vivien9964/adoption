import { useMeeting, MeetingProvider } from "../../context/MeetingContext";
import { Calendar, Clock, MapPin, Check, Dog, Mail, Bell, CircleAlert, Download } from 'lucide-react';

const SuccessModalContent = () => {

    const { selectedDog, selectedDate, selectedTime, userInfo } = useMeeting();

    // Mock data for testing
    const dog = selectedDog || {
        name: "Buddy",
        breed: "Golden Retriever",
        mainImage: "https://images.dog.ceo/breeds/malamute/n02110063_14230.jpg",
        location: "Happy Paws"
    };

    const user = {
        name: "Bingu Bingi",
        email: "bingiBB@example.com",
        phone: "12345678"
    }

    const date = selectedDate || "Sat, 31 Jan";
    const time = selectedTime || "15:00";


    return (
        <div className="
            px-2 py-6 m-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 rounded-3xl
            bg-yellow-300 border-2 border-yellow-300 shadow-2xl max-w-[1000px]"
        >
            
            {/* Confirmation details with profile card, meeting details */}
            <div className="flex flex-col gap-3 items-center"> 

                {/* Header with confirmation icon and main title */}
                <div className="flex flex-col gap-2 items-center">
                    <div className="p-4 rounded-full bg-white border-white shadow-lg max-w-[70px]">
                        <Check className="h-10 w-10 text-green-500 font-black" />
                    </div>
                    <h1 
                        className="text-3xl md:text-4xl font-black text-gray-700"
                        style={{ fontFamily: "Arial Black, sans-serif"}}

                        
                    >
                        All Set!
                    </h1>
                    <p className="text-md md:text-lg text-gray-700"><span className="text-yellow-800 font-black">{dog.name}</span> can't wait to meet you!</p>
                </div>


                {/* Profile card with message and meeting details */}
                <div className="p-3 bg-white rounded-xl w-xs md:w-xs lg:w-md">
                    {/* Image + Name + Breed container */}
                    <div className='w-full flex flex-col self-start'>
                        <div className="
                            p-3 mt-2 flex flex-row justify-center items-center gap-3 rounded-xl
                            border-2 border-sky-200 shadow-sm bg-sky-50" 
                        >
                            {/* Image container */}
                            <div className="h-20 w-20 rounded-full border-4 border-white shadow-xl overflow-hidden">
                                <img src={dog.mainImage} className='h-full w-full object-cover' alt={`${dog.name} - ${dog.breed}`} />
                            </div>

                            {/* Name and breed container */}
                            <div>
                                <h2 className="mb-1 text-gray-700 font-bold text-md md:text-lg">{dog.name}</h2>
                                <p className="text-gray-500 text-sm">{dog.breed}</p> 
                            </div>

                        </div>
                    </div>

                    {/* Short message */}
                    <div>

                    </div>



                     {/* Meeting details */}
                    {/* Meeting date and time  */}
                    <div className="mt-2 p-4 flex flex-col gap-3 md:w-md">

                        {/* When to meet section -> date */}
                        <div className="min-h-[50px] px-3 py-3 flex flex-row gap-2">
                            <div className="self-start p-1 rounded-xl bg-yellow-300">
                                <Calendar className="m-2 h-5 w-5 text-yellow-800" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-600 text-md">Date</p>
                                <span className="text-gray-800 font-bold text-md">{date}</span>
                            </div>
                        </div>

                        {/* When to meet section -> time */}
                        <div className="min-h-[50px] px-3 py-3 flex flex-row gap-2">
                        <div className="self-start p-1 rounded-xl bg-yellow-300">
                                <Clock className="m-2 h-5 w-5 text-yellow-800" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-600 text-md">Time</p>
                                <span className="text-gray-800 font-bold text-md">{time}:00</span>
                            </div>
                        </div>

                        {/* Where to meet section -> based on dog data = location + shelter for now, later -> shelter name with address */}
                        <div className="px-3 py-3 flex flex-row gap-2">
                            <div className="self-start p-1 rounded-xl bg-yellow-300">
                                <MapPin className="m-2 h-5 w-5 text-yellow-800" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-600 text-md">Location</p>
                                <div>
                                    <span className="text-gray-800 font-bold text-md">{dog.location} Shelter</span>
                                    <p className="mt-2 text-sm text-gray-500 italic">Address, Arad 12</p>
                                </div>
                            </div>
                        </div>
                    </div>
                

                </div>



               


            </div>

            {/* Booking code with further steps and CTA buttons */}
            <div className="bg-white md:rounded-tr-xl md:rounded-br-xl rounded-xl flex flex-col gap-2">

                {/* Booking code */}
                <div className="border-2 border-sky-200 text-gray-700 font-black text-xl p-4 rounded-lg">
                    Booking code
                </div>


                {/* What's next?  */}
                <div className="flex flex-col gap-3 p-3">

                    {/* Title with icon */}
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-300 rounded-full p-2 text-center">
                            <Dog className="h-6 w-6 text-yellow-900" />
                        </div>
                        <h2 className="text-yellow-900 font-black text-lg md:text-xl">What happens next?</h2>
                    </div>

                    {/* Confirmation sent to, reminder, extra tip */}
                    <div className="flex flex-col gap-3">

                        {/* Email */}
                        <div className="flex gap-2 items-center">
                            <Mail className="h-4 w-4 text-yellow-800" />
                            <p>Confirmation sent to <span className="text-yellow-800 italic">{user.email}</span></p>
                        </div>

                        {/* Reminder */}
                        <div className="flex gap-2 items-center">
                            <Bell className="h-4 w-4 text-yellow-800" />
                            <p>We'll give you a reminder 24 hours before your visit.</p>
                        </div>

                        {/* Important */}
                        <div className="flex gap-2 items-center mb-3">
                            <CircleAlert className="h-4 w-4 text-yellow-800" />
                            <p>Remember to bring your ID card and booking confirmation.</p>
                        </div>

                        <button className="
                            flex gap-2 items-center m-auto px-3 py-4 max-w-[200px] rounded-xl bg-yellow-300 text-yellow-900 font-black">
                           <Download className="h-6 w-6 text-yellow-800" />
                            Save Confirmation
                        </button>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex justify-evenly mt-3">
                        <button>Back to Dogs</button>
                        <button>Close</button>
                    </div>

                </div>

            </div>

           
            
        </div>
    )
}


const SuccessModal = () => {
    return (
        <MeetingProvider>
            <SuccessModalContent />
        </MeetingProvider>
    )
}

export default SuccessModal;