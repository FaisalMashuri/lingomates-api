import dotenv from "dotenv"

dotenv.config();
import configApp, { ConfigApp } from "./config.app";
import configDB, { ConfigDB } from "./config.db";

console.log("database name : ", process.env.DATABASE_NAME)
interface Config {
  configApp: ConfigApp;
  configDB: ConfigDB;
}

const config: Config = {
  configApp,
  configDB,
};

console.log("config : ", config)

export default config;
