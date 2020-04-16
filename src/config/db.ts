process.env["NODE_CONFIG_DIR"] =
  "/Users/mingwu/Projects/devconnector/dist/config";
import mongoose from "mongoose";
import config from "config";

const db: string = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDb connected...");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
export default connectDB;
