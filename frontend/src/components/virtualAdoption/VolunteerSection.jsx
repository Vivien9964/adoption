import { useState } from "react";
import VolunteerApplicationModal from "./VolunteerApplicationModal";

const VolunteerSection = () => {

    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }




    return (
        <div>

        <button onClick={handleOpenModal}>
            Apply Now
        </button>



        <VolunteerApplicationModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />

        </div>
    )
}


export default VolunteerSection;