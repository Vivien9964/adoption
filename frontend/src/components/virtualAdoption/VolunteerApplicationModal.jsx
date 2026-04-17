import { useState, useEffect } from "react";
import { submitVolunteerApplication } from "../../services/api";
import { validateName, validateEmail, validatePhone, PATTERNS } from "../../utils/validationRules";
import useFormValidation from "../../hooks/useFormValidation";
import { X, Check, Briefcase, CheckSquare, Clock, FileCheck, Gift, User, CircleEllipsis, CircleAlert, Calendar } from "lucide-react";



const isOneTimeEvent = (opportunity) => {
    return opportunity?.isOneTimeEvent === true;
}

const OpportunityDetailsView = ({ opportunity, onApply, onClose }) => {

    return (
        // Opportunity details main container
        <div className="p-8">

                {/* Close button */}
                <button
                    className="
                        p-2 absolute top-4 right-4 z-10 rounded-full 
                        bg-yellow-300 hover:bg-yellow-400 hover:scale-102 transition-all duration-300
                    "
                    onClick={onClose}
                >
                    <X className="w-6 h-6 text-yellow-900 font-bold" />
                </button>

            {/* Title */}
            <h3 className="mb-6 text-center text-3xl font-bold text-yellow-900">
                {opportunity.title}
            </h3>

            {/* About this role section */}
            <div className="mb-6 p-6 rounded-xl shadow-md bg-yellow-50 border-2 border-yellow-200">
                <h2 className="mb-4 flex items-center gap-4 text-lg font-bold text-gray-800">
                    <Briefcase className="h-6 w-6 text-yellow-800" />
                    What you will do
                </h2>
                <p className="text-gray-500">
                    {opportunity.description}
                </p>
            </div>

            {/* What you will do */}
            <div className="mb-6 p-6 rounded-xl shadow-md bg-yellow-50 border-2 border-yellow-200">
                <h2 className="mb-4 flex items-center gap-4 text-lg font-bold text-gray-800">
                    <CheckSquare className="h-6 w-6 text-yellow-800" />
                    Your responsibilities
                </h2>

                <ul className="list-disc pl-6 space-y-2">
                {opportunity.responsibilities.map((resp, index) => (
                    <li 
                        key={index}
                        className="text-gray-700"
                    >
                        {resp}
                    </li>
                ))}
                </ul>

            </div>

            {/* Commitment */}
            <div className="mb-6 p-6 rounded-xl shadow-md bg-yellow-50 border-2 border-yellow-200">
            <h2 className="mb-4 flex items-center gap-4 text-lg font-bold text-gray-800">
                <Clock className="h-6 w-6 text-yellow-800" />
                {isOneTimeEvent(opportunity) ? "Event details" : "Time commitment"}
            </h2>
            <div className="text-gray-700">
                {isOneTimeEvent(opportunity) ? (
                    <div className="space-y-2">
                        <p><strong>Date:</strong> {opportunity.date}</p>
                        <p><strong>Time:</strong> {opportunity.time}</p>
                        <p><strong>Location:</strong> {opportunity.location}</p>
                    </div>
                ) : (

                    opportunity.commitment.split(".").length > 1 ? (
                        <>
                        <p>{opportunity.commitment.split(".")[0]}</p>
                        <p>{opportunity.commitment.split(".")[1]}</p>
                        </>
                    ) : (
                        <p>{opportunity.commitment}</p>
                    )
                )}

               
            </div>
            </div>

            {/* Requirements */}
            <div className="mb-6 p-6 rounded-xl shadow-md bg-yellow-50 border-2 border-yellow-200">
                <h2 className="mb-4 flex items-center gap-4 text-lg font-bold text-gray-800">
                    <FileCheck className="h-6 w-6 text-yellow-800" />
                    Requirements
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                    {opportunity.requirements.map((req, index) => (
                        <li 
                            key={index}
                            className="text-gray-700"
                        >
                            {req}
                        </li>
                    ))}
                </ul>
            </div>


            {/* Benefits */}
            <div className="mb-6 p-6 rounded-xl shadow-md bg-yellow-50 border-2 border-yellow-200">
                <h2 className="mb-4 flex items-center gap-4 text-lg font-bold text-gray-800">
                    <Gift className="h-6 w-6 text-yellow-800" />
                    Benefits
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                    {opportunity.benefits.map((benefit, index) => (
                        <li 
                            key={index}
                            className="text-gray-700"
                        >
                            {benefit}
                        </li>
                    ))}
                </ul>
            </div>

            <button 
                onClick={onApply}
                className="
                    w-full py-4 mt-6 rounded-xl shadow-md
                    bg-yellow-400 text-yellow-900 text-lg font-bold
                    hover:bg-yellow-500 hover:shadow-lg hover:scale-102
                    transition-all duration-300
                "
            >
                Apply now
            </button>

        </div>
    );
}


