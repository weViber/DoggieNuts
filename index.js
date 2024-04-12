const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { readdirSync } = require("fs");
const { PORT } = require("./common");
const mongo = require("./mongo");
require("dotenv").config();

const corsOptions = {
    // origin: ["https://petsmealkorea.com", "http://localhost:3000"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

mongo
    .connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening at ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    });