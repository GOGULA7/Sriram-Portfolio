require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log(err));

/* SCHEMA */
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    message: String
});

/* MODEL */
const Contact = mongoose.model("Contact", contactSchema);

/* POST API (SAVE DATA) */
app.post("/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.send("Data saved successfully ✅");
    } catch (err) {
        res.status(500).send(err);
    }
});

/* GET API (FETCH DATA) */
app.get("/contacts", async (req, res) => {
    try {
        const data = await Contact.find();
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

/* DELETE API */
app.delete("/contact/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.send("Deleted successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});

/* UPDATE API */
app.put("/contact/:id", async (req, res) => {
    try {
        await Contact.findByIdAndUpdate(req.params.id, req.body);
        res.send("Updated successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});

/* SERVER START (ONLY ONCE) */
app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000 🚀");
});

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});