// Error message component to show after validation
const ErrorMessage = ({ message }) => {
    if(!message) return null;

    return (
        <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
            <CircleAlert className="h-4 w-4" />
            <span>{message}</span>
        </p>
    )
}



const OpportunityApplicationView = ({ opportunity, onClose, onSubmit, onBack, formData, handleChange, errors, setErrors, validate, onApplicationSuccess }) => {

    // Volunteer availability options for checkboxes
    const availabilityOptions = [
        { value: 'morning', label: 'Morning (8:00 AM - 12:00 PM)' },
        { value: 'afternoon', label: 'Afternoon (12:00 PM - 4:00 PM)' },
        { value: 'evening', label: 'Evening (4:00 PM - 8:00 PM)' },
        { value: 'weekends', label: 'Weekends' },
        { value: 'flexible', label: 'Flexible' }
    ];

    const [ serverError, setServerError ] = useState("");
    const [ isSubmitting, setIsSubmitting ] = useState(false);


    // Function to handle availability change
    const handleAvailabilityChange = (option) => {
        const newAvailability = formData.availability.includes(option)
            ? formData.availability.filter((item) => item !== option)
            : [...formData.availability, option];

        handleChange("availability", newAvailability);
    }

    
    // Function to handle application submission
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!validate()) return;
       
        setServerError("");
        setIsSubmitting(true);

        try {

            await submitVolunteerApplication({
                opportunityId: opportunity.id,
                opportunityTitle: opportunity.title,
                isOneTimeEvent: isOneTimeEvent(opportunity),
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                availability: formData.availability,
                motivation: formData.motivation,
                experience: formData.experience
            });

            onSubmit();

            if (isOneTimeEvent(opportunity) && onApplicationSuccess) {
                onApplicationSuccess(opportunity.id);
            }

        } catch(error) {

            if(error.status === 409) {
                setServerError(error.message);
            } else if(error.status === 400 && error.fields) {
                setErrors(error.fields);
            } else {
                setServerError("Something went wrong! Try again later!");
            }
        } finally {
            setIsSubmitting(false);
        }
    }


    return( 
        // Main container for application view 
        <div className="p-8">
            {/* Title */}
            <h3 className="mb-8 text-xl md:text-2xl font-bold text-center text-gray-800">
                Volunteer application - {opportunity.title}
            </h3>

            {/* Application form */}
            <form onSubmit={handleSubmit}>

                {/* Personal information */}
                <div className="mb-6">
                    <h3 className="mb-4 flex items-center gap-4">
                        <User className="p-2 h-10 w-10 rounded-full text-yellow-900 bg-yellow-400" />
                        <span className="text-lg md:text-xl text-gray-700 font-bold">
                            Your Information
                        </span>
                    </h3>

                    {/* Name */}
                    <div className="mb-6">
                        <label className="mb-4 text-lg font-semibold text-gray-800">
                            Full Name*
                        </label>
                        <input 
                            type="text" 
                            placeholder="Bingi Bungusz"
                            value={formData.name}
                            onChange={(e) => {
                                const value = e.target.value;

                                if(PATTERNS.nameInput.test(value)) {
                                    handleChange("name", value);
                                }
                            }}
                            required
                            className={`
                                mt-2 w-full px-4 py-3 rounded-lg
                                border-2 border-gray-300 text-gray-800
                                focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200
                                ${errors.name 
                                    ? 'border-red-500 focus:border-red-500' 
                                    : 'border-gray-300 focus:border-yellow-400'                                    
                                }
                            `}
                        />
                        <ErrorMessage message={errors.name} />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label className="mb-4 text-lg font-semibold text-gray-800">
                            Email*
                        </label>
                        <input 
                            type="email" 
                            placeholder="example2@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                            className={`
                                mt-2 w-full px-4 py-3 rounded-lg
                                border-2 text-gray-800
                                focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200
                                ${errors.email 
                                    ? 'border-red-500 focus:border-red-500' 
                                    : 'border-gray-300 focus:border-yellow-400'
                                }`
                            }
                        />
                        <ErrorMessage message={errors.email} />
                    </div>

                    {/* Phone */}
                    <div className="mb-6">
                        <label className="mb-4 text-lg font-semibold text-gray-800">
                            Phone*
                        </label>
                        <input 
                            type="tel" 
                            placeholder="+407705698745"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            required
                            className={`
                                mt-2 w-full px-4 py-3 rounded-lg
                                border-2 text-gray-800
                                focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200
                                ${errors.phone 
                                    ? 'border-red-500 focus:border-red-500' 
                                    : 'border-gray-300 focus:border-yellow-400'
                                }`
                            }
                        />
                        <ErrorMessage message={errors.phone} />
                    </div>

                    {/* Availability for long term volunteering */}
                    {!isOneTimeEvent(opportunity) && (

                        <div className="mb-6">

                        <h3 className="mb-4 flex items-center gap-4">
                            <Calendar className="p-2 h-10 w-10 rounded-full text-yellow-900 bg-yellow-400" />
                            <span className="text-lg md:text-xl text-gray-700 font-bold">
                                Availability
                            </span>
                        </h3>

                        <div className="mt-2 space-y-3">
                            {availabilityOptions.map((option) => (
                                <label 
                                    key={option.value}
                                    className="
                                        flex items-center p-3 rounded-lg
                                        border-2 border-gray-200 cursor-pointer
                                        hover:border-yellow-300 hover:bg-yellow-50 transition-all"
                                >
                                    <input 
                                        type="checkbox" 
                                        checked={formData.availability.includes(option.value)}
                                        onChange={() => handleAvailabilityChange(option.value)}
                                        className="
                                            mr-3 w-5 h-5 rounded cursor-pointer
                                            text-yellow-400 focus:ring-yellow-400"
                                    />
                                    <span className="text-gray-700 font-medium">{option.label}</span>
                                </label>
                            ))}
                        </div>
                        <ErrorMessage message={errors.availability} />
                        </div>
                    )}

                    {/* Confirmation for one-time opportunities */}
                    {isOneTimeEvent(opportunity) && (
                        <div className="mb-6 p-6 rounded-xl shadow-md bg-yellow-50 border-2 border-yellow-200">
                            <h3 className="mb-4 flex items-center gap-4">
                                <Calendar className="h-6 w-6 text-yellow-800" />
                                <span className="text-lg font-bold text-gray-800">
                                    Event confirmation
                                </span>
                            </h3>
                            <div className="space-y-2 text-gray-700">
                                <p><strong>Date:</strong> {opportunity.date}</p>
                                <p><strong>Time:</strong> {opportunity.time}</p>
                                <p><strong>Location:</strong> {opportunity.location}</p>
                                <p className="mt-4 text-sm text-gray-600">
                                    By submitting this application, you confirm that you are available  for the entire event duration.
                                </p>

                            </div>
                        </div>
                    )}
                    

                    <h3 className="mb-4 flex items-center gap-4">
                        <CircleEllipsis className="p-2 h-10 w-10 rounded-full text-yellow-900 bg-yellow-400" />
                        <span className="text-lg md:text-xl text-gray-700 font-bold">
                            Tell us more
                        </span>
                    </h3>

                    
                    {/* Motivation */}
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-semibold text-gray-800">
                            Why do you want to volunteer?
                        </label>
                        <textarea 
                            value={formData.motivation}
                            onChange={(e) => handleChange("motivation", e.target.value)}
                            rows="4"
                            className="
                                w-full p-4 border-2 border-gray-300 rounded-lg text-gray-800
                                focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200 resize-none"
                        />
                    </div>

                    {/* Previous experience, if any */}
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-semibold text-gray-800">
                            If you worked with dogs previously, you can tell us about your experience below!
                        </label>
                        <textarea 
                            value={formData.experience}
                            onChange={(e) => handleChange("experience", e.target.value)}
                            rows="3"
                            className="
                                w-full p-4 border-2 border-gray-300 rounded-lg text-gray-800
                                focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200 resize-none"
                        />
                    </div>

                    {serverError && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 border-2 border-red-200">
                            <p className="text-red-600 text-center font-semibold">
                                {serverError}
                            </p>
                        </div>
                    )}

                    {/* CTA buttons */}
                    <div className="flex justify-center gap-4">
                        {/* Navigate back */}
                        <button
                            type="button"
                            onClick={onBack}
                            className="
                                px-8 py-3 rounded-lg shadow-md
                                bg-gray-300 text-gray-700 
                                hover:bg-gray-400 hover:scale-102
                                transition-all duration-300"
                        >
                            Back
                        </button>

                        {/* Apply to position */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                px-8 py-3 rounded-xl font-bold shadow-md
                                transition-all duration-300
                                ${isSubmitting
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 hover:scale-102"
                                }`
                            }
                        >
                            {isSubmitting ? "Submitting..." : "Submit application"}
                        </button>
                    </div>
                </div>

            </form>

        </div>
    )
}


