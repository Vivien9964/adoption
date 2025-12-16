
const PetCardMeeting = ({ dog }) => {

    return (
        // Main container
        <div>
            {/* Image + Name + Breed container */}
            <div>
                
                {/* Image container */}
                <div className='h-32 w-32 rounded-full border-4 border-white shadow-xl overflow-hidden'>
                    <img src={dog.image} className='h-full w-full object-cover' alt={`${dog.name} - ${dog.breed}`} />
                </div>

                {/* Name and breed container */}
                <div>
                    <h2>{dog.name}</h2>
                    <p>{dog.breed}</p>
                </div>
            </div>
        </div>
    )

}


export default PetCardMeeting;