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


    return (
        <div className="p-4 mt-4 border-3 border-yellow-300 rounded-xl bg-white">
            {/* Step title */}
            <h1 className='mb-8 text-gray-700 font-black text-xl md:text-4xl'>Step 3: Your Information</h1>

            {/* Meeting summary card - main card container */}
            <div className="p-4 max-w-[550px]">

                {/* Summary card subtitle */}
                <h3 className="text-gray-700 font-bold text-xl md:text-2xl">Meeting Summary:</h3>

                {/* Summary with icons - main container */}
                <div className="p-4 flex flex-col gap-3 mt-4 bg-sky-100 border-2 border-sky-300/50 rounded-xl">

                    {/* Who to meet section */}
                    <div className="flex items-center gap-2">
                        <PawPrint className="h-5 w-5 text-yellow-600" />
                        <p className="text-gray-600 text-md">
                            Meeting with: <span className="text-gray-800 font-bold text-lg">{selectedDog.name}</span>
                        </p>
                    </div>
                    
                    {/* When to meet section -> date */}
                    <div className="flex gap-2">
                        <Calendar className="h-5 w-5 text-yellow-600" />
                        <p className="text-gray-600 text-md">
                            Date: <span className="text-gray-800 font-bold text-lg">{selectedDate}</span>
                        </p>
                    </div>
                    
                    {/* When to meet section -> time */}
                    <div className="flex gap-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <p className="text-gray-600 text-md">
                            Time: <span className="text-gray-800 font-bold text-lg">{selectedTime}:00</span>
                        </p>
                    </div>

                </div>


                {/* User data form - main container */}
                <div className="flex flex-col mt-6 max-w-[500px] gap-4">

                    {/* Full name input */}
                    <div className="flex flex-col gap-2">
                        {/* Label for name input with icon */}
                        <div className="flex gap-2">
                            <UserRound className="h-5 w-5 text-gray-700" />
                            <label className="text-gray-700 text-sm">
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
                                w-full px-3 py-2 border-3 border-sky-400/50 rounded-xl outline-none text-gray-500 
                                focus:text-gray-700 focus:ring-1 focus:ring-sky-200 focus:shadow-lg"
                        />
                    </div>


                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                    {/* Label for email input with icon */}
                    <div className="flex gap-2">
                            <Mail className="h-5 w-5 text-gray-700" />
                            <label className="text-gray-700 text-sm">
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
                                w-full px-3 py-2 border-3 border-sky-400/50 rounded-xl outline-none text-gray-500 
                                focus:text-gray-700 focus:ring-1 focus:ring-sky-200 focus:shadow-lg"
                        />
                    </div>

                    {/* Phone number input */}
                    <div className="flex flex-col gap-2">

                        {/* Label for phone numbet input with icon */}
                        <div className="flex gap-2">
                            <Phone className="h-5 w-5 text-gray-700" />
                            <label className="text-gray-700 text-sm">
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
                                w-full px-3 py-2 border-3 border-sky-400/50 rounded-xl outline-none text-gray-500 
                                focus:text-gray-700 focus:ring-1 focus:ring-sky-200 focus:shadow-lg"
                        />
                    </div>


                    {/* Notes */}
                    <div className="flex flex-col gap-2">

                        {/* Label for notes with icon */}
                        <div className="flex gap-2">
                            <MessageCircle className="h-5 w-5 text-gray-700" />
                            <label className="text-gray-700 text-sm">
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
                                w-full px-3 py-2 border-3 border-sky-400/50 rounded-xl outline-none text-gray-500 
                                focus:text-gray-700 focus:ring-1 focus:ring-sky-200 focus:shadow-lg"
                            
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default StepAddInfo;