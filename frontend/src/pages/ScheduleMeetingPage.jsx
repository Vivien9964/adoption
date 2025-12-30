import Section from "../components/layout/Section";
import Button from "../components/common/Button";
import ProgressBar from "../components/scheduleMeeting/ProgressBar";
import StepSelectDog from "../components/scheduleMeeting/StepSelectDog";
import StepSelectTimeDate from "../components/scheduleMeeting/StepSelectTimeDate";
import StepAddInfo from "../components/scheduleMeeting/StepAddInfo";
import StepConfirmation from "../components/scheduleMeeting/StepConfirmation";
import { MeetingProvider, useMeeting } from "../context/MeetingContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScheduleMeetingContent = () => {

    // location object -> pathname, key 
    const location = useLocation();

    // Take step variables and functions from meeting context
    const { currentStep, 
            nextStep, 
            prevStep, 
            selectedDog, 
            selectedDate, 
            selectedTime, 
            userInfo, 
            submitMeeting,
            resetMeeting
        } = useMeeting();

    // State to track if user is currently submitting meeting appointment -> meaning they are at the confirmation stage
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Step labels for buttons
    const stepLabels = ["Choose a dog", "Date & Time", "Your Info", "Confirm"];


    // User only submits the meeting after confrimation which is on the fourth page,
    // otherwise the user just continues to go to the next step in the process
    const handleNextClick = async () => {
        if( currentStep === 4){
            setIsSubmitting(true);

            try {
                // Calling the submitMeeting function from the meeting context
                await submitMeeting(); 
                console.log("Meeting scheduled successfully!");

            } catch (err) {
                console.error("Failed to schedule meeting: ", err);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            nextStep();
        }
    }

    // Resets the meeting data to initial values when the user navigates
    // location.key changes every time at any link click!! 
    useEffect(() => {
        resetMeeting()
    },[location.key]);


    return (
        <>
        {/* Page title */}
        <div className="bg-white mt-8 flex flex-col justify-center items-center gap-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-700 font-bold">Schedule a meeting</h1>
            <p className="text-md text-gray-500">Book a time to meet your new best friend!</p>
        </div>
        <div className="h-px bg-yellow-300 mt-6"></div>

        {/* Main content  */}
        <Section padding="normal" background="blue" >

            {/* Progress bar -> always available to show progress in the process */}

            <ProgressBar currentStep={currentStep} />

            {/* Different content based on current step */}
            { currentStep === 1 && <StepSelectDog /> }
            { currentStep === 2 && <StepSelectTimeDate dog={selectedDog} /> }
            { currentStep === 3 && <StepAddInfo /> }
            { currentStep === 4 && <StepConfirmation /> }


            {/* CTA buttons container */}
            <div className="flex justify-center items-center gap-8 mt-8">

                {/* Button always available, just like progress bar but it is disabled until user selects from options / adds data */}
                <Button 
                    variant="primary" 
                    onClick={handleNextClick}
                    disabled={
                        (currentStep === 1 && !selectedDog) ||
                        (currentStep === 2 && (!selectedDate || !selectedTime)) ||
                        (currentStep === 3 && (!userInfo.name || !userInfo.email || !userInfo.phone))
                    }
                >
                     { isSubmitting 
                        ? "Scheduling..." 
                        : currentStep >= 4 
                            ? "Schedule Meeting" 
                            : `Continue to ${stepLabels[currentStep]}`
                    }
                </Button>

                {/* Only show back button when on second step and further */}
                { currentStep > 1 && currentStep < 5 && (
                    <Button variant="secondary" onClick={prevStep}>
                        Back
                    </Button>
                )}
            </div>


        </Section>

        </>
    )
}


// Added wrapped content locally for better performance and cleaner code
const ScheduleMeetingPage = () => {

    return (

        <MeetingProvider>
            <ScheduleMeetingContent />
        </MeetingProvider>

    )
}


export default ScheduleMeetingPage;