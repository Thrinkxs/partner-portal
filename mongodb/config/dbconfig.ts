import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_USERNAME: string = process.env.MONGO_USERNAME || "";
const MONGODB_PASSWORD: string = process.env.MONGO_PASSWORD || "";

let MONGODB_URL =
  process.env.NODE_ENV === "development"
    ? `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@partner-portal-mvp.eyhyt.mongodb.net/test`
    : `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@partner-portal-mvp.eyhyt.mongodb.net/MVP`;
// let MONGODB_URL = process.env.MONGO_URI as string

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3001;

export const dbconfig = {
  mongo: {
    url: MONGODB_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};

mongoose
  .connect(dbconfig.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((error: any) => {
    console.log("Error connecting to MongoDB: ", error);
  });

const connectDb = async () => {
  try {
    await mongoose.connect(dbconfig.mongo.url, {
      retryWrites: true,
      w: "majority",
    });
    console.log("Connected to MongoDB database!");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB database!");
  } catch (error) {
    console.log("Error disconnecting from MongoDB: ", error);
  }
};

export { connectDb, disconnectDb };
