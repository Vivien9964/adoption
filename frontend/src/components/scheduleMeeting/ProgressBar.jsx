import { Check } from 'lucide-react';

const ProgressBar = ({ currentStep }) => {

    // Objects to keep track of current step for conditional rendering
    const steps = [
        { stepNum: 1, label: "Choose a dog"},
        { stepNum: 2, label: "Choose a date"},
        { stepNum: 3, label: "Your Information"},
        { stepNum: 4, label: "Confirm meeting"}
    ];


    // 3 main styles are applied conditionally:
    // -> faint blue, base style for not yet completed steps 
    // -> yellow and brown, for current step
    // -> green for completed step

    return (
        // Main container for multiple step containers
        <div className="px-4 py-2 flex justify-center items-center gap-2 md:gap-6">

            {/* For each step, show the step number and the label */}
            {steps.map((step, index) => (
            <>
                {/* Round step container */}
                <div 
                    key={step.stepNum}
                    className="flex items-center gap-2 md:gap-3"
                >
                    {/* Round step number container -> animated transition between step number and check */}
                    <div className={`
                        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                        flex items-center justify-center rounded-full 
                        font-bold border-3 text-base sm:text-lg md:text-xl flex-shrink-0
                        transition-all duration-300

                        ${currentStep > step.stepNum ? 'animate-check' : ''}

                        ${currentStep > step.stepNum
                            ? 'bg-green-500 text-white border-green-500'
                            : currentStep === step.stepNum
                            ? 'bg-yellow-500 text-yellow-800 border-yellow-500'
                            : 'bg-gray-200 text-gray-500 border-gray-300'
                        }
                        
                        `}
                    >
                        {currentStep > step.stepNum ? <Check className='w-6 h-6' /> : step.stepNum }
                    </div>

                    {/* Step info, label -> shown only on large screens */}
                    <span className={`
                            hidden lg:block text-sm md:text-base font-medium text-gray-700
                            ${currentStep === step.stepNum ? 'text-gray-700': 'text-gray-500'}
                    `}>
                        {step.label}
                    </span>
                    
                    {/* Connection lines -> only between step containers  */}
                    { index < steps.length - 1 && (
                        <div className={
                            `w-8 sm:w-16 md:w-24 h-1 flex-shrink-0
                            ${currentStep > step.stepNum ? 'bg-green-500' : 'bg-sky-300/30'}
                        `}></div>
                    )}

                </div>


                </>
            ))}

        </div>
    )
}

export default ProgressBar;