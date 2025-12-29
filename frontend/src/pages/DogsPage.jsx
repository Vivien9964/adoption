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
            {/*
            <div className="py-14 md:py-16 lg:py-18 text-center bg-white border-b-2 border-yellow-300">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="
                        text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8
                        text-gray-700 font-extrabold tracking-tigh"
                    >
                        Find your best friend!
                    </h1>
                    <p className="text-lg md:text-xl lg:text2xl max-w-3xl mx-auto leading-relaxed text-gray-500">
                        A random paragraph under the main page title.
                    </p>
                </div>
            </div>
            */}

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