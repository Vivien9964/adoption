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

    const submitMeeting = async () => {
        try {
            const meetingData = {
                dogId: selectedDog.id,
                dogName: selectedDog.name,
                dogBreed: selectedDog.breed,
                dogImage: selectedDog.mainImage,
                dogLocation: selectedDog.location,
                meetingDate: selectedDate,
                meetingTime: selectedTime,
                userName: userInfo.name,
                userEmail: userInfo.email,
                userPhone: userInfo.phone,
                notes: userInfo.notes || ''
            };

            const response = await fetch("http://localhost:3000/api/meetings", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(meetingData)
            });

            if(!response.ok) {
                throw new Error("Failed to create meeting!");
            }

            const result = await response.json();
            console.log("Meeting created successfully!", result);
            return result;

        } catch(err) {
            console.error("Error creating meeting: ", err);
            throw err;
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
        prevStep,
        submitMeeting
    }


    return (
        <MeetingContext.Provider value={contextValue} >
            { children }
        </MeetingContext.Provider>
    )



}