import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", ( req, res ) => {
    res.json({ message: "Pet adoption API is running!" });
});


// Get all dogs from the database
app.get("/api/dogs", async( req, res ) => {
    try {
        // Array of dog objects
        const [rows] = await db.query("SELECT * FROM dogs");

        // JSON fields need to be converted back to arrays and objects
        // For every dog object data is transformed before sending it to the frontend
        const dogs = rows.map((dog) => ({
            // start with the original object then override some properties (arrays, objects)
            ...dog,
            personality: dog.personality ? JSON.parse(dog.personality) : [],
            images: dog.images ? JSON.parse(dog.images) : [],
            idealHome: dog.idealHome ? JSON.parse(dog.idealHome) : null,
            goodWith: dog.goodWith ? JSON.parse(dog.goodWith) : null,
            whyAdopt: dog.whyAdopt ? JSON.parse(dog.whyAdopt) : [],
            featured: Boolean(dog.featured)
        }));

        res.json(dogs);

    } catch(err) {
        console.error("Error while fetching dogs: ", err);
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
        
    } catch(err) {
        console.error("Error while fetching dog: ", err);
        res.status(500).json({ error: "Failed to fetch dog!"});
    }
});


// Send user data to the database -> scheduled meeting
app.post("/api/meetings", async( req, res) => {
    try {
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

        const [result] = await db.query(
            `INSERT INTO meetings 
            (dogId, dogName, dogBreed, dogImage, dogLocation, meetingDate, meetingTime, userName, userEmail, userPhone, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [dogId, dogName, dogBreed, dogImage, dogLocation, meetingDate, meetingTime, userName, userEmail, userPhone, notes]
        );

        res.status(201).json({
            message: "Meeting created successfully!",
            meetingId: result.insertId
        });
    } catch(err) {
        console.error("Error creating meeting: ", err);
        res.status(500).json({ error: "Failed to create meeting!" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})