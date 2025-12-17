import Filter from '../layout/Filter';
import PetCardMeeting from '../pets/PetCardMeeting';
import { usePets } from '../../context/PetsContext';



const StepSelectDog = () => {

    // Take and use filterDogs function from context
    const { filterDogs } = usePets();
    const filteredDogs = filterDogs();

    return (
        <div className='p-4 mt-4 border-3 border-yellow-300 rounded-xl'>
            
            <h1 className='mb-4 text-gray-700 font-black text-xl md:text-4xl'>Step 1: Choose a dog</h1>

            {/* Filter component */}
            <Filter />

            {/* Dog cards container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 mx-4 gap-6">

                {filteredDogs.map((dog) => (
                    <PetCardMeeting key={dog.id} dog={dog} />
                ))}

                {/* Error message if no dog found  */}
                {filteredDogs.length === 0 && (
                <div>
                    <p>No dogs match!</p>
                </div>
                )}

            </div>


        </div>
    )
}

export default StepSelectDog;