import { useState } from "react";

// Custom hook that manages form state, validation and error handling
// It replaces the repeated useState + handleChange + validateForm patterns in
// QuickDonationModal, VolunteerApplicationModal and ContactUs components


// The hook accepts initialValues and validationSchema as parameters
// -> initialValues = fields from all form components, the user has to give different information
// in each form, in this hook they all considered as formData
// -> validationSchema = everyform validates different fields based on rules 
// schema = for field email run validateEmail function - strategy pattern

const useFormValidation = (initialValues, validationSchema = {}) => {

// State to store initial values
const [ formData, setFormData ] = useState(initialValues);

// State to collect and store errors
const [ errors, setErrors ] = useState({});


// Change handler that replaces handleChange and handleInputChange functions in every form component
const handleChange = (field, value) => {
    setFormData((prev) => ({
        ...prev, 
        [field]: value
    }));

    // When the user starts correcting the errors clear the error for this field
    if(errors[field]) {
        setErrors((prev) => ({
            ...prev,
            [field]: null
        }));
    }
}


// Form validation function 
const validate = () => {
    const formErrors = {};

    // Loops through each rule in the schema 
    // field -> input field like email
    // validatorFn -> rule function for that field
    for(const [field, validatorFn] of Object.entries(validationSchema)) {
        const error = validatorFn(formData[field], formData);

        // If error found, save it in formErrors
        if(error) {
            formErrors[field] = error;
        }
    }

    // All errors are collected into one state, so the UI can show them to the user
    setErrors(formErrors);

    // Returns true if there are no errors and returns false if there are errors -> used before making an API call
    return Object.keys(formErrors).length === 0;
};


// Reset the form to initial values and clear all errors
const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
};


// Return every function, value that teh component needs
return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    validate,
    resetForm
};

}


export default useFormValidation;