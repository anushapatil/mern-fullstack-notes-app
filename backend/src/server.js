import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors(
    {
        origin: "http://localhost:5173"
    }
));

// middleware
// this middleware will parse the JSON body: req.body
app.use(express.json());
app.use(rateLimiter);

// our simple custom middleware
// this below method will be called just before making a request
// app.use((req, res, next) => {
//     console.log(`Request method is ${req.method} and request URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", noteRoutes);

// First connect the database then start the PORT
connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server started on PORT: 5001");
    });
});

