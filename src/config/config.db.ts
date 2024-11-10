export interface ConfigDB {
    databaseHost: string;
    databaseUser: string;
    databasePassword: string;
    databaseName: string;
    port: number;
  }
  
  const configDB: ConfigDB = {
    databaseHost: process.env.DATABASE_HOST || "localhost",
    databaseName: process.env.DATABASE_NAME || "ts-api",
    databasePassword: process.env.DATABASE_PASSWORD || "root",
    databaseUser: process.env.DATABASE_USER || "postgres",
    port: 5432,
  };
  export default configDB;