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

    // Phone validation patterns -> for multiple phone number patterns (mobile, landline), including international formats
    phone: /^[\d\s\+\-\(\)]+$/,

}

// Functions to validate fields

// Validate name function
// Valid input should be a full name without special characters or numbers
export const validateName = (value) => {
    const trimmed = (value || "").trim();
    const parts = trimmed.split(" ").filter((part) => part.length > 0);

    // Check if user entered a name
    if(!trimmed) {
        return "Name is required!";
    }

    // Check if the name is long enough
    if(trimmed.length < 2) {
        return "Name is too short!";
    }

    // Check to see if the name contains special characters or numbers
    if(!PATTERNS.name.test(trimmed)) {
        return "Name cannot contain special characters and numbers!";
    }

    // Check if the user entered the full name
    if(parts.length < 2) {
        return "Enter first and last name!";
    }

    return null;
};


// Validate email function
export const validateEmail = (value) => {
    const trimmed = (value || "").trim();

    // Check if user entered an email
    if(!trimmed) {
        return "Email is required!";
    }

    // Check if email follows the standard email format
    if(!PATTERNS.email.test(trimmed)) {
        return "Enter a valid email!";
    }

    return null;

};


// Validate phone number function
export const validatePhone = (value) => {

    const trimmed = (value || "").trim();

    // Check if user enetered phone number
    if(!trimmed) {
        return "Phone number is required!";
    }

    // Check if phone number is long enough
    if(trimmed.length < 10) {
        return "Phone number is too short!";
    }

    // Check if phone number contains letters or special characters
    if(!PATTERNS.phone.test(trimmed)) {
        return "Enter valid phone number!";
    }

    return null;
};