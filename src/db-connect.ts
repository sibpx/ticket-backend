import mongoose from "mongoose";

export default function connectDB(DB_PATH: string): void {
  try {
    mongoose.connect(DB_PATH);
    console.log("DB is connected");
  } catch (e) {
    console.log(e);
  }
}
