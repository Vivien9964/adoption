import { useState, useEffect } from "react";
import { X, CreditCard, User, HeartHandshake, Coins, CircleAlert } from "lucide-react";


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


const ErrorMessage = ({ message }) => {
    if(!message) {
        return null;
    }

    return (
        <p className="mt-2 text-sm text-yellow-900 flex items-center gap-1">
            <span><CircleAlert /></span>
            <span>{message}</span>

        </p>
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
    const [ cardHolderName, setCardHolderName ] = useState("");
    const [ expDate, setExpDate ] = useState("");
    const [ cvv, setCvv ] = useState("");
    const [ isMonthly, setIsMonthly ] = useState(false);

    const [ errors, setErrors ] = useState({});

    // Stop background scroll when the modal is open, and restore it when it is closed
    useEffect(() => {

        if(isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto"
        }

    }, [isOpen]);

    



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

    // Function to format card number with space between every four digit groups
    const formatCardNumber = (value) => {
        const cleanedCardNumber = value.replace(/\D/g, "");
        const formattedCardNumber = cleanedCardNumber.match(/.{1,4}/g)?.join(" ") || cleanedCardNumber;
        return formattedCardNumber;
    }

    // Function to validate card number -> Luhn's algorithm
    const isValidCardNumber = (number) => {
        const cleanedCardNumber = number.replace(/\D/g, "");
        const validCardLengths = [13, 14, 15, 16, 19];

        // Only accepts real card number lengths
        if(!validCardLengths.includes(cleanedCardNumber.length)){
            return false;
        };


        let sum = 0;
        let isSecond = false;

        for(let i = cleanedCardNumber.length - 1; i >= 0; i--) {

            let digit = parseInt(cleanedCardNumber[i]);
            
            if(isSecond) {
                digit *= 2;

                if(digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isSecond = !isSecond;
        }

        return sum % 10 === 0;

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
        const hasValidNameChars = /^[\p{L}\s\-']+$/u.test(nameTrimmed);


        if(!nameTrimmed) {
            formErrors.name = "Name is required!";
        } else if(nameTrimmed.length < 2) {
            formErrors.name = "Name is too short!";
        } else if(!hasValidNameChars) {
            formErrors.name = "Name cannot contain special characters and numbers!";
        } else if(nameParts.length < 2) {
            formErrors.name = "Enter first and last name!";
        }


        // Cardholder name validation
        // Cardholder's name has to be longer than two characters and should not contain special characters and numbers
        const cardHolderNameTrimmed = cardHolderName.trim();
        const hasValidCardHolderNameChars =  /^[\p{L}\s\-']+$/u.test(cardHolderNameTrimmed);

        if(!cardHolderNameTrimmed) {
            formErrors.cardHolderName = "Cardholder name is required!";
        } else if(cardHolderNameTrimmed.length < 2 ) {
            formErrors.cardHolderName = "Cardholder name is too short!";
        } else if(!hasValidCardHolderNameChars) {
            formErrors.cardHolderName = "Name cannot contain special characters and numbers!"
        }


        // Email validation
        // Valid email consist of: 
        // username -> contains letters, numbers, dots, underscores
        // domain name -> contains letters, dots, hyphens
        // top level domain -> must be at least two letters
        const trimmedEmail = email.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!email) {
            formErrors.email = "Email is required!";
        } else if(!emailRegex.test(trimmedEmail)) {
            formErrors.email = "Enter valid email!";
        }

        // Card number validation with helper function
        if(!cardNumber) {
            formErrors.cardNumber = "Card number is required!";
        } else if(!isValidCardNumber(cardNumber)) {
            formErrors.cardNumber = "Invalid card number!";
        }

        // Expiry date validation
        if(!expDate) {
            formErrors.expDate= "Expiry date required!";
        } else if(expDate.length !== 5 || !expDate.includes("/")) {
            formErrors.expDate = "Format must be MM/YY!";
        } else {
            const [month, year] = expDate.split("/").map(Number);
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;

            if(month < 1 || month > 12) {
                formErrors.expDate = "Invalid month!";
            } else if(year < currentYear) {
                formErrors.expDate = "Card expired!";
            } else if(year === currentYear && month < currentMonth) {
                formErrors.expDate = "Card expired!";
            } else if(year > currentYear + 10) {
                formErrors.expDate = "Expiry date year is invalid!";
            }
        }


        // CVV validation 
        if(!cvv) {
            formErrors.cvv = "CVV is required!";
        } else if(cvv.length < 3) {
            formErrors.cvv = "CVV must be at least 3 digits!";
        } else if(cvv.length > 4) {
            formErrors.cvv = "CVV must be 3-4 digits!";
        }

        return formErrors;

    }


    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();

        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
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
        setCardHolderName("");
        setExpDate("");
        setCvv("");
        setIsMonthly(false);
    }

   

    // Returns null when the modal is closed
    if(!isOpen) return null;


    return (
        // Overlay
        <div 
            className="z-50 p-4 fixed inset-0 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            
            {/* Main modal card */}
            <div 
                className="
                pb-4 relative max-w-md w-full max-h-[90vh] overflow-y-auto rounded-2xl 
                bg-white hide-scrollbar overscroll-contain"
                onClick={(e) => e.stopPropagation()}
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

                {/* Payment methods*/}
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
                                <div className="flex items-center gap-2">
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

                                if(errors.name) {
                                    setErrors({...errors, name: null});
                                }
                            }}
                            placeholder="Bingi Bingusz"
                            required
                            className={`
                                w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-800
                                focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200
                                ${errors.name 
                                    ? 'border-red-500 focus:border-red-500' 
                                    : 'border-gray-300 focus:border-yellow-400'
                                }`
                            }
                        />

                        <ErrorMessage message={errors.name} />
                    </div>


                    {/* Email*/}
                    <div>
                        <label className="block mb-2 text-gray-600 font-bold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);

                                if(errors.email) {
                                    setErrors({...errors, email: null});
                                }
                            }}
                            placeholder="example@example.com"
                            required
                            className={`
                                w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-800
                                focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                placeholder:text-gray-400 transition-all duration-200
                                ${errors.email 
                                    ? 'border-red-500 focus:border-red-500' 
                                    : 'border-gray-300 focus:border-yellow-400'
                                }`
                            }
                        />
                        
                        <ErrorMessage message={errors.email} />
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
                                maxLength="23"
                                required
                                value={formatCardNumber(cardNumber)}
                                onChange={(e) => {
                                    const cleanedCardNumber = e.target.value.replace(/\D/g, "");

                                    if(cleanedCardNumber.length <= 19) {
                                        setCardNumber(cleanedCardNumber);
                                    }

                                    if(errors.cardNumber) {
                                        setErrors({...errors, cardNumber: null});
                                    } 
                                }}
                                onPaste={(e) => {
                                    e.preventDefault();
                                    const pastedCardNumber = e.clipboardData.getData("text");
                                    const cleanCardNumber = pastedCardNumber.replace(/\D/g, "").slice(0, 19);
                                    setCardNumber(cleanCardNumber);

                                    if(errors.cardNumber) {
                                        setErrors({...errors, cardNumber: null});
                                    } 
                                }}
                                className={`
                                    w-full px-4 py-3 rounded-lg
                                    text-gray-800 font-mono border-2 border-gray-300
                                    placeholder:text-gray-400 placeholder:font-sans
                                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                    transition-all duration-200
                                    ${errors.cardNumber 
                                        ? 'border-red-500 focus:border-red-500' 
                                        : 'border-gray-300 focus:border-yellow-400'
                                    }`
                                }
                            />

                            <ErrorMessage message={errors.cardNumber} />

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
                                value={cardHolderName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const validChars = /^[\p{L}\s\-']*$/u;

                                    if(validChars.test(value)) {
                                        setCardHolderName(value);
                                    }

                                    if(errors.cardHolderName) {
                                        setErrors({...errors, cardHolderName: null});
                                    }
                                }}
                                className={`
                                    w-full px-4 py-3 rounded-lg
                                    text-gray-800 uppercase border-2 border-gray-300
                                    placeholder:text-gray-400 placeholder:font-sans
                                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                    transition-all duration-200
                                    ${errors.cardHolderName 
                                        ? 'border-red-500 focus:border-red-500' 
                                        : 'border-gray-300 focus:border-yellow-400'
                                    }`
                                }
                            />

                            <ErrorMessage message={errors.cardHolderName} />

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
                                        let validExpDate = e.target.value.replace(/\D/g, "");
                                        // Formatting for "MM/YY"
                                        if(validExpDate.length >= 2) {
                                            validExpDate = validExpDate.slice(0,2) + "/" + validExpDate.slice(2,4);
                                        }

                                        setExpDate(validExpDate);

                                        if(errors.expDate){
                                            setErrors({...errors, expDate: null})
                                        }
                                    }}
                                    className={`
                                        w-full px-4 py-3 rounded-lg
                                        text-gray-800 text-center font-mono
                                        border-2 border-gray-300 
                                        focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                        placeholder:text-gray-400 placeholder:font-sans
                                        transition-all duration-200
                                        ${errors.expDate 
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-gray-300 focus:border-yellow-400"
                                        }`
                                    }
                                />
                                <ErrorMessage message={errors.expDate} />
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

                                        if(errors.cvv) {
                                            setErrors({...errors, cvv: null});
                                        }
                                    }}
                                    onPaste={(e) => {
                                        const pastedCvv = e.clipboardData.getData("text");
                                        const cleanCvv = pastedCvv.replace(/\D/g, "").slice(0, 4);
                                        setCvv(cleanCvv);

                                        if(errors.cvv) {
                                            setErrors({...errors, cvv: null});
                                        }
                                    }}
                                    className={`
                                        w-full px-4 py-3 rounded-lg
                                        text-gray-800 text-center font-mono
                                        border-2 border-gray-300 
                                        focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none
                                        placeholder:text-gray-400 placeholder:font-sans
                                        transition-all duration-200
                                        ${errors.cvv
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-gray-300 focus:border-yellow-400"
                                        }`
                                    }
                                />
                                <ErrorMessage message={errors.cvv} />
                            </div>

                        </div>


                    </div>


                {/* Donate button - active only if the user selected the donation amount and entered their data */}
                <button
                    type="submit"
                    disabled={!amount || amount <= 0 || !name || !email || !cardNumber || !cardHolderName || !expDate || !cvv}
                    className="
                        w-full py-4 mt-6 rounded-xl shadow-md
                        bg-yellow-400 text-yellow-900 text-lg font-bold
                        hover:bg-yellow-500 hover:shadow-lg hover:scale-[1.02]
                        disabled:bg-gray-300 disabled:text-gray-500
                        disabled:cursor-not-allowed disabled:hover:scale-100
                        transition-all duration-300"
                >

                    {(amount > 0 && name && email && cardNumber && cardHolderName && expDate && cvv) 
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