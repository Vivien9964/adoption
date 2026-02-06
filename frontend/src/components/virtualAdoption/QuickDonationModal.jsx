import { useState } from "react";
import { X } from "lucide-react";

const DonationAmountCard = ({ amount }) => {
    return (
        <div className="
            py-2 px-2 rounded-xl text-center 
            border-2 border-amber-200 bg-yellow-400 
            text-yellow-900 text-lg font-black 
            cursor-pointer hover:scale-105 transition-transform duration-300"
        >
            {amount}
        </div>

    )
}





const QuickDonationModal = ({ isOpen, onClose, target }) => {

    const [ amount, setAmount ] = useState(0);
    const [ name, setName ] = useState("");
    const [email, setEmail ] = useState("");

    if(!isOpen) return null;


    return (
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-black/50">
        
            <div className="p-8 relative bg-white max-w-2xl rounded-2xl">

                {/* Close button */}
                <div className="absolute top-1 right-1">
                    <button 
                        onClick={onClose}
                        className="bg-yellow-400 p-2 rounded-full"
                    >
                        <X  className="h-6 w-6 text-yellow-900 font-bold"/>
                    </button>
                </div>

                {/* Target image */}
                <div>
                    <img 
                        src="https://picsum.photos/400/300"
                        alt="image" 
                        className="h-full w-full object-cover rounded-lg"
                    />
                </div>

                {/* Title, name */}
                <h2>Donate to {target.name}</h2>

                <div className="flex flex-col gap-4">
                    <h3>Choose amount:</h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                        <DonationAmountCard amount={25} />
                        <DonationAmountCard amount={50} />
                        <DonationAmountCard amount={100} />
                        <DonationAmountCard amount={150} />
                        <DonationAmountCard amount={200} />
                        <DonationAmountCard amount={400} />

                       


                       



                       

                    </div>
                </div>


            </div>

            
        </div>
    )

}


export default QuickDonationModal;