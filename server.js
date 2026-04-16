const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/timetableDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// ✅ Schema
const timetableSchema = new mongoose.Schema({
    collegeName: String,
    className: String,
    semester: String,
    timetable: Object
});

const Timetable = mongoose.model("Timetable", timetableSchema);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
    res.send("Server Working ✅");
});

// ✅ SAVE API
app.post("/save", async (req, res) => {
    try {
        const data = new Timetable(req.body);
        await data.save();
        res.send("Saved Successfully ✅");
    } catch (err) {
        res.status(500).send("Error saving ❌");
    }
});

// ✅ GET API (IMPORTANT)
app.get("/get", async (req, res) => {
    try {
        const data = await Timetable.find();
        res.json(data);
    } catch (err) {
        res.status(500).send("Error fetching ❌");
    }
});

// ✅ Start server
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});