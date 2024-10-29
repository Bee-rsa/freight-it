import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth"; 
import operatorRoutes from "./routes/operators";
import operatorAuthRoutes from "./routes/operatorAuth"; 
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myServicesRoutes from "./routes/my-services"; 
import servicesRoutes from "./routes/services";
import bookingRoutes from "./routes/my-bookings";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/operatorAuth", operatorAuthRoutes);
app.use("/api/operators", operatorRoutes);
app.use("/api/my-services", myServicesRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/my-bookings", bookingRoutes);

app.listen(7000, () => {
    console.log("server running on localhost:7000");
});