const ApplicationSuccessView = ({ opportunity, formData, onClose }) => {

    return (
        <div className="p-8 text-center">

            {/* Close button */}
            <button
                onClick={onClose}
                className="
                    p-2 absolute top-4 right-4 z-10 rounded-full
                    bg-yellow-300 hover:bg-yellow-400"   
            >
                <X className="w-6 h-6 text-yellow-900 font-bold" />

            </button>

            {/* Success message with success icon */}
            <div className="mb-6">
                {/* Success icon */}
                <div className="mb-6 w-25 h-25 mx-auto flex items-center justify-center rounded-full bg-green-500">
                    <Check className="w-20 h-20 text-white font-bold"/>
                </div>

                {/* Success message */}
                <h2 className="mb-4 text-3xl font-bold text-gray-800">
                    Application submitted!
                </h2>
                <p className="text-lg text-gray-600">
                    Thank you for applying to be a <strong className="text-gray-800">{opportunity.title}</strong>!
                </p>
            </div>

            {/* Application summary */}
            <div className="
                mb-6 p-6 rounded-xl shadow-md text-left
                bg-yellow-50 border-2 border-yellow-200"
            >
                <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                    Application summary
                </h3>
                <div  className="space-y-2">
                    <p className="text-gray-700"><strong>Name:</strong> {formData.name}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {formData.email}</p>
                    <p className="text-gray-700"><strong>Phone:</strong> {formData.phone}</p>

                    {/* Availability is shown only for long term applicants */}
                    {isOneTimeEvent(opportunity) && formData.availability.length > 0 && (
                         <p className="text-gray-700">
                            <strong>Availability:</strong> {formData.availability.join(', ')}
                        </p>
                    )}

                    {isOneTimeEvent(opportunity) && (
                        <div className="mt-2 pt-2 border-t border-yellow-300">
                        <p className="text-gray-700"><strong>Event:</strong> {opportunity.title}</p>
                        <p className="text-gray-700"><strong>Date:</strong> {opportunity.date}</p>
                        <p className="text-gray-700"><strong>Time:</strong> {opportunity.time}</p>
                      </div>
                    )}
                   
                </div>
               
            </div>

            {/* Next steps in the process */}
            <div className="mb-6 text-gray-600">
                <p className="mb-4 ">

                    {isOneTimeEvent(opportunity) 
                        ? "We have received your application! You will receive a confirmation email with event details soon!"
                        : "We will review your application and get back to you soon!"
                    } 
                </p>

                <button 
                    onClick={onClose}
                    className="
                        px-8 py-4 rounded-xl font-bold shadow-md
                        bg-yellow-400 text-yellow-900
                        hover:bg-yellow-500 hover:scale-102
                        transition-all duration-300"
                >
                    Close
                </button>

            </div>



        </div>
    )
}




