// This file contains unified validation patterns and pure functions that are responsible 
// for validation inside custom hook for frontend and the server

// Validation rules
export const PATTERNS = {

    // Name validation pattern -> matches unicode letters, hypens, spaces for international names
    name: /^[\p{L}\s\-']+$/u,

    // Name validation for input fields allowing empty strings -> while users type
    nameInput: /^[\p{L}\s\-']*$/u,

    // Email validation pattern -> for standard email format  
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    // Phone validation patterns -> for multiple phone number patterns, including international formats
    phone: /^[\d\s\+\-\(\)]+$/,

}

// Functions to validate fields
