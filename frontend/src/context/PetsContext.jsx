
// Context to hold pet data, later on the list of available pets are going to be shared accross 
// multiple pages

import { createContext, useContext, useState, useEffect } from 'react';

// Creating the context
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

    // mock data for now
    const [pets, setPets] = useState([
        {
            id: 1,
            name: "Maxi",
            age: 3,
            gender: "male",
            breed: "Golden Retriever",
            size: "Large",
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
            personality: "Shy troublemaker! Misty is an elderly dog with a childish spirit who loves attention, but only from you!",
            featured: true
        }
    ]);

    const getFeaturedPets = () => {
        return pets.filter((pet) => pet.featured);
    }

    const contextValue = {
        pets, 
        getFeaturedPets,
    };


    return (
        <PetsContext.Provider value={contextValue}>
            {children}
        </PetsContext.Provider>
    )
}
