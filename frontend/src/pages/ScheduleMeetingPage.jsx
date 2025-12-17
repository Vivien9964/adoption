import Section from "../components/layout/Section";
import Button from "../components/common/Button";
import ProgressBar from "../components/scheduleMeeting/ProgressBar";
import StepSelectDog from "../components/scheduleMeeting/StepSelectDog";
import { MeetingProvider, useMeeting } from "../context/MeetingContext";

const ScheduleMeetingContent = () => {

    // Take step variables and functions from meeting context
    const { currentStep, nextStep, prevStep, selectedDog} = useMeeting();

    // Step labels for buttons
     const stepLabels = ["Choose a dog", "Date & Time", "Your Info", "Confirm"];


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
            { currentStep === 2 && <div>Step 2: Date & Time</div> }
            { currentStep === 3 && <div>Step 3: Your Info</div> }
            { currentStep === 4 && <div>Step 4: Confirm meeting</div> }


            {/* CTA buttons container */}
            <div className="flex justify-center items-center gap-8 mt-8">

                {/* Button always available, just like progress bar but it is disabled until user selects from options / adds data  
                    !! need to update after done with date, time, user info contents !!
                */}
                <Button 
                    variant="primary" 
                    onClick={nextStep}
                    disabled={currentStep === 1 && !selectedDog}
                >
                    {currentStep >= 4 ? "Schedule Meeting" : `Continue to ${stepLabels[currentStep]}`}
                </Button>

                {/* Only show back button when on second step and further */}
                { currentStep > 1 && (
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