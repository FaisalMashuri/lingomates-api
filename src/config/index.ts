import configApp, { ConfigApp } from "./config.app";
import configDB, { ConfigDB } from "./config.db";
import dotenv from "dotenv"

dotenv.config();
interface Config {
  configApp: ConfigApp;
  configDB: ConfigDB;
}

const config: Config = {
  configApp,
  configDB,
};

export default config;
