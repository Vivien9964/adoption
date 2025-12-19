import { createContext, useContext, useState } from "react";

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
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

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
        prevStep
    }


    return (
        <MeetingContext.Provider value={contextValue} >
            { children }
        </MeetingContext.Provider>
    )



}