const VolunteerApplicationModal = ({ isOpen, onClose, opportunity, onApplicationSuccess }) => {

    // State to keep track of current modal view
    const [ currentView, setCurrentView ] = useState("details");

    // Validation schema
    // It needs to be inside the component because the availability validator
    // depends on the opportunity prop to check if it is a one-time event
    const volunteerValidationSchema = {
        name: validateName,
        email: validateEmail,
        phone: validatePhone,
        availability: (value) => {
            if(!isOneTimeEvent(opportunity) && (!value || value.length === 0)) {
                return "Select at least one availability option!";
            }

            return null;
        }
    };

    // Taking necessary data / functions from custom hook
    const { formData, setFormData, errors, setErrors, handleChange, validate, resetForm } = useFormValidation({
        name: "",
        email: "",
        phone: "",
        availability: [],
        motivation: "",
        experience: ""
    }, volunteerValidationSchema); 

    // Reset form on close
    useEffect(() => {
        if(!isOpen) {
            setCurrentView("details");
            resetForm();
        }

    }, [isOpen]);

    useEffect(() => {
        if(isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);


    if(!isOpen) return null;

    return (
        <div 
            className="p-4 fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={ currentView === "application" || currentView === "feedback" ? undefined : onClose}
        >

            <div 
                className="
                    relative max-w-2xl w-full max-h-[90vh] 
                    overflow-y-auto hide-scrollbar overscroll-contain
                    rounded-2xl bg-white"
                onClick={(e) => e.stopPropagation()}
            >

                    {currentView === "details" && (
                        <OpportunityDetailsView 
                            opportunity={opportunity}
                            onClose={onClose}
                            onApply={() => setCurrentView("application")}
                        />
                    )}

                    {currentView === "application" && (
                        <OpportunityApplicationView
                            opportunity={opportunity}
                            onClose={onClose}
                            onSubmit={() => setCurrentView("feedback")}
                            onBack={() => setCurrentView("details")}
                            formData={formData}
                            handleChange={handleChange}
                            errors={errors}
                            setErrors={setErrors}
                            validate={validate}
                            onApplicationSuccess={onApplicationSuccess}
                        />
                    )}

                    {currentView === "feedback" && (
                        <ApplicationSuccessView 
                            opportunity={opportunity}
                            formData={formData}
                            onClose={onClose}
                        />
                    )}

            </div>
        </div>
    );
}

export default VolunteerApplicationModal;