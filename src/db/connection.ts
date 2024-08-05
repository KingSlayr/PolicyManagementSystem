import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ankitrastogi31200:5GGodznG1SKpPF0g@cluster0.gyahfpy.mongodb.net/sprinto"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
