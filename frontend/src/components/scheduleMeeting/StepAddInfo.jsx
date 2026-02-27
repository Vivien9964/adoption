import { useState } from 'react';
import { PawPrint, Calendar, Clock, UserRound, Mail, Phone, MessageCircle, CircleAlert, Circle } from 'lucide-react';
import { useMeeting } from "../../context/MeetingContext";



// Component to display error messages for inputs
const ErrorMessage = ({ message, id}) => {

    if(!message) {
        return null;
    }

    return (
        <p
            id={id}
            role="alert"
            className="mt-2 flex items-center gap-1 text-sm text-red-600"
        >

            <span aria-hidden="true"><CircleAlert className="h-4 w-4" /></span>
            <span>{message}</span>

        </p>
    )
}




const StepAddInfo = () => {

    // Get necessary data from context
    const { selectedDog, selectedDate, selectedTime, userInfo, setUserInfo } = useMeeting();

    // State to store validation errors
    const [ errors, setErrors ] = useState({}); 

    // Function to manage controlled inputs for userInfo
    const handleInputChange = (field, value) => {
    
        setUserInfo( prev => ({
            ...prev,
            [field]: value
        }));
    }

    const shortenDate = (dateString) => {
        const dateParts = dateString.split(", ");
        return dateParts[1];
    }

    // Function to validate form fields
    const validateForm = () => {
        const formErrors = {};

        // Name validation 
        // Name must be a valid full name consisting of two words and cannot contain special characters
        const nameTrimmed = userInfo.name.trim();
        const nameParts = nameTrimmed.split(" ").filter((part) => part.length > 0);
        const hasValidNameChars = /^[\p{L}\s\-']+$/u.test(nameTrimmed);

        if(!nameTrimmed) {
            formErrors.name = "Name is required!";
        } else if(nameTrimmed.length < 2) {
            formErrors.name = "Name is too short!";
        } else if(!hasValidNameChars) {
            formErrors.name = "Name cannot contain special characters and numbers!";
        } else if(nameParts.length < 2) {
            formErrors.name = "Enter first and last name!";
        }

        // Email validation
        // Valid email consist of: 
        // username -> contains letters, numbers, dots, underscores
        // domain name -> contains letters, dots, hyphens
        // top level domain -> must be at least two letters
        const trimmedEmail = userInfo.email.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!trimmedEmail) {
            formErrors.email = "Email is required!";
        } else if(!emailRegex.test(trimmedEmail)) {
            formErrors.email = "Enter valid email!";
        }

        // Phone validation
        // Valid phone must be 10 digits starting with 07
        const trimmedPhone = userInfo.phone.trim();
        const phoneRegex = /^07\d{8}$/;

        if(!trimmedPhone) {
            formErrors.phone = "Phone is required!";
        } else if(!phoneRegex.test(trimmedPhone)) {
            formErrors.phone = "Phone must be 10 digits starting with 07!";
        }

        return formErrors;
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
            <div
                role="form"
                aria-label="Meeting contact information" 
                className="w-full flex flex-col mt-6 max-w-[700px] gap-4">

                {/* Full name input */}
                <div className="flex flex-col gap-2">
                    {/* Label for name input with icon */}
                    <div className="flex gap-2">
                        <UserRound 
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-700" />
                        <label 
                            htmlFor="contact-name"
                            className="text-gray-700 text-md">
                            Full Name:*
                        </label>
                    </div>
                    <input 
                        id="contact-name"
                        type="text" 
                        autoComplete="name"
                        placeholder="Johhny Doe"
                        name="name"
                        value={userInfo.name}
                        onChange={(e) => {
                            const value = e.target.value;
                            const validChars = /^[\p{L}\s\-']*$/u;

                            if(validChars.test(value)) {
                                handleInputChange("name", value)
                            }

                            if(errors.name) {
                                setErrors({...errors, name: null});
                            }
                        }}
                        required
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`
                            w-full px-4 py-3 border-2 shadow-sm rounded-xl outline-none 
                            text-gray-700 text-md bg-white transition-all duration-200 placeholder:text-gray-400
                            focus:ring-2 focus:ring-yellow-200 focus:shadow-lg 
                            focus-visible:ring-1 focus-visible:ring-yellow-300
                            hover:border-sky-400
                            ${errors.name 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-sky-300 focus:border-yellow-400'
                            }
                        `}
                    />

                    <ErrorMessage message={errors.name} id="name-error" />
                </div>


                {/* Email input */}
                <div className="flex flex-col gap-2">
                {/* Label for email input with icon */}
                <div className="flex gap-2">
                        <Mail 
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-700" />
                        <label 
                            htmlFor="contact-email"
                            className="text-gray-700 text-md">
                            Email:*
                        </label>
                    </div>
                    <input 
                        id="contact-email"
                        type="email" 
                        autoComplete="email"
                        placeholder="bob123Bingi@example.com"
                        name="email"
                        value={userInfo.email}
                        onChange={(e) => {
                            handleInputChange("email", e.target.value);

                            if(errors.email) {
                                setErrors({...errors, email: null})
                            }
                        }}
                        required
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`
                            w-full px-4 py-3 border-2 shadow-sm rounded-xl outline-none 
                            text-md text-gray-700 bg-white transition-all duration-200 placeholder:text-gray-400
                            focus:ring-2 focus:ring-yellow-200 focus:shadow-lg 
                            focus-visible:ring-1 focus-visible:ring-yellow-300
                            hover:border-sky-300
                            ${errors.email 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-sky-300 focus:border-yellow-400'
                            }
                        `}
                    />

                    <ErrorMessage message={errors.email} id="email-error" />
                </div>

                {/* Phone number input */}
                <div className="flex flex-col gap-2">

                    {/* Label for phone numbet input with icon */}
                    <div className="flex gap-2">
                        <Phone 
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-700" />
                        <label 
                            htmlFor="contact-phone"
                            className="text-gray-700 text-md">
                            Phone:*
                        </label>
                    </div>
                    <input 
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        pattern="^07\d{8}$"
                        inputMode="numeric"
                        placeholder="0785674123"
                        name="phone"
                        value={userInfo.phone}
                        onChange={(e) => {
                            handleInputChange("phone", e.target.value)

                            if(errors.phone) {
                                setErrors({...errors, phone: null})
                            }
                        }}
                        required
                        aria-invalid={errors.phone ? "true" : "false"}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={`
                            w-full px-4 py-3 border-2 shadow-sm rounded-xl outline-none 
                            text-gray-700 text-md bg-white transition-all duration-200 placeholder:text-gray-400
                            focus:ring-2 focus:ring-yellow-200 focus:shadow-lg 
                            focus-visible:ring-1 focus-visible:ring-yellow-300
                            hover:border-sky-300
                            ${errors.phone 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-sky-300 focus:border-yellow-400'
                            }
                        `}
                    />

                    <ErrorMessage message={errors.phone} id="phone-error" />
                </div>


                {/* Notes */}
                <div className="flex flex-col gap-2">

                    {/* Label for notes with icon */}
                    <div className="flex gap-2">
                        <MessageCircle 
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-700" />
                        <label 
                            htmlFor="notes"
                            className="text-gray-700 text-md">
                            Additional notes:
                        </label>
                    </div>
                    <textarea 
                        id="notes"
                        rows={4}
                        maxLength={1000}
                        placeholder="Any questions or special requests?"
                        name="notes"
                        value={userInfo.notes}
                        onChange={(e) => {
                            handleInputChange("notes", e.target.value)
                        }}
                        className="
                            w-full px-4 py-3 border-2 border-sky-300 shadow-md rounded-xl outline-none 
                            text-gray-700 text-md bg-white transition-all duration-200 placeholder:text-gray-400
                            focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 focus:shadow-lg 
                            hover:border-sky-300"
                    />
                    <span className="text-sm text-gray-600">
                        {userInfo.notes.length} / 1000
                    </span>
                </div>
            </div>
        </div>
    </div>

    )
}

export default StepAddInfo;