"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env["NODE_CONFIG_DIR"] =
    "/Users/mingwu/Projects/devconnector/dist/config";
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const db = config_1.default.get("mongoURI");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("MongoDb connected...");
    }
    catch (e) {
        console.log(e.message);
        process.exit(1);
    }
};
exports.default = connectDB;
