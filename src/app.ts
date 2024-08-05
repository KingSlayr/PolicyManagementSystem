import express from "express";
import dotenv from "dotenv";
import policyRoutes from "./routes/policyRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import acknowledgeRoutes from "./routes/acknowledgeRoutes";
import companyRoutes from "./routes/companyRoutes";
import connectDB from "./db/connection";
import cors from "cors";


// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use("/api/companies", companyRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/acknowledgements", acknowledgeRoutes);

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
