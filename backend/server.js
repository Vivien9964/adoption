import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Updated cors settings to only allow API requests from Vite dev server
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json({ limit: "10kb" }));

// General rate limiter for all routes which allows maximum 50 requests per 15 minutes per IP
const limiterAllRoutes = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: {error: "Too many requests, please try again later!"}
});

// Meeting limiter fo meeting booking with maximum 10 requests per 15 minutes per IP
const limiterMeeting = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {error: "Too many booking attemps! Try again later!"}
});

app.use(limiterAllRoutes);

// Server side validation function for meeting data -> schedule meeting page
const validateMeetingData = (data) => {
    const errors = {};

    // Field validation, to make sure required fields are not empty
    if (!data.dogId) {
        errors.dogId = "Dog ID is required!";
    }

    if (!data.dogName || !data.dogName.trim()) {
        errors.dogName = "Dog name is required!";
    }

    if (!data.meetingDate || !data.meetingDate.trim()) {
        errors.meetingDate = "Meeting date is required!";
    }

    if (!data.meetingTime && data.meetingTime !== 0) {
        errors.meetingTime = "Meeting time is required!";
    }

    // User name validation
    const nameTrimmed = (data.userName || "").trim();
    const nameParts = nameTrimmed.split(" ").filter((part) => part.length > 0);
    const hasValidNameChars = /^[\p{L}\s\-']+$/u.test(nameTrimmed);

    if (!nameTrimmed) {
        errors.userName = "Name is required!";
    } else if (nameTrimmed.length < 2) {
        errors.userName = "Name is too short!";
    } else if (!hasValidNameChars) {
        errors.userName = "Name cannot contain special characters and numbers!";
    } else if (nameParts.length < 2) {
        errors.userName = "Enter first and last name!";
    }

    // Email validation
    const trimmedEmail = (data.userEmail || "").trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!trimmedEmail) {
        errors.userEmail = "Email is required!";
    } else if (!emailRegex.test(trimmedEmail)) {
        errors.userEmail = "Enter a valid email!";
    }

    // Phone validation
    const trimmedPhone = (data.userPhone || "").trim();
    const phoneRegex = /^07\d{8}$/;

    if (!trimmedPhone) {
        errors.userPhone = "Phone is required!";
    } else if (!phoneRegex.test(trimmedPhone)) {
        errors.userPhone = "Phone number is not valid!";
    }

    // Additional notes validation if exists
    if (data.notes && data.notes.length > 1000) {
        errors.notes = "Notes cannot contain more than 1000 characters!";
    }

    return errors;
}


// Get all dogs from the database
app.get("/api/dogs", async( req, res ) => {
    try {
        // Array of dog objects
        const [rows] = await db.query("SELECT * FROM dogs");

        // JSON fields need to be converted back to arrays and objects
        // For every dog object data is transformed before sending it to the frontend
        const dogs = rows.map((dog) => ({

            ...dog,
            personality: dog.personality ? JSON.parse(dog.personality) : [],
            images: dog.images ? JSON.parse(dog.images) : [],
            idealHome: dog.idealHome ? JSON.parse(dog.idealHome) : null,
            goodWith: dog.goodWith ? JSON.parse(dog.goodWith) : null,
            whyAdopt: dog.whyAdopt ? JSON.parse(dog.whyAdopt) : [],
            featured: Boolean(dog.featured)

        }));

        res.json(dogs);

    } catch(error) {
        console.error("Error while fetching dogs: ", error);
        res.status(500).json({ error: "Failed to fetch dogs!" });
    }
});


// Get individual dog 
app.get("/api/dogs/:id", async( req, res ) => {
    try {
        // Array of dog objects
        const [rows] = await db.query("SELECT * FROM dogs WHERE id = ?", [req.params.id]);

        if(rows.length === 0) {
            return res.status(404).json({ error: "Dog not found!" })
        }

        // First element of the array -> the individual dog
        const dog = rows[0];
        dog.personality = dog.personality ? JSON.parse(dog.personality) : [];
        dog.images = dog.images ? JSON.parse(dog.images) : [];
        dog.idealHome = dog.idealHome ? JSON.parse(dog.idealHome) : null;
        dog.goodWith = dog.goodWith ? JSON.parse(dog.goodWith) : null;
        dog.whyAdopt = dog.whyAdopt ? JSON.parse(dog.whyAdopt) : [];
        dog.featured = Boolean(dog.featured);

        res.json(dog);
        
    } catch(error) {
        console.error("Error while fetching dog: ", error);
        res.status(500).json({ error: "Failed to fetch dog!"});
    }
});


// Get available meeting dates for a dog
app.get("/api/meetings/availability/:dogId", async( req, res) => {
    try {
        const { dogId } = req.params;
        const [meetings] = await db.query(`SELECT meetingDate, meetingTime FROM meetings WHERE dogId = ?`, [dogId]);
        res.status(200).json({ bookings: meetings });
    } catch(error) {
        console.error("Error fetching available date and time.", error);
        res.status(500).json({ error: "Failed to fetch availabe date and time!" });
    }
});


// Send user data to the database -> scheduled meeting
app.post("/api/meetings", limiterMeeting, async( req, res) => {
    try {

        // Input validation before anything happens in the database
        const validationErrors = validateMeetingData(req.body);

        // In case of errors, return error with 400
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({
                error: "Validation failed!",
                fields: validationErrors
            });
        }


        const {
        dogId,
        dogName,
        dogBreed,
        dogImage,
        dogLocation,
        meetingDate,
        meetingTime,
        userName,
        userEmail,
        userPhone,
        notes
        } = req.body

        // Sanitized input data to make sure the database stores inputs 
        // without whitespace for all fields and uppercase in email
        const sanitizedMeetingData = {
            dogId,
            dogName: dogName.trim(),
            dogBreed: dogBreed ? dogBreed.trim() : "",
            dogImage: dogImage || "",
            dogLocation: dogLocation ? dogLocation.trim() : "",
            meetingDate: meetingDate.trim(),
            meetingTime,
            userName: userName.trim(),
            userEmail: userEmail.trim().toLowerCase(),
            userPhone: userPhone.trim(),
            notes: notes ? notes.trim() : ""
        }

        // Check if there are conflicting meetings
        const [existingMeetings] = await db.query(
            `SELECT id FROM meetings WHERE dogId = ? AND meetingDate = ? AND meetingTime = ?`,
            [sanitizedMeetingData.dogId, sanitizedMeetingData.meetingDate, sanitizedMeetingData.meetingTime]
        );

        // If there are two conflicting meetings, set conflict error
        if(existingMeetings.length > 0 ) {
            return res.status(409).json({
                error: "This time slot is booked! Choose a different time!"
            })
        }

        const [result] = await db.query(
            `INSERT INTO meetings 
            (dogId, dogName, dogBreed, dogImage, dogLocation, meetingDate, meetingTime, userName, userEmail, userPhone, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                sanitizedMeetingData.dogId, sanitizedMeetingData.dogName, 
                sanitizedMeetingData.dogBreed, sanitizedMeetingData.dogImage,
                sanitizedMeetingData.dogLocation, sanitizedMeetingData.meetingDate, 
                sanitizedMeetingData.meetingTime, sanitizedMeetingData.userName,
                sanitizedMeetingData.userEmail, sanitizedMeetingData.userPhone,
                sanitizedMeetingData.notes
            ]
        );

        res.status(201).json({
            message: "Meeting created successfully!",
            meetingId: result.insertId
        });
    } catch(error) {
        console.error("Error creating meeting: ", error);
        res.status(500).json({ error: "Failed to create meeting!" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})