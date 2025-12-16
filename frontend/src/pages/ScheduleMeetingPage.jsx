import Section from "../components/layout/Section";
import Button from "../components/common/Button";
import ProgressBar from "../components/scheduleMeeting/ProgressBar";
import Filter from "../components/layout/Filter";
import PetCardMeeting from "../components/pets/PetCardMeeting";
import PetCardDogsPage from "../components/pets/PetCardDogsPage";
import { usePets } from "../context/PetsContext";
import { useState } from "react";

const ScheduleMeetingPage = () => {

    // Take and use filterDogs function from context
    const { filterDogs } = usePets();
    const filteredDogs = filterDogs();

    // State to track the current step in the process -> for progress bar (1, 2, 3, 4)
    const [ currentStep, setCurrentStep ] = useState(1);

     // Step labels for buttons
     const stepLabels = ["Choose a dog", "Date & Time", "Your Info", "Confirm"];

    // State to track selected data at each step
    const [ selectedDog, setSelectedDog ] = useState(null)
    const [ selectedDate, setSelectedDate ] = useState(null)
    const [ selectedTime, setSelectedTime ] = useState(null);
    const [ userInfo, setUserInfo ] = useState( {
        name: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [ userConfirmed, setUserConfirmed ] = useState(false);


    // Functions to navigate between steps
    const nextStep = () => {
        if(currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };


    const prevStep = () => {
        if(currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    const confirmation = () => {
        setUserConfirmed(true);
    }


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


            {/* Always available to show progress in the process */}
            <ProgressBar currentStep={currentStep} />







            <div className="flex justify-center items-center gap-8 mt-8">


                <Button variant="primary" onClick={nextStep}>
                    {`${currentStep > 3 ? "Schedule Meeting" : `Continue to ${stepLabels[currentStep]}`}`}
                </Button>

                { currentStep > 1 && (
                    <Button variant="secondary" onClick={prevStep}>
                        Back
                    </Button>
                )}

                

            </div>

           















            {/* Step 1 -> show and choose a dog - Step 1 container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6">

                {filteredDogs.map((dog) => (
                    <PetCardMeeting key={dog.id} dog={dog} />
                ))}


                {filteredDogs.length === 0 && (
                    <div>
                        <p>No dogs match!</p>
                    </div>
                )}

            </div>



        </Section>

        </>
    
    )
}

export default ScheduleMeetingPage;