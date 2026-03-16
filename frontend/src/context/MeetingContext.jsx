import { createContext, useContext, useState } from "react";
import { createMeeting } from "../services/api";
import { validateName, validateEmail, validatePhone } from "../utils/validationRules";

const MeetingContext = createContext();

// Custom hook to simplify context use
export const useMeeting = () => {
    const context = useContext(MeetingContext);

    if(!context) {
        throw new Error("Component must be wrapped by MeetingProvider!");
    }

    return context;
}

export const MeetingProvider = ({ children }) => {

    // State variables to store meeting data
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ selectedDog, setSelectedDog ] = useState(null)
    const [ selectedDate, setSelectedDate ] = useState(null)
    const [ selectedTime, setSelectedTime ] = useState(null);
    const [ userInfo, setUserInfo ] = useState({
        name: "",
        email: "",
        phone: "",
        notes: ""
    });
    const [ isSubmitted, setIsSubmitted ] = useState(false);

    // State to store errors for user info validation
    const [ errors, setErrors ] = useState({});

    // Change handler for fields in user info
    // Follows the same pattern as useFormValidation (handleChange function)
    const handleChange = (field, value) => {
        setUserInfo((prev) => ({
            ...prev,
            [field]: value
        }));

        // If user starts correcting their input clear the errors
        if(errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: null
            }));
        }
    };


    // Function to validate inputs using validationRules.js
    // validateName, validateEmail and validatePhone ensures identical validation through all forms
    const validateUserInfo = () => {
        const formErrors = {};

        // Validate name input
        const nameError = validateName(userInfo.name);
        if(nameError) {
            formErrors.name = nameError;
        }

        // Validate email input
        const emailError = validateEmail(userInfo.email);
        if(emailError) {
            formErrors.email = emailError;
        }

        // Validate phone input
        const phoneError = validatePhone(userInfo.phone);
        if(phoneError) {
            formErrors.phone = phoneError;
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };



    const nextStep = () => {
        if(currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if(currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    // Function to send the meeting data to the database
    const submitMeeting = async () => {
        try {

            // Creating an object which contains all relevant meeting data 
            const meetingData = {
                dogUuid: selectedDog.uuid,
                dogName: selectedDog.name,
                dogBreed: selectedDog.breed,
                dogImage: selectedDog.mainImage,
                dogLocation: selectedDog.location,
                meetingDate: selectedDate,
                meetingTime: selectedTime,
                userName: userInfo.name,
                userEmail: userInfo.email,
                userPhone: userInfo.phone,
                notes: userInfo.notes || ""
            };

            const result = await createMeeting(meetingData);
            console.log("Meeting created successfully!", result);
            setIsSubmitted(true);

            return result;

        } catch(err) {
            console.error("Error creating meeting: ", err);
            throw err;
        }
    }


    // Function to reset meeting data when user leaves at one point during the scheduling process
    const resetMeeting = () => {
        setCurrentStep(1);
        setSelectedDog(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setUserInfo({
            name: "",
            email: "",
            phone: "",
            notes: ""
        });
        setErrors({});
        setIsSubmitted(false);
    }


    const contextValue = {
        currentStep,
        setCurrentStep,
        selectedDog,
        setSelectedDog,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        userInfo,
        setUserInfo,
        nextStep,
        prevStep,
        submitMeeting,
        resetMeeting,
        isSubmitted,
        handleChange,
        validateUserInfo,
        errors
    }


    return (
        <MeetingContext.Provider value={contextValue} >
            { children }
        </MeetingContext.Provider>
    )



}