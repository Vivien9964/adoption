import { useState } from "react";
import Section from "../layout/Section";
import { MapPin, Phone, Mail, Clock, CircleAlert } from "lucide-react";


// Info card component which displays contact info - email, address, phone, hours
const ContactInfoCard = ({ info }) => {

    const IconComponent = info.icon;

    let splitInfo;

    // If the info is rlated to address or title, split the info into two parts
    if(info.title === "Address" || info.title === "Hours") {
        splitInfo = info.info.split(".");
    }

    return (
        <div className="p-4 rounded-lg bg-white border border-yellow-200 hover:shadow-md transition-shadow duration-300">
            {/* Title with icon */}
            <div className="flex items-start gap-3 mb-2">
                <IconComponent className="w-6 h-6 text-yellow-900 flex-shrink-0 mt-1" />
                <h3 className="text-lg font-bold text-gray-800">{info.title}</h3>
            </div>

            {/* Show info parts separately for address and hours info, else together */}
            {splitInfo ?  (
                <>
                    <p className="ml-9 text-gray-600">{splitInfo[0]}</p>
                    <p className="ml-9 text-gray-600">{splitInfo[1]}</p>
                </>

            ) : (
                <p className="ml-9 text-gray-600">{info.info}</p>
            )}

    </div>
    )

}


// Error message component to display errors under input fields
const ErrorMessage = ({ message }) => {
    if(!message) {
        return null;
    }

    return (
        <p className="mt-2 text-sm text-yellow-900 flex items-center gap-1">
            <span><CircleAlert /></span>
            <span>{message}</span>

        </p>
    )
}


