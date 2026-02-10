import { useState } from "react";
import { X, CreditCard, User, HeartHandshake, Coins } from "lucide-react";

// Card component to display donation amount in donation modal
const DonationAmountCard = ({ amount, onClick, isSelected }) => {
    return (
        <div className={`
        py-2 px-2 rounded-xl text-center  
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
const QuickDonationModal = ({ isOpen, onClose, target, onSuccess }) => {

    // State variables to store donation amount and donor, and card data, states for modal
    const [ amount, setAmount ] = useState(0);
    const [ customAmount, setCustomAmount ] = useState("");
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ cardNumber, setCardNumber ] = useState("");
    const [ cardName, setCardName ] = useState("");
    const [ expDate, setExpDate ] = useState("");
    const [ cvv, setCvv ] = useState("");
    const [ isMonthly, setIsMonthly ] = useState(false);

    const [ errors, setErrors ] = useState({});

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
        setAmount(Number(value));
    }

     // Function to validate inputs
     const validateForm = () => {

        const formErrors = {};

        // Amount validation
        // Amount must be a value bigger than 0
        if(!amount || amount <= 0) {
            formErrors.amount = "Select or enter donation amount!";
        }

        // Name validation 
        // Name must be a valid full name consisting of two words and cannot contain special characters
        const nameTrimmed = name.trim();
        const nameParts = nameTrimmed.split(" ").filter((part) => part.length > 0);
        const hasValidChars = /^[\p{L}\s\-']+$/u.test(nameTrimmed);

        if(!nameTrimmed) {
            formErrors.name = "Name is required!";
        } else if(nameTrimmed.length < 2) {
            formErrors.name = "Name is too short!";
        } else if(!hasValidChars) {
            formErrors.name = "Name cannot contain special characters and numbers!";
        } else if(nameParts.length < 2) {
            formErrors.name = "Enter first and last name!";
        }
    }


    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();

        if(Object.keys(errors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if(!amount || amount <= 0) {
            alert("Select or enter donation amount!");
            return;
        }

        if(!name || !email) {
            alert("Fill in valid data!");
            return;
        }

        if(!cardNumber || !cardName || !expDate || !cvv) {
            alert("Enter payment details!");
            return;
        }

        console.log("Donation:", { 
            amount, 
            name, 
            email, 
            target: target.name || target.title, 
            cardNum: cardNumber,
            isMonthly: isMonthly
        });

        setErrors({});
        onSuccess(amount, isMonthly);
        setAmount(0);
        setCustomAmount("");
        setName("");
        setEmail("");
        setCardNumber("");
        setCardName("");
        setExpDate("");
        setCvv("");
        setIsMonthly(false);
    }

   









    // Returns null when the modal is closed
    if(!isOpen) return null;


    return (
        // Overlay
        <div className="z-50 p-4 fixed inset-0 flex items-center justify-center bg-black/50">
            
            {/* Main modal card */}
            <div className="
                pb-4 relative max-w-md w-full max-h-[90vh] overflow-y-auto rounded-2xl 
                bg-white hide-scrollbar"
            >

                {/* Close button */}
                    <button 
                        onClick={onClose}
                        className="
                        absolute top-3 right-3 z-20 p-2 rounded-full
                        bg-yellow-400 hover:bg-yellow-500 hover:scale-110
                        backdrop-blur-sm shadow-lg transition-all duration-300"
                    >
                        <X  className="h-6 w-6 text-yellow-900 font-bold"/>
                    </button>

                {/* Target image */}
                    <img 
                        src={target.image || target.mainImage}
                        alt="image" 
                        className="h-full w-full object-cover rounded-lg"
                    />
              
                <div className="p-2 md:p-4">
                    {/* Target title / name */}
                    <h2 className="mb-2 text-2xl md:text-3xl font-bold text-gray-800">
                        {target ? `Donate to ${target.name || target.title}` : "Support our shelter"}
                    </h2>
                </div>

               

                {/* Donation amount ->  preset */}
                <div className="px-4 flex flex-col gap-4">

                <h3 className="flex items-center gap-4 mb-4">
                        <Coins className="p-2 h-10 w-10 rounded-full text-yellow-900 bg-yellow-400"/>
                        <span className="text-xl md:text-2xl text-gray-700 font-bold">Choose </span>
                    </h3>
                    
                    {/* Preset amount grid */}
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

                {/* Donation amount ->  custom */}
                <div className="px-4 mb-6 mt-4">
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

                {/* Payment menthods */}
                <div className="px-4 mt-8">

                    <h3 className="flex items-center gap-4 mb-4">
                        <HeartHandshake className="p-2 h-10 w-10 rounded-full text-yellow-900 bg-yellow-400"/>
                        <span className="text-xl md:text-2xl text-gray-700 font-bold">Support Type</span>
                    </h3>
                    
                    {/* One-time donation */}
                    {/* Main container */}
                    <div
                        onClick={() => setIsMonthly(false)}
                        className={`
                            p-4 mb-3 rounded-xl cursor-pointer border-2 transition-all
                            ${!isMonthly
                                ? "border-yellow-400 bg-yellow-50"
                                : "border-gray-300 hover:border-gray-400"
                            }
                        `}
                    >
                        {/* Inner container with input and text */}
                        <div className="flex items-center gap-3">
                            <input 
                                type="radio" 
                                checked={!isMonthly}
                                onChange={() => {}}
                                className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
                            />
                            <div>
                                <p className="font-bold text-gray-800">One-time donation</p>
                                <p className="text-sm text-gray-600">Make a single contribution</p>
                            </div>
                        </div>
                    
                    </div>

                    {/* Monthly donation */}
                    {/* Main container */}
                    <div
                        onClick={() => setIsMonthly(true)}
                        className={`
                            p-4 mb-3 rounded-xl border-2 cursor-pointer transition-all
                            ${isMonthly 
                                ? 'border-yellow-400 bg-yellow-50' 
                                : 'border-gray-300 hover:border-gray-400'
                            }
                        `}
                    >
                        {/* Inner content */}
                        <div className="flex items-center gap-3">
                            <input 
                                type="radio" 
                                checked={isMonthly}
                                onChange={() => {}}
                                className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
                            />
                            <div className="flex-1">
                                <div className="flex itemscenter gap-2">
                                    <p className="font-bold text-gray-800">Monthly sponsorship</p>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Cancel anytime
                                </p>
                            </div>
                        </div>
                    </div>

                    { isMonthly && amount > 0  && (
                        <div className="p-3 mt-3 mb-3 rounded-lg bg-sky-50 border border-sky-200">
                            <p className="text-sm text-gray-800">
                                You will be charged <strong>{amount} Lei monthly</strong>.
                                You can cancel anytime by contacting us.
                            </p>
                        </div>
                    )}

                </div>


                {/* Donor data - personal and card info */}
                <form 
                    onSubmit={handleSubmit}
                    className="px-4 mt-8 space-y-4 "
                >
                    
                    <h3 className="flex items-center gap-4">
                        <User className="p-2 h-10 w-10 rounded-full text-yellow-900 bg-yellow-400"/>
                        <span className="text-xl md:text-2xl text-gray-700 font-bold">Your Information</span>
                    </h3>
                    
                    
                    {/* Name */}
                    <div>
                        <label className="block mb-2 text-gray-600 font-bold">
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => {
                                const value = e.target.value;
                                const validChars = /^[\p{L}\s\-']*$/u;

                                if(validChars.test(value)) {
                                    setName(value);
                                }

                                if(formErrors.name) {
                                    setFormErrors({...formErrors, name: null});
                                }
                            }}
                            placeholder="Bingi Bingusz"
                            required
                            className="
                                w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-800
                                focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200"
                        />
                    </div>


                    {/* Email*/}
                    <div>
                        <label className="block mb-2 text-gray-600 font-bold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@example.com"
                            required
                            className="
                                w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-800
                                focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200"
                        />
                    </div>
                    
                    {/* Payment details */}
                    <div className="pt-6 mt-6 border-t-2 border-gray-200 flex flex-col gap-4">
                        <h3 className="flex items-center gap-4">
                            <CreditCard className="p-2 h-10 w-10 rounded-full text-yellow-900 bg-yellow-400"/>
                            <span className="text-xl md:text-2xl text-gray-700 font-bold">Payment Details</span>
                        </h3>
                    

                        {/* Card number */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                                Card Number
                            </label>
                            <input 
                                type="text" 
                                placeholder="XXXX XXXX XXXX XXXX"
                                maxLength="16"
                                required
                                value={cardNumber}
                                onChange={(e) => {
                                    // Clear the input -> keep the first 16 digits
                                    const validCardNum = e.target.value.replace(/\D/g, "").slice(0, 16); 
                                    setCardNumber(validCardNum);
                                }}
                                className="
                                    w-full px-4 py-3 rounded-lg
                                    text-gray-800 font-mono border-2 border-gray-300
                                    placeholder:text-gray-400 placeholder:font-sans
                                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                    transition-all duration-200"
                            />
                        </div>

                        {/* Cardholder */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                                Cardholder Name
                            </label>
                            <input 
                                type="text" 
                                placeholder="BINGI BINGUSZ"
                                required
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                className="
                                    w-full px-4 py-3 rounded-lg
                                    text-gray-800 uppercase border-2 border-gray-300
                                    placeholder:text-gray-400 placeholder:font-sans
                                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                    transition-all duration-200"
                            />
                        </div>


                        {/* Expiry date and cvv */}
                        <div className="mb-4 flex gap-4">

                            {/* Exp date */}
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-bold text-gray-700">
                                    Expiry Date
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    required
                                    value={expDate}
                                    onChange={(e) => {
                                        // Valid expiry date -> keep numbers only
                                        let validExpDate = e.target.value.replace(/\D/g, "");
                                        // Formatting for "MM/YY"
                                        if(validExpDate.length >= 2) {
                                            validExpDate = validExpDate.slice(0,2) + "/" + validExpDate.slice(2,4);
                                        }

                                        setExpDate(validExpDate);
                                    }}
                                    className="
                                        w-full px-4 py-3 rounded-lg
                                        text-gray-800 text-center font-mono
                                        border-2 border-gray-300 
                                        focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                        placeholder:text-gray-400 placeholder:font-sans
                                        transition-all duration-200"
                                />
                            </div>

                            {/* CVV */}
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-bold text-gray-700">
                                        CVV
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="XXX"
                                    maxLength="4"
                                    required
                                    value={cvv}
                                    onChange={(e) => {
                                        const validCvv = e.target.value.replace(/\D/g, "").slice(0, 4);
                                        setCvv(validCvv);
                                    }}
                                    className="
                                        w-full px-4 py-3 rounded-lg
                                        text-gray-800 text-center font-mono
                                        border-2 border-gray-300 
                                        focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                        placeholder:text-gray-400 placeholder:font-sans
                                        transition-all duration-200"
                                />
                            </div>

                        </div>


                    </div>


                {/* Donate button - active only if the user selected the donation amount and enetered their data */}
                <button
                    type="submit"
                    disabled={!amount || amount <= 0 || !name || !email || !cardNumber || !cardName || !expDate || !cvv}
                    className="
                        w-full py-4 mt-6 rounded-xl shadow-md
                        bg-yellow-400 text-yellow-900 text-lg font-bold
                        hover:bg-yellow-500 hover:shadow-lg hover:scale-[1.02]
                        disabled:bg-gray-300 disabled:text-gray-500
                        disabled:cursor-not-allowed disabled:hover:scale-100
                        transition-all duration-300"
                >

                    {(amount > 0 && name && email && cardNumber && cardName && expDate && cvv) 
                        ? (isMonthly ? `Sponsor with ${amount} Lei/month` : `Donate ${amount} Lei`)
                        : "Enter all data to continue"
                    }

                </button>
                </form>

            </div>

            
        </div>
    )

}


export default QuickDonationModal;