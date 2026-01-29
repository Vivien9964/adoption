import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMeeting } from "../../context/MeetingContext";
import { Calendar, Clock, MapPin, Check, Dog, Mail, Bell, CircleAlert, Download } from 'lucide-react';


const SuccessModalContent = () => {

    const navigate = useNavigate();
    const { selectedDog, selectedDate, selectedTime, userInfo } = useMeeting();
    const [ message, setMessage ] = useState(null);

    if(!selectedDog || !userInfo || !selectedDate || !selectedTime) {
        console.log("Missing data:", { selectedDog, userInfo, selectedDate, selectedTime});
        return null;
    }

    useEffect(() => {

        const welcomeMessages = [
            { messageTop: "I'm so happy you're coming to visit me!", messageBottom:"Who knows… this might be the start of our story."},
            { messageTop: "Yay! You're coming to see me!", messageBottom:"I hope this visit is just the first step in our story together."},
            { messageTop: "I'm so excited to see you!", messageBottom:"See you soon!"},
            { messageTop: "Woohoo! A visitor!", messageBottom:"I promise, I'll make our meeting unforgettable!"},
            { messageTop: "Thanks for coming to see me!", messageBottom:"I'm looking forward to meeting you."},
        ];

        if(selectedDog) {
            const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
            setMessage(welcomeMessages[randomIndex]);
        }

    }, [])

    const handleGoToDogs = () => {
        navigate("/dogs");
    }

    const handleGoHome = () => {
        navigate("/");
    }


  

    return (
        <>
        <div
            className="
            px-2 py-6 m-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 rounded-3xl
            bg-yellow-300 border-2 border-yellow-300 shadow-2xl max-w-md md:max-w-[1200px]"
        >
            
            {/* Confirmation details with profile card, meeting details */}
            <div className="flex flex-col gap-3 w-full"> 

                {/* Header with confirmation icon and main title */}
                <div className="flex flex-col gap-3 items-center">
                    <div className="p-4 rounded-full bg-white border-white shadow-lg max-w-[70px]">
                        <Check className="h-10 w-10 text-green-500 font-black" />
                    </div>
                    <h1 
                        className="text-3xl md:text-4xl font-black text-gray-700"
                        style={{ fontFamily: "Arial Black, sans-serif"}} 
                    >
                        All Set!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 font-normal">
                        <span className="text-yellow-800 font-black">{selectedDog.name}</span> can't wait to meet you!
                    </p>
                </div>


                {/* Profile card with message and meeting details */}
                <div className="p-3 bg-white rounded-xl w-full">
                    {/* Image + Name + Breed container */}
                    <div className='w-full flex flex-col'>
                        <div className="
                            p-3 mt-2 flex flex-row items-center gap-4 rounded-xl 
                            border-2 border-sky-200 shadow-sm bg-sky-50" 
                        >
                            {/* Image container */}
                            <div className="h-35 w-35 rounded-full border-4 border-white shadow-xl overflow-hidden">
                                <img src={selectedDog.mainImage} className='h-full w-full object-cover' alt={`${selectedDog.name} - ${selectedDog.breed}`} />
                            </div>

                            {/* Name and breed container */}
                            <div>
                                <h2 className="mb-1 text-gray-700 font-bold text-2xl md:text-3xl">{selectedDog.name}</h2>
                                <p className="text-gray-500 text-lg">{selectedDog.breed}</p> 
                            </div>

                        </div>
                    </div>

                    {/* Short message */}
                    <div className="mt-2 p-2 flex flex-col rounded-2xl text-center">
                        <p className="text-lg text-yellow-800 font-semibold">
                            {message?.messageTop} 
                        </p>

                        <p className="text-lg text-yellow-800 font-semibold">
                            {message?.messageBottom}
                        </p>
                    </div>



                     {/* Meeting details */}
                    {/* Meeting date and time  */}
                    <div className="mt-1 p-4 flex flex-col gap-3">

                        {/* When to meet section -> date */}
                        <div className="min-h-[50px] px-3 py-3 flex flex-row gap-2">
                            <div className="self-start p-1 rounded-xl bg-yellow-300">
                                <Calendar className="m-2 h-5 w-5 text-yellow-800" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-600 text-lg">Date</p>
                                <span className="text-gray-800 font-bold text-lg">{selectedDate}</span>
                            </div>
                        </div>

                        {/* When to meet section -> time */}
                        <div className="min-h-[50px] px-3 py-3 flex flex-row gap-2">
                        <div className="self-start p-1 rounded-xl bg-yellow-300">
                                <Clock className="m-2 h-5 w-5 text-yellow-800" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-600 text-lg">Time</p>
                                <span className="text-gray-800 font-bold text-lg">{selectedTime}:00</span>
                            </div>
                        </div>

                        {/* Where to meet section -> based on dog data = location + shelter for now, later -> shelter name with address */}
                        <div className="px-3 py-3 flex flex-row gap-2">
                            <div className="self-start p-1 rounded-xl bg-yellow-300">
                                <MapPin className="m-2 h-5 w-5 text-yellow-800" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-600 text-lg">Location</p>
                                <div>
                                    <span className="text-gray-800 font-bold tex-lg">{selectedDog.location} Shelter</span>
                                    <p className="mt-2 text-sm text-gray-500 italic">Address, Arad 12</p>
                                </div>
                            </div>
                        </div>
                    </div>
                

                </div>

            </div>




            {/* Booking code with further steps and CTA buttons */}
            <div className="
                px-3 py-5 flex flex-col gap-3 md:gap-6 rounded-xl md:rounded-tr-xl md:rounded-br-xl w-full bg-white">

                {/* Booking code */}
                <div className="
                    p-4 mt-3 text-center rounded-lg border-2 border-sky-200 bg-sky-100"
                >
                    <p className="mb-2 text-gray-500 font-semibold uppercase text-sm md:text-md">Booking Code</p>
                    <p className="text-gray-700 font-black uppercase text-2xl md:text-3xl">
                        {selectedDog.name + "-" + crypto.randomUUID().split("-")[0]}
                    </p>
                </div>


                {/* What's next?  */}
                <div className="flex flex-col gap-4 md:gap-8 p-3 mt-3">

                    {/* Title with icon */}
                    <div className="mt-6 flex items-center gap-3">
                        <div className="bg-yellow-300 rounded-full p-2 text-center">
                            <Dog className="h-8 w-8 md:h-10 md:w-10 text-yellow-900" />
                        </div>
                        <h2 className="text-yellow-900 font-black text-xl md:text-2xl">What happens next?</h2>
                    </div>

                    {/* Confirmation sent to, reminder, extra tip */}
                    <div className="flex flex-col gap-5 md:gap-8">

                        {/* Email */}
                        <div className="flex gap-3 items-center">
                            <Mail className="h-7 w-7 text-yellow-800" />
                            <p className="font-normal text-xl text-gray-700">
                                Confirmation sent to <span className="text-yellow-800 italic cursor-pointer">{userInfo.email}</span>
                            </p>
                        </div>

                        {/* Reminder */}
                        <div className="flex gap-3 items-center">
                            <Bell className="h-8 w-8 text-yellow-800" />
                            <p className="font-normal text-xl text-gray-700">
                                We'll give you a reminder 24 hours before your visit.
                            </p>
                        </div>

                        {/* Important */}
                        <div className="flex gap-3 items-center mb-8">
                            <CircleAlert className="h-10 w-10 text-yellow-800" />
                            <p className="font-normal text-xl text-gray-700">
                                Remember to bring your ID card and booking confirmation.
                            </p>
                        </div>

                        <button 
                            className="
                            flex gap-2 items-center justify-center m-auto px-3 py-4 w-sm rounded-xl 
                            bg-yellow-300 text-yellow-800 text-lg font-black shadow-md cursor-pointer
                            hover:bg-yellow-400/80
                            "
                        >
                           <Download className="h-6 w-6 text-yellow-800" />
                            Save Confirmation
                        </button>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex justify-evenly mt-6">
                        <button 
                            className="
                                px-3 py-4 rounded-xl
                                bg-yellow-300 text-yellow-800 font-black cursor-pointer shadow-md
                                hover:bg-yellow-400/80"
                                onClick={handleGoToDogs}
                        >
                            Back to Dogs
                        </button>

                        <button 
                            className="
                                px-4 py-3 rounded-xl
                                text-gray-600 font-black bg-gray-300 cursor-pointer shadow-md
                                hover:bg-gray-300/90"
                                onClick={handleGoHome}
                        >
                            Done
                        </button>
                    </div>

                </div>

            </div>

           
            
        </div>
        </>
    )
}


const SuccessModal = () => {
    return (
            <SuccessModalContent />
        
    )
}

export default SuccessModal;