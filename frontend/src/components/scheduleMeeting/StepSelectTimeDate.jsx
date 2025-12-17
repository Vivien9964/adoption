import { Calendar } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { useState } from 'react';


const StepSelectTimeDate = ({ dog }) => {

    const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useMeeting();

    // New date object for today
    const today = new Date();

    // Days and months array
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    
    // Array to store the next ten days from today -> users can see the next ten days or will be able to choose from calendar
    const nextTendays = [];

    // Helper function to format dates 
    const formatDate = (date) => {
        const formatDay = days[date.getDay()];
        const formatDate = date.getDate();
        const formatMonth = months[date.getMonth()];

        return `${formatDay}, ${formatDate} ${formatMonth}`;
    }

    // Creating, formatting the next ten days and saving them into the array
    for(let i = 1; i <= 10; i++) {

        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i)

        nextTendays.push(formatDate(nextDay));

    }


    // Function to set selected date -> toggle the selected state and based on this the styles
    const handleSelectDate = (day) => {

        if(selectedDate === day) {
            setSelectedDate(null);
        } else {
            setSelectedDate(day);
        }
        
    }


    //nextTendays.map((day) => console.log(day));





    return (
        <div className="p-4 mt-4 border-3 border-yellow-300 rounded-xl">
            
            <h1 className='mb-8 text-gray-700 font-black text-xl md:text-4xl'>Step 2: Choose Date & Time</h1>

            
            <h2 className="text-gray-800/80 text-base">Meeting with: </h2>
            {/* Selected dog card */}
              {/* Image + Name + Breed container */}
              <div className="p-3 mt-2 flex flex-row justify-self items-center gap-3 max-w-[300px] border-3 border-yellow-300 rounded-xl" >
                    {/* Image container */}
                    <div className="h-12 w-12 rounded-full border-4 border-white shadow-xl overflow-hidden">
                        <img src={dog.mainImage} className='h-full w-full object-cover' alt={`${dog.name} - ${dog.breed}`} />
                    </div>

                    {/* Name and breed container */}
                    <div>
                        <h2 className="mb-1 text-gray-700 font-bold text-md md:text-lg">{dog.name}</h2>
                        <p className="text-gray-500 text-sm">{dog.breed}</p> 
                    </div>
            
                
                </div>


            {/* Select date container */}
            <div className="mt-8">
                {/* Subtitle and icon container */}
                <div className="flex items-center gap-3 my-4">
                    <Calendar className="h-5 w-5  text-yellow-500" />
                    <h3 className="text-gray-700 font-bold text-xl md:text-2xl">Select a Date</h3>
                </div>
                

                {/* Possible dates grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {nextTendays.map((day, index) => (
                        // Date card 
                        <div 
                            onClick={() => handleSelectDate(day)}
                            key={index}
                            className={
                                `p-3 text-center text-gray-700 font-bold rounded-xl
                                border-3 cursor-pointer whitespace-nowrap transition-all duration-300
                                ${selectedDate === day 
                                    ? "bg-sky-500/30 border-sky-400/50 shadow-sky-400/50 ring-2 ring-sky-300/50 scale-105" 
                                    : "bg-sky-50 hover:bg-gray-200/50 border-sky-300/50 hover:scale-102 hover:shadow-md"
                                }
                                `}
                        >
                            <span>{day}</span>
                        </div>
                    ))}
                </div>
                



            </div>
            



        </div>
    )
}


export default StepSelectTimeDate;