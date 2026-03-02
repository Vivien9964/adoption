// This file handles fetching data from the database and adding new data to the database
// Storing these functions in this file ensures that other components and contexts are only
// handling state and they are not focused on HTTP details

const BASE_URL=import.meta.env.VITE_API_URL || "http://localhost:3000";

// Fetch all dogs
export const fetchAllPets = async () => {
    const response = await fetch(`${BASE_URL}/api/dogs`);

    if(!response.ok) {
        throw new Error("Failed to fetch dogs!");
    }

    return response.json();
}

// Fetch one dog based on ID
export const fetchPetByID = async (id) => {
    const response = await fetch(`${BASE_URL}/api/dogs/${id}`);

    if(!response.ok) {
        throw new Error("Failed to fetch dog!");
    }

    return response.json();
}


// Fetch already booked meeting dates and time with a specific dog
export const fetchMeetingAvailability = async (dogId) => {
    const response = await fetch(`${BASE_URL}/api/meetings/availability/${dogId}`);

    if(!response.ok) {
        throw new Error("Failed to fetch available date and time!");
    }

    return response.json();
}


// Create a new meeting
export const createMeeting = async (meetingData) => {
    const response = await fetch(`${BASE_URL}/api/meetings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(meetingData)
    });

    const data = await response.json();

    if(!response.ok) {
        const error = new Error(data.error || "Failed to create meeting!");
        error.status = response.status;
        error.fields = data.fields || null;
        throw error;
    }

    return data;
}