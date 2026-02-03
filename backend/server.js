import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import studyRoutes from "./routes/study.routes.js";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

dotenv.config()

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


app.use("/users", userRoutes);
app.use("/studies", studyRoutes)
app.use("/auth", authRoutes);




const PORT = process.env.PORT || 3000;
app.listen(5000, () => {
    connectDB()
    console.log(`server started at http://localhost:${PORT}`);
    
})

