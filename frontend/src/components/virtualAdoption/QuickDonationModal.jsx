import { useState, useEffect } from "react";
import { submitDonation } from "../../services/api";
import { validateName, validateEmail, PATTERNS } from "../../utils/validationRules";
import useFormValidation from "../../hooks/useFormValidation";
import { X, CreditCard, User, HeartHandshake, Coins, CircleAlert } from "lucide-react";


// Card component to display donation amount in donation modal
const DonationAmountCard = ({ amount, onClick, isSelected }) => {
    return (
        <button
            type="button"
            onClick={onClick} 
            aria-pressed={isSelected}
            aria-label={`Donate ${amount} lei`}
            className={`
                py-2 px-2 rounded-xl text-center  
                text-yellow-900 text-lg font-black 
                cursor-pointer hover:scale-105 transition-transform duration-300
                ${isSelected 
                        ? 'border-amber-500 bg-yellow-400 text-yellow-900 ring-2 ring-amber-300'
                        : 'border-amber-200 bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }
                `}
        >
            {amount} Lei
        </button>

    )
}


const ErrorMessage = ({ message, id }) => {
    if(!message) {
        return null;
    }

    return (
        <p 
            id={id}
            role="alert"
            className="mt-2 text-sm text-yellow-900 flex items-center gap-1">
            <span aria-hidden="true"><CircleAlert className="h-4 w-4" /></span>
            <span>{message}</span>

        </p>
    )
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

 // Schema used in custom validaton hook (containing validatorFn)
// name and email are shared from validationRules.js and they are availaible in all forms
// Other fields are unique to the donation form -> they need inline functions, no need to share them
    const donationValidationSchema = {

        amount: (value) => {
            if(!value || value < 0) {
                return "Select or enter donation amount!";
            }

            return null;
        },

        name: validateName,
        email: validateEmail,

        cardNumber: (value) => {
            if(!value) {
                return "Card number is required!";
            }

            if(!isValidCardNumber(value)) {
                return "Invalid card number!";
            }

            return null;
        },

        cardHolderName: (value) => {

            const trimmed = (value || "").trim();
            const hasValidChars = /^[\p{L}\s\-']+$/u.test(trimmed);

            if(!trimmed) {
                return "Cardholder name is required!";
            }

            if(trimmed.length < 2) {
                return "Cardholder name is too short!";
            }

            if(!hasValidChars) {
                return "Name cannot contain special characters and numbers!";
            }

            return null;
        },

        expDate: (value) => {

            if(!value) {
                return "Expiry date required!";
            }

            if(value.length !== 5 || !value.includes("/")) {
                return "Format must be MM/YY!";
            }

            const [month, year] = value.split("/").map(Number);

            const currentDate = new Date();

            const currentYear = currentDate.getFullYear() % 100;

            const currentMonth = currentDate.getMonth() + 1;

            if(month < 1 || month > 12) { 
                return "Invalid month!";
            }

            if(year < currentYear) {
                return "Card expired!";
            }

            if(year === currentYear && month < currentMonth) {
                return "Card expired!";
            }

            if(year > currentYear + 10) {
                 return "Expiry date year is invalid!";
            }

            return null;
        }

    }


// Main component used for quick donation in Virtual adoption page
const QuickDonationModal = ({ isOpen, onClose, target, onSuccess, defaultDonationType = "one-time" }) => {

    //nUsing custom hook to store data, handle input change and errors
    const { formData, setFormData, errors, setErrors, handleChange, validate, resetForm } =  useFormValidation({
        amount: 0,
        customAmount: "",
        name: "",
        email: "",
        cardNumber: "",
        cardHolderName: "",
        expDate: "",
        cvv: ""
    }, donationValidationSchema );

    const [ isMonthly, setIsMonthly ] = useState(defaultDonationType === "monthly");
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ serverError, setServerError ] = useState("");


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


    useEffect(() => {
        if(isOpen) {
            setIsMonthly(defaultDonationType === "monthly");
        }
    }, [isOpen, defaultDonationType]);


    // Preset donation amounts
    const presetAmounts = [ 25, 50, 100, 150, 200, 400 ];

    // Function to set amount from preset blocks
    const handlePresetAmount = (amount) => {
        setFormData((prev) => ({
            ...prev,
            amount: amount,
            customAmount: ""
        }));

        if(errors.amount) {
            setErrors((prev) => ({
                ...prev,
                amount: null
            }));
        }
    };

    // Function to set custom donation amount
    const handleCustomAmount = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            customAmount: value,
            amount: Number(value)
        }));

        if(errors.amount) {
            setErrors((prev) => ({
                ...prev,
                amount: null
            }));
        }
    };

    // Function to format card number with space between every four digit groups
    const formatCardNumber = (value) => {
        const cleanedCardNumber = value.replace(/\D/g, "");
        const formattedCardNumber = cleanedCardNumber.match(/.{1,4}/g)?.join(" ") || cleanedCardNumber;
        return formattedCardNumber;
    }


    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validate()) {
            return;
        } 

        setServerError("");
        setIsSubmitting(true);

        try {
            await submitDonation({
                targetName: target ? (target.name || target.title) : "Our shelter",
                targetType : target ? target.type : "general",
                targetId: target ? target.id : null,
                amount: formData.amount,
                isMonthly: isMonthly,
                donorName: formData.name,
                donorEmail: formData.email
            });

            // Form only resets if the API call was a success
            onSuccess(formData.amount, isMonthly);
            resetForm();
            setIsMonthly(false);

        } catch(error) {

            if(error.status === 400 && error.fields) {
                setErrors(error.fields);
            } else {
                setServerError(error.message || "Something went wrong!");
            }
        } finally {
            setIsSubmitting(false);
        }

    }

   
    // Returns null when the modal is closed
    if(!isOpen) return null;


    return (
        // Overlay
        <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
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
                        aria-label="Close donation form"
                        className="
                        absolute top-3 right-3 z-20 p-2 rounded-full
                        bg-yellow-400 hover:bg-yellow-500 hover:scale-110
                        backdrop-blur-sm shadow-lg transition-all duration-300"
                    >
                        <X aria-hidden="true" className="h-6 w-6 text-yellow-900 font-bold"/>
                    </button>

                {/* Target image */}
                {target && (
                    <img 
                        src={target.image || target.mainImage}
                        alt={target ? `${target.name || target.title}`: "Donation target" } 
                        className="h-full w-full object-cover rounded-lg"
                    />
                )}
              
                <div className="p-2 md:p-4">
                    {/* Target title / name */}
                    <h2 
                        id="modal-title"
                        className="mb-2 text-2xl md:text-3xl font-bold text-gray-800"
                    >
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
                                isSelected={formData.amount === presetAmount && !formData.customAmount}
                            />
                        ))}
                    </div>
                </div>

                {/* Donation amount ->  custom */}
                <div className="px-4 mb-6 mt-4">
                    <label
                        htmlFor="custom-donation-amount" 
                        className="block mb-2 text-gray-800 font-bold">
                        Or enter custom amount:
                    </label>
                    <div className="flex items-center gap-2">
                        <input 
                            id="custom-donation-amount"
                            type="number" 
                            value={formData.customAmount}
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

                    { isMonthly && formData.amount > 0  && (
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
                    aria-label="Donation form"
                    onSubmit={handleSubmit}
                    className="px-4 mt-8 space-y-4 "
                >
                    
                    <h3 className="flex items-center gap-4">
                        <User 
                            aria-hidden="true"
                            className="p-2 h-10 w-10 rounded-full text-yellow-900 bg-yellow-400"
                        />
                        <span className="text-xl md:text-2xl text-gray-700 font-bold">Your Information</span>
                    </h3>
                    
                    
                    {/* Name */}
                    <div>
                        <label 
                            htmlFor="contact-name"
                            className="block mb-2 text-gray-600 font-bold"
                        >
                            Full Name:*
                        </label>
                        <input 
                            id="contact-name"
                            name="name"
                            autoComplete="name"
                            type="text" 
                            value={formData.name}
                            onChange={(e) => {
                                const value = e.target.value;
                                if(PATTERNS.nameInput.test(value)) {
                                    handleChange("name", value);
                                }
                            }}
                            placeholder="Bingi Bingusz"
                            required
                            aria-invalid={errors.name ? "true" : "false"}
                            aria-describedby={errors.name ? "name-error" : undefined}
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

                        <ErrorMessage message={errors.name} id="name-error" />
                    </div>


                    {/* Email*/}
                    <div>
                        <label
                            htmlFor="contact-email" 
                            className="block mb-2 text-gray-600 font-bold"
                        >
                            Email:*
                        </label>
                        <input
                            id="contact-email"
                            name="email"
                            autoComplete="email"
                            type="email" 
                            value={formData.email}
                            onChange={(e) => {
                                handleChange("email", e.target.value);
                            }}
                            placeholder="example@example.com"
                            required
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
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
                        
                        <ErrorMessage message={errors.email} id="email-error" />
                    </div>
                    
                    {/* Payment details */}
                    <div className="pt-6 mt-6 border-t-2 border-gray-200 flex flex-col gap-4">
                        <h3 className="flex items-center gap-4">
                            <CreditCard 
                                aria-hidden="true"
                                className="p-2 h-10 w-10 rounded-full text-yellow-900 bg-yellow-400"
                            />
                            <span className="text-xl md:text-2xl text-gray-700 font-bold">Payment Details</span>
                        </h3>
                    

                        {/* Card number */}
                        <div className="mb-4">
                            <label
                                htmlFor="card-number" 
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Card Number:*
                            </label>
                            <input 
                                id="card-number"
                                name="cc-number"
                                autoComplete="cc-number"
                                type="text" 
                                inputMode="numeric"
                                placeholder="XXXX XXXX XXXX XXXX"
                                maxLength="23"
                                required
                                value={formatCardNumber(formData.cardNumber)}
                                onChange={(e) => {
                                    const cleanedCardNumber = e.target.value.replace(/\D/g, "");

                                    if(cleanedCardNumber.length <= 19) {
                                        handleChange("cardNumber", cleanedCardNumber);
                                    }
                                }}
                                onPaste={(e) => {
                                    e.preventDefault();
                                    const pastedCardNumber = e.clipboardData.getData("text");
                                    const cleanCardNumber = pastedCardNumber.replace(/\D/g, "").slice(0, 19);
                                    handleChange("cardNumber", cleanCardNumber)
                                }}
                                aria-invalid={errors.cardNumber ? "true" : "false"}
                                aria-describedby={errors.cardNumber ? "card-number-error" : undefined}
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

                            <ErrorMessage message={errors.cardNumber} id="card-number-error" />

                        </div>

                        {/* Cardholder */}
                        <div className="mb-4">
                            <label 
                                htmlFor="cardholder-name"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Cardholder Name:*
                            </label>
                            <input 
                                id="cardholder-name"
                                name="cc-name"
                                autoComplete="cc-name"
                                type="text" 
                                placeholder="BINGI BINGUSZ"
                                required
                                value={formData.cardHolderName}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    if(PATTERNS.nameInput.test(value)) {
                                        handleChange("cardHolderName", value);
                                    }
                                }}
                                aria-invalid={errors.cardHolderName ? "true" : "false"}
                                aria-labelledby={errors.cardHolderName ? "cardholder-name-error" : undefined}
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

                            <ErrorMessage message={errors.cardHolderName} id="cardholder-name-error" />

                        </div>


                        {/* Expiry date and cvv */}
                        <div className="mb-4 flex gap-4">

                            {/* Exp date */}
                            <div className="flex-1">
                                <label 
                                    htmlFor="expiry-date"
                                    className="block mb-2 text-sm font-bold text-gray-700"
                                >
                                    Expiry Date:*
                                </label>
                                <input
                                    id="expiry-date" 
                                    name="cc-exp"
                                    autoComplete="cc-exp"
                                    type="text" 
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    required
                                    value={formData.expDate}
                                    onChange={(e) => {
                                        let validExpDate = e.target.value.replace(/\D/g, "");
                                        // Formatting for "MM/YY"
                                        if(validExpDate.length >= 2) {
                                            validExpDate = validExpDate.slice(0,2) + "/" + validExpDate.slice(2,4);
                                        }

                                        handleChange("expDate", validExpDate);
                                    }}
                                    aria-invalid={errors.expDate ? "true" : "false"}
                                    aria-describedby={errors.expDate ? "expiry-date-error" : undefined}
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
                                <ErrorMessage message={errors.expDate} id="expiry-date-error" />
                            </div>

                            {/* CVV */}
                            <div className="flex-1">
                                <label 
                                    htmlFor="cvv"
                                    className="block mb-2 text-sm font-bold text-gray-700"
                                >
                                        CVV:*
                                </label>
                                <input 
                                    id="cvv"
                                    name="cc-csc"
                                    autoComplete="cc-csc"
                                    type="text" 
                                    placeholder="XXX"
                                    maxLength="4"
                                    required
                                    value={formData.cvv}
                                    onChange={(e) => {
                                        const validCvv = e.target.value.replace(/\D/g, "").slice(0, 4);
                                        handleChange("cvv", validCvv);
                                    }}
                                    onPaste={(e) => {
                                        const pastedCvv = e.clipboardData.getData("text");
                                        const cleanCvv = pastedCvv.replace(/\D/g, "").slice(0, 4);
                                        handleChange("cvv", cleanCvv);
                                    }}
                                    aria-invalid={errors.cvv ? "true" : "false"}
                                    aria-describedby={errors.cvv ? "cvv-number-error" : undefined}
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
                                <ErrorMessage message={errors.cvv} id="cvv-number-error" />
                            </div>

                        </div>

                    </div>

                    {serverError && (
                        <div className="p-4 rounded-lg bg-red-50 border-2 border-red-200">
                            <p className="text-red-600 text-center font-semibold">
                                {serverError}
                            </p>
                        </div>
                    )}


                {/* Donate button - active only if the user selected the donation amount and entered their data */}
                <button
                    type="submit"
                    aria-label="Send donation"
                    disabled={!formData.amount || formData.amount <= 0 || !formData.name || !formData.email || !formData.cardNumber || !formData.cardHolderName || !formData.expDate || !formData.cvv || isSubmitting}
                    className="
                        w-full py-4 mt-6 rounded-xl shadow-md
                        bg-yellow-400 text-yellow-900 text-lg font-bold
                        hover:bg-yellow-500 hover:shadow-lg hover:scale-[1.02]
                        disabled:bg-gray-300 disabled:text-gray-500
                        disabled:cursor-not-allowed disabled:hover:scale-100
                        transition-all duration-300"
                >

                    {isSubmitting 
                        ? "Processing donation..."
                        : (formData.amount > 0 && formData.name && formData.email && formData.cardNumber && formData.cardHolderName && formData.expDate && formData.cvv) 
                            ? (isMonthly ? `Sponsor with ${formData.amount} Lei/month` : `Donate ${formData.amount} Lei`)
                            : "Enter all data to continue"
                    }

                </button>
                </form>

            </div>
    
        </div>
    );

}


export default QuickDonationModal;