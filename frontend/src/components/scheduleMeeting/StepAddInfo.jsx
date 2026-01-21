import { PawPrint, Calendar, Clock, UserRound, Mail, Phone, MessageCircle } from 'lucide-react';
import { useMeeting } from "../../context/MeetingContext";

const StepAddInfo = () => {

    // Get necessary data from context
    const { selectedDog, selectedDate, selectedTime, userInfo, setUserInfo } = useMeeting();

    // Function to manage controlled inputs for userInfo
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setUserInfo( prev => ({
            ...prev,
            [name]: value
        }));
    }

    const shortenDate = (dateString) => {
        const dateParts = dateString.split(", ");
        return dateParts[1];
    }

    return (
        // Main container with base styles for content
        <div className="p-6 mt-4 rounded-xl bg-white shadow-lg border-l-4 border-yellow-400">

            {/* Main container for meeting summary card and contact info form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Meeting summary card */}
                <div className="p-4 w-full flex flex-col items-center">

                    {/* Main content with image and meeting details */}
                    <div className="
                        w-full py-6 px-4 flex flex-col items-center gap-4 mt-4 
                        bg-sky-50 shadow-sm border-2 border-sky-200 rounded-xl"
                    >
                        
                        {/* Image container */}
                        <div className="h-40 w-40 rounded-full border-4 border-white shadow-xl overflow-hidden">
                            <img src={selectedDog.mainImage} className='h-full w-full object-cover' alt={`${selectedDog.name} - ${selectedDog.breed}`} />
                        </div>

                        {/* Meeting detals with icons  */}
                        <div className="w-full px-3 mt-2 flex flex-col lg:grid lg:grid-cols-3 gap-3">

                            {/* Who to meet section */}
                            <div className="flex items-center gap-2 md:gap-3 min-w-0 w-full">
                                <div className="flex items-center p-2 bg-yellow-300 rounded-lg shadow-sm flex-shrink-0">
                                    <PawPrint className="h-5 w-5 text-yellow-800" />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 uppercase">Meet</p>
                                    <p className="text-gray-800 font-bold text-lg">{selectedDog.name}</p>
                                </div>
                            </div>
                            
                            {/* When to meet section -> date */}
                            <div className="flex items-center gap-2 md:gap-3 min-w-0 w-full">
                                <div className="flex items-center p-2 bg-yellow-300 rounded-lg shadow-sm flex-shrink-0">
                                    <Calendar className="h-5 w-5 text-yellow-800" />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 uppercase">Date</p>
                                    <p className="text-gray-800 font-bold text-lg">{shortenDate(selectedDate)}</p>
                                </div>
                            </div>
                            
                            {/* When to meet section -> time */}
                            <div className="flex items-center gap-2 md:gap-3 min-w-0 w-full">
                                <div className="flex items-center p-2 bg-yellow-300 rounded-lg shadow-sm flex-shrink-0">
                                <Clock className="h-5 w-5 text-yellow-800" />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 uppercase">Time</p>
                                    <p className="text-gray-800 font-bold text-lg">{selectedTime}:00</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            {/* User data form - main container */}
            <div className="w-full flex flex-col mt-6 max-w-[700px] gap-4">

                {/* Full name input */}
                <div className="flex flex-col gap-2">
                    {/* Label for name input with icon */}
                    <div className="flex gap-2">
                        <UserRound className="h-5 w-5 text-gray-700" />
                        <label className="text-gray-700 text-md">
                            Full name:*
                        </label>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Bob Bingi"
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        required
                        className="
                            w-full px-4 py-3 border-2 border-sky-300 shadow-sm rounded-xl outline-none 
                            text-gray-700 text-md bg-white transition-all duration-200 placeholder:text-gray-400
                            focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:shadow-lg 
                            hover:border-sky-400"
                    />
                </div>


                {/* Email input */}
                <div className="flex flex-col gap-2">
                {/* Label for email input with icon */}
                <div className="flex gap-2">
                        <Mail className="h-5 w-5 text-gray-700" />
                        <label className="text-gray-700 text-md">
                            Email:*
                        </label>
                    </div>
                    <input 
                        type="email" 
                        placeholder="bob123Bingi@example.com"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="
                            w-full px-4 py-3 border-2 border-sky-300 shadow-sm rounded-xl outline-none 
                            text-md text-gray-700 bg-white transition-all duration-200 placeholder:text-gray-400
                            focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 focus:shadow-lg 
                            hover:border-sky-300"
                    />
                </div>

                {/* Phone number input */}
                <div className="flex flex-col gap-2">

                    {/* Label for phone numbet input with icon */}
                    <div className="flex gap-2">
                        <Phone className="h-5 w-5 text-gray-700" />
                        <label className="text-gray-700 text-md">
                            Phone:*
                        </label>
                    </div>
                    <input 
                        type="tel" 
                        pattern="^07\d{8}$"
                        inputMode="numeric"
                        placeholder="0785674123"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="
                            w-full px-4 py-3 border-2 border-sky-300 shadow-sm rounded-xl outline-none 
                            text-gray-700 text-md bg-white transition-all duration-200 placeholder:text-gray-400
                            focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 focus:shadow-lg 
                            hover:border-sky-300"
                    />
                </div>


                {/* Notes */}
                <div className="flex flex-col gap-2">

                    {/* Label for notes with icon */}
                    <div className="flex gap-2">
                        <MessageCircle className="h-5 w-5 text-gray-700" />
                        <label className="text-gray-700 text-md">
                            Additional notes:
                        </label>
                    </div>
                    <textarea 
                        rows={4}
                        placeholder="Any questions or special requests?"
                        name="notes"
                        value={userInfo.notes}
                        onChange={handleInputChange}
                        className="
                            w-full px-4 py-3 border-2 border-sky-300 shadow-md rounded-xl outline-none 
                            text-gray-700 text-md bg-white transition-all duration-200 placeholder:text-gray-400
                            focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 focus:shadow-lg 
                            hover:border-sky-300"
                        
                    ></textarea>
                </div>
            </div>



        </div>

    </div>

    )
}

export default StepAddInfo;