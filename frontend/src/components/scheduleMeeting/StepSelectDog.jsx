import Filter from '../layout/Filter';
import PetCardMeeting from '../pets/PetCardMeeting';
import Pagination from '../common/Pagination';
import { usePets } from '../../context/PetsContext';
import { useEffect, useState } from 'react';


const StepSelectDog = () => {

    // Take and use filterDogs function from pets context 
    const { filterDogs } = usePets();
    const filteredDogs = filterDogs();

    // State variables for pagination
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ itemsPerPage, setItemsPerPage ] = useState(4);

    useEffect(() => {

        // Funtion to update number of visible items on a page based on the screen size
        const updateItemsPerPage = () => {
            const screenWidth = window.innerWidth;

            if(screenWidth >= 1024) {
                setItemsPerPage(15);
            } else if (screenWidth >= 786) {
                setItemsPerPage(8);
            } else {
                setItemsPerPage(4);
            }
        }

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);

    }, []);


    // Reset to first page
    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, filteredDogs.length]);


    // Number of total pages
    const totalPages = Math.ceil(filteredDogs.length / itemsPerPage);
    // Start index and end index to slice filteredDogs array to show the cards
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCards = filteredDogs.slice(startIndex, endIndex);


    return (
        <div className="p-4 mt-4 border-3 border-yellow-300 rounded-xl">
            
            <h1 className="mb-4 text-gray-700 font-black text-xl md:text-4xl">Step 1: Choose a dog</h1>

            {/* Filter component */}
            <Filter />

            {/* Dog cards container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 mx-4 gap-6">

                {paginatedCards.map((dog) => (
                    <PetCardMeeting key={dog.id} dog={dog} />
                ))}

                {/* Error message if no dog found  */}
                {filteredDogs.length === 0 && (
                <div>
                    <p>No dogs match!</p>
                </div>
                )}

            </div>

            {/* Pagination component */}
           <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
           />


        </div>
    )
}

export default StepSelectDog;