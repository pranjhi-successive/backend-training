import mongoose from "mongoose";
import countriesData from "../utils/Country";
import { CountryModel } from "../models/Countries";
// import countriesData from "./country";

class Database {
  uri: string;
  constructor() {
    this.uri = process.env.MONGO_URL ?? "";
  }

  connect = async (): Promise<void> => {
    try {
      await mongoose.connect(this.uri);
      console.log("connected");
      await this.seed();
    } catch (error) {
      console.log(error);
      console.error("DATABASE CONNECTION FAILED");
      process.exit(0);
    }
  };

  seed = async (): Promise<void> => {
    try {
      await CountryModel.insertMany(countriesData);
      console.log("seeded succesfully");
    } catch (error) {
      console.log("error in seeding", error);
    }
  };
}

export default Database;
