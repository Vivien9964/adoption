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
    const [ isSubmitted, setIsSubmitted ] = useState(false);

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

            // Sending POST request to the backend with the previously created object as JSON
            // HTTP response
            const response = await fetch("http://localhost:3000/api/meetings", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(meetingData)
            });

            // Check if the communication with the backend was successfull
            if(!response.ok) {
                throw new Error("Failed to create meeting!");
            }

            // Confirmation from the backend -> did we save the data to the database?
            const result = await response.json();
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
            emial: "",
            phone: "",
            notes: ""
        });
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
        isSubmitted
    }


    return (
        <MeetingContext.Provider value={contextValue} >
            { children }
        </MeetingContext.Provider>
    )



}