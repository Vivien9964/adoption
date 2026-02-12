import { useState, useEffect } from "react";
import { X } from "lucide-react";



const VolunteerApplicationModal = ({ isOpen, onClose }) => {

    const [ currentView, setCurrentView ] = useState("details");


    useEffect(() => {
        if(!isOpen) {
            setCurrentView("details");
        }
    }, [isOpen]);

    if(!isOpen) return null;


    return (
        <div 
            className="p-4 fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >

            <div 
                className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-white"
                onClick={(e) => e.stopPropagation()}
            >
            </div>

            <button
                className="
                    p-2 absolute top-4 right-4 z-10 rounded-full 
                    bg-yellow-300 hover:bg-yellow-400 hover:scale-102 transition-all duration-300
                "
                onClick={onClose}
            >
                <X className="w-6 h-6 text-yellow-900 font-bold" />

            </button>
   
        </div>
    )
}

export default VolunteerApplicationModal;