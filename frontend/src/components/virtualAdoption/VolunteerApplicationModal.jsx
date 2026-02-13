import { useState, useEffect } from "react";
import { X } from "lucide-react";


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
            <h3 className="mb-2 text-center text-3xl font-bold text-yellow-900">
                {opportunity.title}
            </h3>

            {/* About this role section */}
            <div className="p-6 rounded-xl shadow-md">
                <h2 className="mb-2 text-lg font-bold text-gray-800">
                    About your role
                </h2>
                <p className="text-gray-500">
                    {opportunity.description}
                </p>
            </div>

            {/* What you will do */}
            <div className="p-6 rounded-xl shadow-md">
                <h2 className="mb-2 text-lg font-bold text-gray-800">
                    About your role
                </h2>

                <ul className="list-disc">
                <div className="px-8">
                {opportunity.responsibilities.map((resp, index) => (
                    <li 
                        key={index}
                    >
                            {resp}
                    </li>
                ))}
                </div>
                </ul>

            </div>

            {/* Commitment */}
            <div className="p-6 rounded-xl shadow-md">
            <h2 className="mb-2 mt-6 text-lg font-bold text-gray-800">
                Time commitment
            </h2>
            <div>
                {opportunity.commitment.split(".").length > 1 ? (
                    <>
                    <p>{opportunity.commitment.split(".")[0]}</p>
                    <p>{opportunity.commitment.split(".")[1]}</p>
                    </>
                ) : (
                    <p>{opportunity.commitment}</p>
                )}
            </div>
            </div>

            {/* Requirements */}
            <div className="p-6 rounded-xl shadow-md">
                <h2 className="mb-2 mt-6 text-lg font-bold text-gray-800">
                    Requirements
                </h2>
                <ul className="list-disc">
                    {opportunity.requirements.map((req, index) => (
                        <li key={index}>
                            {req}
                        </li>
                    ))}
                </ul>
            </div>


            {/* Benefits */}
            <div className="p-6 rounded-xl shadow-md">
                <h2 className="mb-2 mt-6 text-lg font-bold text-gray-800">
                    Benefits
                </h2>
                <ul className="list-disc">
                    {opportunity.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                    ))}
                </ul>
            </div>

            <button onClick={onApply}>
                Apply now
            </button>

        </div>
    );
}



const OpportunityApplicationView = ({ opportunity, onClose, onSubmit, onBack, formData, setFormData }) => {

    // Volunteer avaliability options for checkboxes
    const availabilityOptions = [
        { value: 'morning', label: 'Morning (8:00 AM - 12:00 PM)' },
        { value: 'afternoon', label: 'Afternoon (12:00 PM - 4:00 PM)' },
        { value: 'evening', label: 'Evening (4:00 PM - 8:00 PM)' },
        { value: 'weekends', label: 'Weekends' },
        { value: 'flexible', label: 'Flexible' }
    ];

    // Function to update form data
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    }


    const handleAvailabilityChange = (option) => {
        setFormData((prev) => ({
            ...prev,
            availability: prev.availability.includes(option)
            ? prev.availability.filter((item) => item !== option)
            : [...prev.availability, option]
        }));
    }

    const handleSubmit = (e) => {
        e.preventdefault();

        if (!formData.fullName || !formData.email || !formData.phone) {
            alert("Fill in all required fields");
            return;
        }

        if (formData.availability.length === 0) {
            alert("Select at least one availability option");
            return;
        }

        
        onSubmit();
    }


    return( 
        <div className="p-8">
            {/* Title */}
            <h3>Volunteer application - {opportunity.title}</h3>

            {/* Application form */}
            <form>

                {/* Personal information */}
                <div>
                    <h3>Your information</h3>

                    {/* Name */}
                    <div>
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="Bingi Bungusz"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="example2@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label>Phone</label>
                        <input 
                            type="tel" 
                            placeholder="+407705698745"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>

                    {/* Availability */}
                    <div>
                        <label>Your Availability</label>
                        <div>
                            {availabilityOptions.map((option) => (
                                <label key={option.value}>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.availability.includes(option.value)}
                                        onChange={() => handleAvailabilityChange(option.value)}
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>

                    </div>



                </div>

            </form>

        </div>
    )
}




const VolunteerApplicationModal = ({ isOpen, onClose, opportunity }) => {

    const [ currentView, setCurrentView ] = useState("details");
    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        availability: [],
        motivation: "",
        experience: "",
        skills: ""
    });

    useEffect(() => {
        if(!isOpen) {
            setCurrentView("details");
            setFormData({
                name: "",
                email: "",
                phone: "",
                age: "",
                availability: [],
                motivation: "",
                experience: "",
                skills: ""
            });
        }

    }, [isOpen]);


    if(!isOpen) return null;


    return (
        <div 
            className="p-4 fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >

            <div 
                className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar rounded-2xl bg-white"
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
                            onBack={() => setCurrentView("application")}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}

            </div>
        </div>
    );
}

export default VolunteerApplicationModal;