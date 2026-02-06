import { useState } from "react";
import { X } from "lucide-react";

// Card component to display donation amount in donation modal
const DonationAmountCard = ({ amount, onClick, isSelected }) => {
    return (
        <div className={`
        py-2 px-2 rounded-xl text-center 
            border-2 border-amber-200 bg-yellow-400 
            text-yellow-900 text-lg font-black 
            cursor-pointer hover:scale-105 transition-transform duration-300
             ${isSelected 
                    ? 'border-amber-500 bg-yellow-400 text-yellow-900 ring-2 ring-amber-300'
                    : 'border-amber-200 bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`
        }
            onClick={onClick}
        >
            {amount} Lei
        </div>

    )
}


// Main component used for quick donation in Virtual adoption page
const QuickDonationModal = ({ isOpen, onClose, target }) => {

    // State variables to store donation amount and donor data
    const [ amount, setAmount ] = useState(0);
    const [ customAmount, setCustomAmount ] = useState("");
    const [ name, setName ] = useState("");
    const [email, setEmail ] = useState("");

    // Preset donation amounts
    const presetAmounts = [ 25, 50, 100, 150, 200, 400 ];

    // Function to set amount from preset blocks
    const handlePresetAmount = (amount) => {
        setAmount(amount);
        setCustomAmount("");
    }

    // Function to set custom donation amount
    const handleCustomAmount = (e) => {
        const value = e.target.value;
        setCustomAmount(value);
        setAmount(value);
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!amount || amount <= 0) {
            alert("Select or enter donation amount!");
            return;
        }

        if(!name || !email) {
            alert("Fill in valid data!");
            return;
        }

        console.log("Donation:", { amount, name, email, target: target.name });

        onClose();
        setAmount(0);
        setCustomAmount("");
        setName("");
        setEmail("");
    }

    // returns null when the modal is closed
    if(!isOpen) return null;


    return (
        // Overlay
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-black/50">
            
            {/* Main modal card */}
            <div className="py-4 px-2 relative bg-white max-w-md w-fulll max-h-[90vh] overflow-y-auto rounded-2xl">

                {/* Close button */}
                <div className="sticky top-1 right-0 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="bg-yellow-400 p-2 rounded-full"
                    >
                        <X  className="h-6 w-6 text-yellow-900 font-bold"/>
                    </button>
                </div>

                {/* Target image */}
                    <img 
                        src="https://picsum.photos/400/300"
                        alt="image" 
                        className="h-full w-full object-cover rounded-lg"
                    />
              
                <div className="p-2 md:p-4">
                    {/* Target title / name */}
                    <h2 className="mb-2 text-2xl md:text-3xl font-bold text-gray-800">
                        Donate to {target?.name}
                    </h2>
                </div>

               

                {/* Donation amount preset */}
                <div className="flex flex-col gap-4">

                    <h3 className="mb-2 text-lg font-bold text-gray-800">
                        Choose amount:
                    </h3>
                    
                    {/* {reset amount grid} */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                        {presetAmounts.map((presetAmount) => (
                            <DonationAmountCard 
                                key={presetAmount}
                                amount={presetAmount}
                                onClick={() => handlePresetAmount(presetAmount)}
                                isSelected={amount === presetAmount && !customAmount}
                            
                            />
                        ))}
                    </div>
                </div>

                {/* Donation amount custom */}
                <div className="mb-6 mt-4">
                    <label className="block mb-2 text-gray-800 font-bold">
                        Or enter custom amount:
                    </label>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            value={customAmount}
                            onChange={handleCustomAmount}
                            placeholder="200"
                            min="1"
                            className="
                                max-w-[100px] px-2 py-2 rounded-lg text-center
                                border-2 border-gray-300 text-gray-800 font-semibold
                                focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 placeholder:font-normal
                                transition-all duration-200" 
                        />
                        <span className="text-gray-700 font-bold text-lg">Lei</span>

                    </div>
                   
                </div>


                {/* Donor data */}
                <form onSubmit={handleSubmit}>
                    
                    {/* Name */}
                    <div>
                        <label className="block mb-2 text-gray-800 font-bold">
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Bingi Bingusz"
                            required
                            className="
                                w-full px-4 py-3 rounded-lg borer-2 border-gray-300 text-gray-800
                                focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200"
                        />
                    </div>


                    {/* Email*/}
                    <div>
                        <label className="block mb-2 text-gray-800 font-bold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@example.com"
                            required
                            className="
                                w-full px-4 py-3 rounded-lg borer-2 border-gray-300 text-gray-800
                                focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200"
                        />
                    </div>


                {/* Donate button - active only if the user selected the donation amount and enetered their data */}
                <button
                    type="submit"
                    disabled={(!amount || !amount <=0) && (!name || !email)}
                    className="
                        w-full py-4 mt-6 rounded-xl shadow-md
                        bg-yellow-500 text-yellow-900 text-lg font-bold
                        hover:bg-yellow-600 hover:shadow-lg hover:scale-[1.02]
                        disabled:bg-gray-300 disabled:text-gray-500
                        disabled:cursor-not-allowed disabled:hover:scale-100
                        transition-all duration-300"
                >

                    {amount > 0 ? `Donate ${amount} Lei` : "Choose amount to continue"}

                </button>
                </form>

            </div>

            
        </div>
    )

}


export default QuickDonationModal;