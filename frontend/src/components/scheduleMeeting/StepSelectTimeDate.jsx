import { Calendar, Clock } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import Button from '../common/Button';
import { useState } from 'react';
import DatePicker from "react-datepicker"; // react date picker library
import "react-datepicker/dist/react-datepicker.css";

const StepSelectTimeDate = ({ dog }) => {

    // Taking necessary data from context
    const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useMeeting();

    // New date object for today -> in date formatting
    const today = new Date();

    // Days and months array -> in date formatting
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

    const handleSelectTime = (hour) => {
        
        if(selectedTime === hour) {
            setSelectedTime(null);
        } else {
            setSelectedTime(hour);
        }
    }

    // State to control calendar visibility -> only opens if the user wants an appointment further in the future than next ten days
    const [ isCalendarOpen, setIsCalendarOpen ] = useState(false);
    const [ customDateSelected, setCustomDateSelected ] = useState(false);
    const [ datePickerDate, setDatePickerDate ] = useState(null);

    // Functions to toggle calendar visibility
    const handleOpenCalendar = () => {
        setIsCalendarOpen(true);
        setCustomDateSelected(false);
    }

    const handleCloseCalendar = () => {
        setIsCalendarOpen(false);
    }

    // Function to handle custom date selection
    const handleSelectCustomDate = (date) => {
       setDatePickerDate(date);
       const formattedCustomDate = formatDate(date);
       setSelectedDate(formattedCustomDate);
       setCustomDateSelected(true);
       setIsCalendarOpen(false);
    }

    // Available visiting time
    const visitingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    // Function to create a date object based on what the user selected -> date and time
    const convertToDateObj = (dateString, hourNum) => {

        const dateParts  = dateString.split(", ")[1].split(" ");
        const day = parseInt(dateParts[0]);
        const month = months.indexOf(dateParts[1]);
        const year = new Date().getFullYear();

        const dateTimeObj = new Date(year, month, day, hourNum, 0, 0);

        return dateTimeObj.toISOString();
    }



    return (
        <div className="p-4 mt-4 border-3 border-yellow-300 rounded-xl bg-white">
            
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
            <div className="mt-8 text-center">
                {/* Subtitle and icon container */}
                <div className="flex items-center gap-3 my-4">
                    <Calendar className="h-5 w-5  text-yellow-500" />
                    <h3 className="text-gray-700 font-bold text-xl md:text-2xl">Select Date</h3>
                </div>
                

                {/* Possible dates grid */}
                { !isCalendarOpen && !customDateSelected && (
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
                )}   

                {/* Show the success message with selected date card if user chose to select from calendar */}
                { !isCalendarOpen && customDateSelected && (
                    <div className='flex justify-center'>
                        <div className="p-4 text-center bg-sky-500/30 border-3 border-sky-400/50 rounded-xl">
                            <h2 className="text-gray-500 font-bold text-sm mb-2">Success! Selected date:</h2>
                            <p className="text-gray-700 font-semibold text-2xl">{selectedDate}</p>
                        </div>
                    </div>
                )}

                {/* Date picker */}
                { isCalendarOpen && (
                    <div className="mt-4 p-4 border-3 border-yellow-300/50 rounded-xl bg-sky-50">
                       
                            <DatePicker
                                selected={datePickerDate}
                                onChange={handleSelectCustomDate}
                                minDate={new Date()}
                                inline
                                calendarClassName="custom-calendar"
                            />
                    </div>
                )}

                {/* CTA button to toggle the calendar */}
                <Button 
                    variant='primary'
                    className='mt-6'
                    onClick={isCalendarOpen ? handleCloseCalendar : handleOpenCalendar }
                > 
                    {isCalendarOpen ? "Quick Dates" : "Choose from Calendar" }
                </Button>
                
            </div>


            {/* Select time container */}
            <div className="mt-4 text-center">
                {/* Subtitle and icon container */}
                <div className="flex items-center gap-3 my-4">
                    <Clock className="h-5 w-5  text-yellow-500" />
                    <h3 className="text-gray-700 font-bold text-xl md:text-2xl">Select Time</h3>
                </div>

                {/* Time availability grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    {visitingHours.map((hour, index) => (
                        // Time card
                        <div 
                            key={index}
                            onClick={() => handleSelectTime(hour)}
                            className={
                                `p-3 text-center text-gray-700 font-bold rounded-xl
                                border-3 cursor-pointer whitespace-nowrap transition-all duration-300
                                ${selectedTime === hour
                                    ? "bg-sky-500/30 border-sky-400/50 shadow-sky-400/50 ring-2 ring-sky-300/50 scale-105" 
                                    : "bg-sky-50 hover:bg-gray-200/50 border-sky-300/50 hover:scale-102 hover:shadow-md"
                                }
                                `}
                        >
                            <span>{hour}:00</span>
                        </div>

                    ))}

                </div>

            </div>
            

        </div>
    )
}


export default StepSelectTimeDate;