const ContactUsSection = () => {

    // State to hold form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    // State to store form errors
    const [errors, setErrors] = useState({});

    const contactInfoDetails = [
        {
            id: 1,
            title: "Address",
            icon: MapPin,
            info: "123 Street Name. Arad, Romania"
        },
        {
            id: 2,
            title: "Phone",
            icon: Phone,
            info: "123 456 789"
        },
        {
            id: 3,
            title: "Email",
            icon: Mail,
            info: "info@pawsome.com"
        },
        {
            id: 4,
            title: "Hours",
            icon:  Clock,
            info: "Mon-Fri: 8-18. Sat-Sun: 10-16"
        },

    ];


    // Function to update form data values
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    } 

    const validateForm = () => {

        const formErrors = {};

        // Name validation 
        // Name must be a valid full name consisting of two words and cannot contain special characters
        const nameTrimmed = formData.name.trim();
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
        const trimmedEmail = formData.email.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!trimmedEmail) {
            formErrors.email = "Email is required!";
        } else if(!emailRegex.test(trimmedEmail)) {
            formErrors.email = "Enter valid email!";
        }

        // Subject validation
        // Valid subject must be:
        // -> more than 5 characters long, field cannot be empty
        const trimmedSubject = formData.subject.trim();
        if(!trimmedSubject) {
            formErrors.subject = "Subject is required!";
        } else if(trimmedSubject.length < 5) {
            formErrors.subject = "Subject is too short!";
        }


        // Message validation
        // Valid message should be more than 10 characters long, but it should not contain more than 1000 characters
        const trimmedMessage = formData.message.trim();
        
        if(!trimmedMessage) {
            formErrors.message = "Message is required!";
        } else if(trimmedMessage.length < 10) {
            formErrors.message = "Message must be at least 10 characters!";
        } else if(trimmedMessage.length > 1000) {
            formErrors.message = "Message is too long (max 1000 characters)!";
        }

        return formErrors;
    }


    // Funtion to submit contact form with validation first
    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();

        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    }


    return (
        <Section>
            
             {/* Header */}
             <div className="mb-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-yellow-400">Contact</span>{" "}
                    <span className="text-yellow-900">Us</span>
                </h2>
                <p className="mt-6 text-lg md:text-xl text-gray-600">
                    Have a question about adoption, volunteering, or our dogs? Reach out anytime.
                </p>
            </div>

            {/* Main content */}
            <div className="p-4 md:p-8 flex flex-col lg:flex-row justify-evenly items-start gap-8 lg:gap-12">

                {/* Contact info grid with cards */}
                <div className="
                    w-full h-fit lg:w-auto lg:max-w-md p-6 md:p-8 flex flex-col gap-4 rounded-xl
                    bg-yellow-100 border-2 border-yellow-200 shadow-md"
                >  

                    {contactInfoDetails.map((info) => (
                        <ContactInfoCard 
                            key={info.id}
                            info={info}
                        />
                    ))}
                </div>

                {/* Contact form */}
                <div className="
                    w-full h-fit lg:flex-1 lg:max-w-2xl p-6 md:p-8 rounded-2xl shadow-xl
                    bg-white border-3 border-gray-200"
                >
                    {/* Title */}
                    <h2 className="mb-2 text-center text-2xl md:text-3xl font-bold text-gray-700">Send us a message</h2>
                    <p className="mb-6 text-center text-md md:text-lg text-gray-600">We typically respond in 24 hours!</p>

                    {/* Form */}
                    <form 
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-6"
                    >

                        {/* User data group */}
                        <div className="flex flex-col md:flex-row justify-between gap-4">

                            {/* Name input */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="block mb-2 text-gray-700 font-bold">Full Name*</label>
                                <input 
                                    type="text"
                                    placeholder="Bingus Bingu"
                                    value={formData.name}
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
                                    className={`
                                        w-full px-4 py-3 rounded-lg border-2 text-gray-800
                                        focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                        placeholder:text-gray-400 transition-all duration-200
                                        ${errors.name 
                                            ? 'border-red-500 focus:border-red-500' 
                                            : 'border-gray-300 focus:border-yellow-400'
                                        }
                                    `} 
                                />
                                
                                {/* Error component */}
                                <ErrorMessage message={errors.name} />

                            </div>

                            {/* Email input */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="block mb-2 text-gray-700 font-bold">Email*</label>
                                <input 
                                    type="email" 
                                    placeholder="example@example.com"
                                    value={formData.email}
                                    onChange={(e) => {
                                        handleInputChange("email", e.target.value)
        
                                        if(errors.email) {
                                            setErrors({...errors, email: null});
                                        }
                                    }}
                                    required
                                    className={`
                                        w-full px-4 py-3 rounded-lg border-2 text-gray-800
                                        focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                        placeholder:text-gray-400 transition-all duration-200
                                        ${errors.email
                                            ? 'border-red-500 focus:border-red-500' 
                                            : 'border-gray-300 focus:border-yellow-400'
                                        }
                                    `}
                                />

                                {/* Error component */}
                                <ErrorMessage message={errors.email} />

                            </div>
                        </div>


                        {/* Subject and message group */}
                        <div className="flex flex-col gap-4">

                            {/* Subject */}
                            <div className="flex flex-col gap-2">
                                <label className="block mb-2 text-gray-700 font-bold">Subject*</label>
                                <input 
                                    type="text" 
                                    placeholder="Volunteering..."
                                    value={formData.subject}
                                    onChange={(e) => {
                                        handleInputChange("subject", e.target.value)
        
                                        if(errors.subject) {
                                            setErrors({...errors, subject: null});
                                        }
                                    }}
                                    required
                                    className={`
                                        w-full px-4 py-3 rounded-lg border-2 text-gray-800
                                        focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                        placeholder:text-gray-400 transition-all duration-200
                                        ${errors.subject
                                            ? 'border-red-500 focus:border-red-500' 
                                            : 'border-gray-300 focus:border-yellow-400'
                                        }
                                    `}
                                />

                                {/* Error component */}
                                <ErrorMessage message={errors.subject} />

                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-2">
                                <label className="block mb-2 text-gray-700 font-bold">Message*</label>
                                <textarea 
                                    placeholder="Tell us how we can help..."
                                    value={formData.message}
                                    onChange={(e) => {
                                        handleInputChange("message", e.target.value)
        
                                        if(errors.message) {
                                            setErrors({...errors, message: null});
                                        }
                                    }}
                                    required
                                    rows={6}
                                    cols={40}
                                    className={`
                                        w-full px-4 py-3 rounded-lg border-2 text-gray-800
                                        focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                        placeholder:text-gray-400 transition-all duration-200 resize-none
                                        ${errors.message
                                            ? 'border-red-500 focus:border-red-500' 
                                            : 'border-gray-300 focus:border-yellow-400'
                                        }
                                    `}
                                
                                />
                                
                                {/* Error component */}
                                <ErrorMessage message={errors.message} />

                            </div>

                        </div>

                        {/* CTA submit button */}
                        <button 
                            type="submit"
                            className="
                                w-full py-4 mt-6 rounded-xl shadow-md
                                bg-yellow-400 text-yellow-900 text-lg font-bold
                                hover:bg-yellow-500 hover:shadow-lg hover:scale-[1.02]
                                transition-all duration-300" 
                        >
                            Send message
                        </button>

                    </form>
                </div>








            </div>




        </Section>
    )
}


export default ContactUsSection;