import { createContext, useContext, useState, useEffect } from "react";
import { fetchUrgentCases, fetchShelterProjects, fetchDonationStats } from "../services/api";

// Donations context holds data that needs to be shared accross multiple components
// Urgent medical cases, shelter projects and donation statistics


// Creating the context
const DonationsContext = createContext();

// Custom hook to use the context instead of repeating logic inside other components
export const useDonations = () => {
    const context = useContext(DonationsContext);

    if(!context) {
        throw new Error("useDonations must be used withing a DonationsProvider!");
    }

    return context;
};


// Context provider
export const DonationsProvider = ({ children }) => {

    // State variables to store data
    const [ urgentCasesData, setUrgentCasesData ] = useState([]);
    const [ shelterProjectsData, setShelterProjectsData ] = useState([]);
    const [ donationStatsData, setDonationStatsData ] = useState({
        totalCollected: 0,
        activeDonors: 0,
        dogsHelped: 0
    });

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);


    // Function to fetch all donation data from database
    const getAllDonationData = async () => {

        try {
            setLoading(true);
            setError(null);

            // All data fetched in paralell to fasten fetching process
            const [ urgentCasesData, shelterProjectsData, donationStatsData ] = await Promise.all([
                fetchUrgentCases(),
                fetchShelterProjects(),
                fetchDonationStats()
            ]);

            setUrgentCasesData(urgentCasesData);
            setShelterProjectsData(shelterProjectsData);
            setDonationStatsData(donationStatsData);

        } catch(error) {
            console.error("Error loading donation data:", error);
            setError(error.message);

        } finally {
            setLoading(false);
        }
    }

    // All data fetched when the application starts
    useEffect(() => {
        getAllDonationData();
    }, []);

    // Function to refresh data from the database after successful donation
    // After calling this function, progress bars get updated in the UI based on new data
    const refreshDonationData = () => {
        getAllDonationData();
    };


    const contextValue = {
        urgentCasesData,
        shelterProjectsData,
        donationStatsData,
        loading,
        error,
        refreshDonationData
    }


    return (
        <DonationsContext.Provider value={contextValue}>
            { children }
        </DonationsContext.Provider>
    )
}