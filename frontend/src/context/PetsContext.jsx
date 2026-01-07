
// Context to hold pet data, later on the list of available pets are going to be shared accross 
// multiple pages
import { createContext, useContext, useState, useEffect } from 'react';

const PetsContext = createContext();

// using custom hook to make it easier to use the context in other components (no repeated imports)
export const usePets = () => {
    const context = useContext(PetsContext);

    if(!context) {
        throw new Error("Component must be wrapped by PetsProvider!");
    }

    return context;
};


// provider component 
export const PetsProvider = ({ children }) => {

    const [allPets, setAllPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // filterResult  will be the array that we return based on applied filters
    //let filterResult = dogsData;


    // Filtering states - term, size, age, gender
    const [ searchString, setSearchString ] = useState("");
    const [ sizeFilter, setSizeFilter ] = useState("all");
    const [ ageFilter, setAgeFilter ] = useState("all");
    const [ genderFilter, setGenderFilter ] = useState("all");
    const [ locationFilter, setLocationFilter ] = useState("all");

   
    // Fetch all pets from the database
    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/api/dogs");

                if(!response.ok) {
                    throw new Error("Failed to fetch pets!");
                }
                
                const data = await response.json();
                setAllPets(data);
                setLoading(false);

            } catch(err) {
                console.error("Failed fetching pets: ", err);
                setError(err.message);
                setLoading(false);
            }
        }

        fetchPets();
        
    }, []);


    // Function to filter out featured pets
    const getFeaturedPets = () => {
        return allPets.filter((pet) => pet.featured);
    }


    const filterDogs = () => {
        
        let filterResult = allPets;

        // filter by name
        if(searchString) {
            filterResult = filterResult.filter((dog) => 
                dog.name.toLowerCase().includes(searchString.toLowerCase()) || 
                dog.breed.toLowerCase().includes(searchString.toLowerCase()) 
            );
        }

        // filter by size
        if(sizeFilter !== "all") {
            filterResult = filterResult.filter((dog) => dog.size.toLowerCase() === sizeFilter)
        }

        // filter by age
        if(ageFilter !== "all") {
            filterResult = filterResult.filter((dog) => {

                // if puppy -> less than a year to a year old
                if(ageFilter === "puppy") {
                    return dog.age <= 1;
                }

                // if they are young -> return dogs between 1 and 3 years
                if(ageFilter === "young") {
                    return dog.age > 1 && dog.age <= 3;
                }

                // if category is adult -> return dogs between 3 and 5 years
                if(ageFilter === "adult") {
                    return dog.age > 3  && dog.age <= 5;
                }

                // for senior dogs -> 5+ years
                if(ageFilter === 'senior') {
                    return dog.age > 5
                }

                return true;
            })
        }


        // filter by gender 
        if(genderFilter !== "all") {
            filterResult = filterResult.filter((dog) => dog.gender.toLowerCase() === genderFilter)
        }


        // filter by location
        if(locationFilter !== "all") {
            filterResult = filterResult.filter((dog) => dog.location.toLowerCase() === locationFilter);
        }

        return filterResult;
    }


    // Reset all filters 
    const resetFilters = () => {
        setSearchString("");
        setSizeFilter("all");
        setAgeFilter("all");
        setGenderFilter("all");
        setLocationFilter("all");
    }





    const contextValue = {
        searchString,
        setSearchString,
        sizeFilter,
        setSizeFilter,
        ageFilter,
        setAgeFilter,
        genderFilter,
        setGenderFilter,
        locationFilter,
        setLocationFilter,
        getFeaturedPets,
        filterDogs,
        resetFilters,
        allPets,
        loading, 
        error
        

    };


    return (
        <PetsContext.Provider value={contextValue}>
            {children}
        </PetsContext.Provider>
    )
}
