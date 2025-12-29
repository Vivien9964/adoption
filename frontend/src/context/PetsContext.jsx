
// Context to hold pet data, later on the list of available pets are going to be shared accross 
// multiple pages
import { createContext, useContext, useState, useEffect } from 'react';
import dogsData from '../data/dogsData';

const PetsContext = createContext();

// using custom hook to make it easier to use the context in other components (no repeated imports)
export const usePets = () => {
    const context = useContext(PetsContext);

    if(!context) {
        throw new Error("Component must be wrapped by PetsProvider!");
    }

    return context;
};


// Image dimensions: 800x600px or 1200x900px 4:3 ratio for swiper carousel

// provider component 
export const PetsProvider = ({ children }) => {

    // NEW!!!!
    const [pets, setPets] = useState([]);
    const [allPets, setAllPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ error, setError] = useState(null);
    // NEW!!!!


    // filterResult  will be the array that we return based on applied filters
    //let filterResult = dogsData;


    // Filtering states - term, size, age, gender
    const [ searchString, setSearchString ] = useState("");
    const [ sizeFilter, setSizeFilter ] = useState("all");
    const [ ageFilter, setAgeFilter ] = useState("all");
    const [ genderFilter, setGenderFilter ] = useState("all");
    const [ locationFilter, setLocationFilter ] = useState("all");

    /*
    const [pets, setPets] = useState([
        {
            id: 1,
            name: "Maxi",
            age: 3,
            gender: "male",
            breed: "Golden Retriever",
            size: "Large",
            image: "https://placedog.net/500/400?id=2",
            personality: "Friendly and energetic! Maxi is the ideal furry friend for an active household.",
            featured: true
        },
        {
            id: 2,
            name: "Bingi",
            age: 2,
            gender: "female",
            breed: "Daschund mix",
            size: "Small",
            image: "https://placedog.net/500/400?id=4",
            personality: "Sweet and playful! She loves attention and is a loving companion.",
            featured: true
        },
        {
            id: 3,
            name: "Benji",
            age: 1,
            gender: "male",
            breed: "Mixed breed",
            size: "Medium",
            image: "https://placedog.net/500/400?id=6",
            personality: "Smart and gentle! Benji loves to learn new tricks and rest beside you!",
            featured: true
        },
        {
            id: 4,
            name: "Dot",
            age: 6,
            gender: "male",
            breed: "Carpathian Shepherd",
            size: "Large",
            image: "https://placedog.net/500/400?id=8",
            personality: "Protective and loving! He is a gentle giant and and excellent guard dog who needs many kisses.",
            featured: true
        },
        {
            id: 5,
            name: "Misty",
            age: 7,
            gender: "female",
            breed: "Bichon Frise",
            size: "Small",
            image: "https://placedog.net/500/400?id=10",
            personality: "Shy troublemaker! Misty is an elderly dog with a childish spirit who loves attention, but only from you!",
            featured: true
        }
    ]);
    */


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
                setPets(data);
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
        pets,
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
