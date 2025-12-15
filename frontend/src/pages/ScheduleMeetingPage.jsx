import Section from "../components/layout/Section";
import Button from "../components/common/Button";
import Filter from "../components/layout/Filter";
import PetCardDogsPage from "../components/pets/PetCardDogsPage";
import { usePets } from "../context/PetsContext";
import { useState } from "react";

const ScheduleMeetingPage = () => {

    // Take and use filterDogs function from context
    const { filterDogs } = usePets();
    const filteredDogs = filterDogs();

    // State to track the current step in the process -> for progress bar (1, 2, 3)
    const [ currentStep, setCurrentStep ] = useState(1);

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


    // Functions to navigate between steps
    const nextStep = () => {
        if(currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };


    const prevStep = () => {
        if(currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
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

            {/* Filter component */}
            <Filter />














            {/* Step 1 -> show and choose a dog - Step 1 container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6">

                {filteredDogs.map((dog) => (
                    <PetCardDogsPage key={dog.id} dog={dog} />
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