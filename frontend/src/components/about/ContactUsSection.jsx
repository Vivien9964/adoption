import Section from "../layout/Section";
import { validateName, validateEmail, PATTERNS } from "../../utils/validationRules";
import useFormValidation from "../../hooks/useFormValidation";
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
const ErrorMessage = ({ message, id }) => {
    if(!message) {
        return null;
    }

    return (
        <p  
            id={id}
            role="alert"
            className="mt-2 text-sm text-yellow-900 flex items-center gap-1"
        >
            <span aria-hidden="true"><CircleAlert /></span>
            <span>{message}</span>

        </p>
    );
}


// Validation schema for contact form
// subject and message validation rules are defined inside the schema, 
// no need to put them inside validationRules.js, because they are unique to the component
const contactValidationSchema = {
    name: validateName,
    email: validateEmail,

    subject: (value) => {
        const trimmed = (value || "").trim();

        if(!trimmed) {
            return "Subject is required!";
        }

        if(trimmed.length < 5) {
            return "Subject is too short!";
        }

        return null;
    },

    message: (value) => {
        const trimmed = (value || "").trim();

        if(!trimmed) {
            return "Message is required!";
        }

        if(trimmed.length < 10) {
            return "Message must be at least 10 characters!";
        }

        if(trimmed.length > 1000) {
            return "Message is too long (max 1000 characters)!";
        }

        return null;
    }
}




const ContactUsSection = () => {

    const { formData, errors, handleChange, validate, resetForm } = useFormValidation({
        name: "",
        email: "",
        subject: "",
        message: ""
    }, contactValidationSchema);

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


    // Funtion to submit contact form with validation first
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // If validation fails, return
        if(!validate()) return;

        // If validation passes, reset the form
        resetForm();
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
                        aria-label="Contact form"
                    >

                    {/* User data group */}
                    <fieldset className="m-0 p-0 border-0">

                        <div className="flex flex-col md:flex-row justify-between gap-4">

                            {/* Name input */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label 
                                    htmlFor="contact-name"
                                    className="block mb-2 text-gray-700 font-bold">Full Name:*</label>
                                <input
                                    id="contact-name" 
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Johhny Doe"
                                    value={formData.name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        
                                        if(PATTERNS.nameInput.test(value)) {
                                            handleChange("name", value);
                                        }
                                    }}
                                    required
                                    aria-invalid={errors.name ? "true" : "false"}
                                    aria-describedby={errors.name ? "name-error" : undefined}
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
                                <ErrorMessage message={errors.name} id="name-error" />

                            </div>

                            {/* Email input */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label 
                                    htmlFor="contact-email"
                                    className="block mb-2 text-gray-700 font-bold">Email:*</label>
                                <input 
                                    id="contact-email"
                                    type="email" 
                                    autoComplete="email"
                                    placeholder="example@example.com"
                                    value={formData.email}
                                    onChange={(e) => {
                                        handleChange("email", e.target.value);
                                    }}
                                    required
                                    aria-invalid={errors.email ? "true" : "false"}
                                    aria-describedby={errors.email ? "email-error" : undefined}
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
                                <ErrorMessage message={errors.email} id="email-error" />

                            </div>
                        </div>
                    </fieldset>

                       
                        {/* Subject and message group */}
                        <div className="flex flex-col gap-4">

                            {/* Subject */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="contact-subject" 
                                    className="block my-2 text-gray-700 font-bold">Subject:*</label>
                                <input
                                    id="contact-subject" 
                                    type="text" 
                                    placeholder="Volunteering..."
                                    value={formData.subject}
                                    onChange={(e) => {
                                        handleChange("subject", e.target.value)
                                    }}
                                    required
                                    aria-invalid={errors.subject ? "true" : "false"}
                                    aria-describedby={errors.subject ? "subject-error" : undefined}
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
                                <ErrorMessage message={errors.subject} id="subject-error" />

                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="contact-message" 
                                    className="block mb-2 text-gray-700 font-bold">Message:*</label>
                                <textarea 
                                    id="contact-message"
                                    placeholder="Tell us how we can help..."
                                    value={formData.message}
                                    onChange={(e) => {
                                        handleChange("message", e.target.value)
                                    }}
                                    required
                                    rows={6}
                                    cols={40}
                                    maxLength={2000}
                                    aria-invalid={errors.message ? "true" : "false"}
                                    aria-describedby={errors.message ? "message-error" : undefined}
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

                                <span className="text-sm text-gray-600">
                                    {formData.message.length} / 2000
                                </span>
                                
                                {/* Error component */}
                                <ErrorMessage message={errors.message} id="message-error" />

                            </div>

                        </div>

                        {/* CTA submit button */}
                        <button 
                            type="submit"
                            aria-label="Send contact message"
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