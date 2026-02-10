import { Check } from "lucide-react";


const DonationSuccessCard = ({ isOpen, onClose, amount, target, isMonthly }) => {

    // If not set to true, return null
    if(!isOpen) return null;


    return (
        // Overlay
        <div className="fixed inset-0 z-50 p-4 flex items-center justify-center bg-black/50">

            {/* Main card content */}
            <div className="max-w-md w-full p-8 text-center rounded-2xl bg-white">

                {/* Success icon */}
                <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-green-100 rounded-full">
                        <Check className="w-12 h-12 text-green-500" />
                    </div>
                </div>

                {/* Title and message */}
                <h2 className="mb-4 text-2xl md:text-3xl font-bold text-gray-800">
                    Success!
                </h2>
                
                <p className="mb-6 text-gray-600 leading-7">
                    {isMonthly ? (
                        <>
                            Thank you for sponsoring{" "}
                            <strong className="text-gray-800">{target?.name || target?.title}</strong>
                            {" "}with <strong className="text-gray-800">{amount} Lei/month</strong>!

                            <br />

                            <span className="block mt-2 text-sm text-gray-500">
                                You will receive monthly updates and can cancel anytime.
                            </span>

                        </>
                    ): (
                        <>
                            Your donation of <strong>{amount} Lei </strong> to {" "}
                            <strong>{target?.name || target?.title}</strong>
                            {" "}has been received!

                            <br />
                            
                            <span className="font-bold text-gray-800 text-xl">Thank you for your support! </span>
                        </>
                    )}

                </p>

                <button
                    onClick={onClose}
                    className="
                        w-full py-3 rounded-xl
                        text-yellow-900 font-bold 
                        bg-yellow-400 hover:bg-yellow-500 transition-colors"
                >
                    Done
                </button>

            </div>

            
        </div>
    )
}

export default DonationSuccessCard;