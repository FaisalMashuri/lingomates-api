export interface ConfigApp{
    serverHost:string;
    secretJwt: string;
    port:string
}

const configApp: ConfigApp = {
    serverHost: process.env.DATABASE_HOST || 'localhost',
    secretJwt: process.env.SECRET || "root",
    port: "3000"
}

export default configApp