import Section from '../components/layout/Section';
import PetCardDogsPage from '../components/pets/PetCardDogsPage';
import Filter from '../components/layout/Filter';
//import dogsData from '../data/dogsData';
import { usePets } from '../context/PetsContext';
import { useEffect } from 'react';


const DogsPage = () => {

    const { filterDogs, resetFilters } = usePets();
    const filteredDogs = filterDogs();

    useEffect(() => {
        return () => {
            resetFilters();
        };
    }, []);

    return (
        <>

            {/* Header section */}

            <Section padding="normal" background="gray">

                {/* Filter component */}
                <Filter />

                {/* Dog card grid */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
                    
                    {filteredDogs.map((dog) => (
                        <PetCardDogsPage key={dog.id} dog={dog} />
                    ))}

                    {filteredDogs.length === 0 && (
                        <div>
                            <p>No dogs matching!</p>
                        </div>
                    )}

                </div>

           
            </Section>
        </>
    )
}

export default DogsPage;