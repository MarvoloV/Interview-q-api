import mongoose from "mongoose";

let conn = null;

export const connectDatabase = async () => {
  if (conn == null) {
    conn = await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    return conn;
  }
};
